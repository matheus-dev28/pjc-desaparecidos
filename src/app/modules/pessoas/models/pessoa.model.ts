export interface IPessoa {
  id: number;
  nome: string;
  idade?: number;
  sexo?: 'MASCULINO' | 'FEMININO';
  vivo?: boolean;
  urlFoto?: string;
  ultimaOcorrencia?: IOcorrencia;
}

export interface IPessoaFiltro {
  pagina: number;                 
  porPagina?: number;
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: '' | 'MASCULINO' | 'FEMININO';
  status?: '' | 'DESAPARECIDO' | 'LOCALIZADO';
}

export interface IOcorrenciaEntrevDesapDTO {
  informacao?: string;
  vestimentasDesaparecido?: string;
}


export interface IOcorrencia {
  ocoId: number;
  dtDesaparecimento?: string;      
  dataLocalizacao?: string;        
  encontradoVivo?: boolean;
  localDesaparecimentoConcat?: string;
  listaCartaz?: ICartaz[];
  ocorrenciaEntrevDesapDTO?: IOcorrenciaEntrevDesapDTO;
}

export interface ICartaz {
  urlCartaz: string;
  tipoCartaz:
    | 'PDF_DESAPARECIDO'
    | 'PDF_LOCALIZADO'
    | 'JPG_DESAPARECIDO'
    | 'JPG_LOCALIZADO'
    | 'INSTA_DESAPARECIDO'
    | 'INSTA_LOCALIZADO';
}

export interface IPessoaFormData {
  ocoId: number;
  nome?: string;
}
