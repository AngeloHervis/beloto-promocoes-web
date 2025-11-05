"use client";
import React, { useEffect } from 'react';

interface ModalProps {
  estaAberto: boolean;
  aoFechar: () => void;
  children: React.ReactNode;
}

export function Modal({ estaAberto, aoFechar, children }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') aoFechar(); };
    if (estaAberto) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [estaAberto, aoFechar]);

  if (!estaAberto) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={aoFechar} />
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white shadow-lg">
        <div className="flex justify-end p-2">
          <button aria-label="Fechar" onClick={aoFechar} className="rounded p-1 text-slate-500 hover:bg-slate-100">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
