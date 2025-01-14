/* eslint-disable */

type SummaryzedMI = {
  id_orgao: string;
  mes: number;
  ano: number;
  sumarios: Summaries;
  pacote_de_dados: Backup;
  metadados: Metadata;
  indice_transparencia: Score;
  dados_coleta: Collect;
  coleta_manual: boolean;
  inconsistente: boolean;
  error?: MiError;
};

type ItemSummary = {
  auxilio_alimentacao: number;
  licenca_premio: number;
  indenizacao_de_ferias: number;
  ferias: number;
  gratificacao_natalina: number;
  licenca_compensatoria: number;
  auxilio_saude: number;
  outras: number;
};

type Summaries = {
  membros_ativos: Summary;
};

type Summary = {
  quantidade: number;
  remuneracao_base: DataSummary;
  outras_remuneracoes: DataSummary;
  descontos: DataSummary;
  remuneracoes: DataSummary;
};

type DataSummary = {
  max: number;
  min: number;
  media: number;
  total: number;
};

type Backup = {
  url: string;
  hash: string;
  size: number;
};

type Metadata = {
  formato_aberto: boolean;
  acesso: string;
  extensao: string;
  dados_estritamente_tabulares: boolean;
  manteve_consistencia_no_formato: boolean;
  tem_matricula: boolean;
  tem_lotacao: boolean;
  tem_cargo: boolean;
  remuneracao_basica: string;
  outras_receitas: string;
  despesas: string;
};

type Score = {
  indice_transparencia: number;
  indice_completude: number;
  indice_facilidade: number;
};

type Collect = {
  duracao_segundos: number;
  repositorio_coletor: string;
  versao_coletor: string;
  repositorio_parser: string;
  versao_parser: string;
};
type MiError = {
  err_msg: string;
  status: number;
  cmd: string;
};

type Collecting = {
  timestamp: number;
  descricao: string[];
};

type AggregateIndexes = {
  id_orgao: string;
  agregado: Score;
  detalhe?: IndexInformation[];
};

type IndexInformation = {
  mes: number;
  ano: number;
  indice_transparencia: Score;
  metadados: Metadata;
};

type AllAgencyInformation = {
  id_orgao: string;
  nome: string;
  jurisdicao: string;
  entidade: string;
  uf: string;
  url: string;
  coletando: Collecting[];
  twitter_handle: string;
  ouvidoria: string;
  total_coletas_realizadas: number;
  meses_com_dados: number;
  indice_transparencia: Score;
  coletas: SummaryzedMI[];
};
