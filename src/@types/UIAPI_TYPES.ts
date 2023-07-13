type DataForChartAtAgencyScreen = {
  Members: number[];
  Servers: number[];
  MaxSalary: number;
  PackageURL: string;
  PackageHash: string;
  PackageSize: number;
};

type AgencyRemuneration = {
  max_salario: number;
  histograma: number[];
  package: Backup;
  proc_info?: ProcInfo;
};

type GeneralTotals = {
  AgencyAmount: number;
  MonthlyTotalsAmount: number;
  StartDate: string;
  EndDate: string;
  RemunerationRecordsCount: number;
  GeneralRemunerationValue: number;
};

type GeneralSummary = {
  num_orgaos: number;
  num_meses_coletados: number;
  data_inicio: string;
  data_fim: string;
  remuneracao_total: number;
};

type Group = {
  grupo: string;
  orgaos: v2AgencyBasic[];
};

type v2AgencyBasic = {
  id_orgao: string;
  nome: string;
  entidade: string;
};

type Employee = {
  Name: string;
  Wage: number;
  Perks: number;
  Others: number;
  Total: number;
  Type: string;
  Active: boolean;
};

type v2AgencySummary = {
  orgao: string;
  remuneracao_base: number;
  max_remuneracao_base: number;
  outras_remuneracoes: number;
  max_outras_remuneracoes: number;
  descontos: number;
  max_descontos: number;
  max_remuneracao: number;
  timestamp: Timestamp;
  total_membros: number;
  total_remuneracao: number;
  tem_proximo: boolean;
  tem_anterior: boolean;
};

type v2AgencyTotalsYear = {
  ano: number;
  orgao: Agency;
  meses: v2MonthTotals[];
  package: Backup;
};

type ProcError = {
  stdout: string;
  stderr: string;
};

type v2MonthTotals = {
  error: ProcError;
  mes: number;
  total_membros: number;
  remuneracao_base: number;
  remuneracao_base_por_membro: number;
  remuneracoes: number;
  remuneracoes_por_membro: number;
  outras_remuneracoes: number;
  outras_remuneracoes_por_membro: number;
  descontos: number;
  descontos_por_membro: number;
  timestamp: Timestamp;
};

type Timestamp = {
  seconds: number;
  nanos: number;
};

type v2ProcInfoResult = {
  proc_info: ProcInfo;
  timestamp: Timestamp;
};

type ProcInfo = {
  stdin: string;
  stdout: string;
  stderr: string;
  cmd: string;
  cmd_dir: string;
  status: number;
  env: string[];
};

type SearchDetails = {
  descontos: number;
  base: number;
  outras: number;
  orgao: string;
  mes: number;
  ano: number;
  zip_url: string;
};

type SearchResult = {
  orgao: string;
  mes: number;
  ano: number;
  matricula: string;
  nome: string;
  cargo: string;
  lotacao: string;
  categoria_contracheque: string;
  detalhamento_contracheque: string;
  valor: number;
};

type SearchResponse = {
  download_available: boolean;
  num_rows_if_available: number;
  search_limit: number;
  download_limit: number;
  result: SearchResult[];
};

type Agency = {
  id_orgao: string;
  nome: string;
  jurisdicao: string;
  entidade: string;
  uf: string;
  url: string;
  coletando?: Collecting[];
  twitter_handle: string;
  ouvidoria: string;
  possui_dados?: boolean;
};

type AnnualSummary = {
  orgao: Agency;
  dados_anuais: AnnualSummaryData[];
};

type AnnualSummaryData = {
  ano: number;
  num_membros: number;
  remuneracao_base: number;
  remuneracao_base_por_mes: number;
  remuneracao_base_por_membro: number;
  outras_remuneracoes: number;
  outras_remuneracoes_por_mes: number;
  outras_remuneracoes_por_membro: number;
  descontos: number;
  descontos_por_mes: number;
  descontos_por_membro: number;
  remuneracoes: number;
  remuneracoes_por_mes: number;
  remuneracoes_por_membro: number;
  meses_com_dados: number;
  package: Backup;
};

type MensalRemuneration = {
  mes: number;
  num_membros: number;
  remuneracao_base: number;
  outras_remuneracoes: number;
  descontos: number;
  remuneracoes: number;
};
