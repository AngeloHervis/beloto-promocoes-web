"use client";
import { useEffect, useState } from 'react';
import { RequireAuth } from '@/components/RequireAuth';
import { api } from '@/services/api';
import { Oferta } from '@/types/oferta';
import { CardOferta } from '@/components/CardOferta';

export default function FavoritosPage() {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  useEffect(() => {
    const carregar = async () => {
      setCarregando(true);
      try {
        const { data } = await api.get<Oferta[]>('/favoritos');
        setOfertas(data ?? []);
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

  return (
    <RequireAuth>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Meus Favoritos</h1>
        {carregando ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 bg-slate-100 animate-pulse rounded" />
            ))}
          </div>
        ) : ofertas.length === 0 ? (
          <div className="text-center py-8 text-slate-500">Você ainda não tem ofertas favoritadas.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ofertas.map((o) => (
              <CardOferta key={o.id} oferta={o} />
            ))}
          </div>
        )}
      </div>
    </RequireAuth>
  );
}
