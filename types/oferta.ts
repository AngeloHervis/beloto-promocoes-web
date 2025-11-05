export interface Oferta {
  id: string;
  imagemUrl: string;
  titulo: string;
  precoAnterior?: number;
  precoAtual: number;
  desconto?: number;
  marketplace: string;
  linkAfiliado: string;
  descricao?: string;
}
