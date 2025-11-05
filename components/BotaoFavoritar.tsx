"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';

interface BotaoFavoritarProps {
  ofertaId: string;
  className?: string;
}

export function BotaoFavoritar({ ofertaId, className }: BotaoFavoritarProps) {
  const { token, usuario } = useAuth();
  const router = useRouter();
  const [estaFavoritado, setEstaFavoritado] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(false);

  useEffect(() => {
    const verificarFavorito = async () => {
      if (!token) return;
      try {
        const { data } = await api.get<{ favoritado: boolean }>(`/favoritos/${ofertaId}/status`);
        setEstaFavoritado(data.favoritado ?? false);
      } catch {
        // Ignora erro silenciosamente
      }
    };
    verificarFavorito();
  }, [token, ofertaId]);

  const toggleFavorito = async () => {
    if (!token || !usuario) {
      router.push('/login');
      return;
    }

    setCarregando(true);
    try {
      if (estaFavoritado) {
        await api.delete(`/favoritos/${ofertaId}`);
        setEstaFavoritado(false);
      } else {
        await api.post(`/favoritos/${ofertaId}`);
        setEstaFavoritado(true);
      }
    } catch (error) {
      console.error('Erro ao favoritar:', error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <button
      onClick={toggleFavorito}
      disabled={carregando}
      className={`inline-flex items-center justify-center rounded p-1.5 transition-colors ${
        estaFavoritado
          ? 'text-red-500 hover:text-red-600'
          : 'text-slate-400 hover:text-red-500'
      } disabled:opacity-50 ${className ?? ''}`.trim()}
      aria-label={estaFavoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={estaFavoritado ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
}
