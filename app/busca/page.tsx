"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/services/api';
import { Oferta } from '@/types/oferta';
import { CardOferta } from '@/components/CardOferta';

function BuscaContent() {
  const params = useSearchParams();
  const q = params.get('q') ?? '';
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregar = async () => {
      setCarregando(true);
      setErro(null);
      try {
        const { data } = await api.get<Oferta[]>('/ofertas', { params: { q } });
        setOfertas(data ?? []);
      } catch (e) {
        setErro('Falha ao buscar ofertas.');
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, [q]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Resultados para "{q}"</h1>
      {erro && <div className="text-red-600">{erro}</div>}
      {carregando ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 bg-slate-100 animate-pulse rounded" />
          ))}
        </div>
      ) : ofertas.length === 0 ? (
        <div className="text-center py-8 text-slate-500">Nenhuma oferta encontrada.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ofertas.map((o) => (
            <CardOferta key={o.id} oferta={o} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BuscaPage() {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse rounded bg-slate-100" />}>
      <BuscaContent />
    </Suspense>
  );
}
