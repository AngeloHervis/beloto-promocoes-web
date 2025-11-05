import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // envia o cookie HttpOnly (sb_refresh_token)
});

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // se não houver resposta (CORS ou rede), só rejeita
    if (!error.response) {
      console.error("[API] Erro de rede ou CORS:", error.message);
      return Promise.reject(error);
    }

    // ignora se for outro tipo de erro
    if (error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // evita tentar refrescar o próprio refresh-token
    if (originalRequest.url?.includes("/auth/refresh-token")) {
      return Promise.reject(error);
    }

    // marca para evitar retry infinito
    originalRequest._retry = true;

    // evita chamadas múltiplas concorrentes de refresh
    if (!isRefreshing) {
      isRefreshing = true;

      refreshPromise = (async () => {
        try {
          console.info("[API] Tentando refresh de token...");
          const { data } = await api.post("/auth/refresh-token");
          const newToken = data?.access_token;

          if (newToken) {
            api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
            console.info("[API] Refresh OK");
            return newToken;
          } else {
            console.warn("[API] Refresh falhou: sem token novo");
            return null;
          }
        } catch (err) {
          console.warn("[API] Falha no refresh:", err);
          return null;
        } finally {
          isRefreshing = false;
        }
      })();
    }

    // espera a promise atual de refresh terminar
    const newToken = await refreshPromise;

    if (newToken) {
      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
      return api(originalRequest);
    } else {
      // se não conseguiu refresh, rejeita o erro (o AuthContext faz logout)
      return Promise.reject(error);
    }
  }
);
