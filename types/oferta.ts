export interface Oferta {
  id: string;
  imagemUrl: string;
  titulo: string;
  precoAnterior?: string;
  precoAtual: string;
  desconto?: number;
  marketplace: string;
  linkAfiliado: string;
  descricao?: string;
}
