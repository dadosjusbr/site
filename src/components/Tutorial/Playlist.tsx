import { Link, Typography } from '@mui/material';
import styled from 'styled-components';

const Subtitle = styled(Typography)`
  margin: 0 32px;
  line-height: 1.6;
  text-indent: 2rem;

  @media (max-width: 600px) {
    margin: 0 16px;
  }
`;

export const Playlist = [
  {
    url: '4PB39l4IykI',
    title: 'Como consultar os dados',
    subtitle: (
      <>
        <Subtitle>
          No DadosJusBr é possível examinar as remunerações de um tribunal ou
          ministério público e comparar como diferentes órgãos pagam seus
          membros – juízes, procuradores e promotores. Consultar dados dos
          magistrados e membros do MP no portal é bem simples. Por exemplo, para
          examinar a remuneração nos tribunais regionais federais, você pode ir
          em{' '}
          <Link href="/grupo/JUSTICA-FEDERAL">
            Navegar pelos dados &gt; Justiça Federal
          </Link>
          . Aqui você encontra um resumo dos gastos de todos os órgãos da
          justiça federal acompanhados pelo DadosJusBr. Para cada órgão, é
          possível examinar quanto recebeu em média um magistrado em salários e
          benefícios, e quanto disso foi descontado da folha de pagamento.
        </Subtitle>
        <Subtitle>
          Além da remuneração média de um magistrado, podemos examinar o total
          gasto por cada órgão. Ao clicar em um órgão específico, como o TRF-1,
          é possível examinar suas remunerações mês a mês ou entrar em um mês
          específico e ver estatísticas sobre esse período.
        </Subtitle>
      </>
    ),
  },
  {
    url: 'TaQN-gLEV0Y',
    title: 'Como baixar contracheques',
    subtitle: (
      <>
        <Subtitle>
          Ao examinar os pagamentos de um órgão do sistema de justiça, muitas
          vezes queremos entender os detalhes desses pagamentos. Para isso, você
          pode baixar dados detalhados no DadosJusBr.
        </Subtitle>
        <Subtitle>
          Vamos começar escolhendo um órgão. Nesse exemplo, usaremos o{' '}
          <Link href="/orgao/tjms/2022">
            Tribunal de Justiça do Mato Grosso do Sul
          </Link>
          . Ao examinar o ano de 2022, vemos que há um aumentos nos benefícios
          pagos entre agosto e novembro. Para explorar o que houve, podemos usar
          os dados detalhados dos benefícios pagos nesses meses.
        </Subtitle>
        <Subtitle>
          Para isso, vamos até a seção &ldquo;baixar um subconjunto desses
          dados&rdquo;, onde podemos selecionar meses e tipos de remuneração
          específicos. A plataforma mostra uma visualização rápida das 100
          primeiras linhas da planilha.
        </Subtitle>
      </>
    ),
  },
  {
    url: 'zDCiDV-IUR0',
    title: 'Baixando conjuntos de dados',
    subtitle: (
      <>
        <Subtitle>
          Para examinar todas as remunerações de um órgão em um mês ou ano em um
          programa de planilhas, em python ou em R, o caminho mais simples é
          baixar o pacote de dados do órgão.
        </Subtitle>
        <Subtitle>
          Acesse todos os dados disponíveis para um órgão, compreendendo 2018
          até o presente, basta fazer o download desses dados na{' '}
          <Link href="/grupo/JUSTICA-ESTADUAL">página do órgão</Link>.
        </Subtitle>
        <Subtitle>
          Para baixar os dados de um ano específico, clique em explorar e
          navegue até o ano. Também é possível baixar o pacote de dados de um
          mês, navegando até a página do mês.
        </Subtitle>
      </>
    ),
  },
  {
    url: 'w4S9PdZOB9U',
    title: 'Como realizar uma pesquisa avançada',
    subtitle: (
      <>
        <Subtitle>
          O DadosJusBr conta com a{' '}
          <Link href="/pesquisar">pesquisa avançada</Link>, que facilita a
          extração de conjuntos de dados da plataforma. Com ela, você pode
          selecionar o ano, os meses e o tipo de órgão que deseja acessar. É
          possível fazer o download dos contracheques de múltiplos órgãos e
          baixar remunerações de vários tribunais estaduais simultaneamente, ou
          do tribunal e do ministério público de um mesmo estado.
        </Subtitle>
        <Subtitle>
          Há um limite de 100 mil linhas para as planilhas geradas em cada
          busca. Caso você precise de mais dados, é possível fazer buscas mais
          de uma vez.
        </Subtitle>
      </>
    ),
  },
  {
    url: 'dXC9nYYNBtY',
    title: 'Quais órgãos de justiça são monitorados',
    subtitle: (
      <>
        <Subtitle>
          Nossas coletas de dados são realizadas a partir das informações
          disponibilizadas publicamente por cada tribunal e ministério público.
          A relação de quais órgãos coletamos dados pode ser consultada na
          página de <Link href="status">status de coleta</Link>.
        </Subtitle>
        <Subtitle>
          Há também uma relação dos órgãos que ainda não estão sendo monitorados
          e os motivos que nos impede de coletar esses dados.
        </Subtitle>
      </>
    ),
  },
  {
    url: 'JElQeMFHDcM',
    title: 'Importando dados da plataforma',
    subtitle: (
      <>
        <Subtitle>
          Para analisar um conjunto de dados obtido DadosJusBr você geralmente
          usará um programa de planilhas ou uma linguagem de programação. Para
          importar os dados para um programa de planilhas, como o Excel ou o
          Google Sheets, basta abrir o arquivo baixado.
        </Subtitle>
      </>
    ),
  },
  {
    url: 'ubccAzz4Sfo',
    title: 'O índice de transparência',
    subtitle: (
      <>
        <Subtitle>
          O <Link href="/indice">índice de transparência</Link> é uma métrica
          que avalia a qualidade dos dados disponibilizados por um tribunal ou
          ministério público. Ele é calculado com base na presença de
          informações importantes na disponibilização dos contracheques e no
          padrão e tabularidade que o contracheque em questão é disponibilizado.
        </Subtitle>
      </>
    ),
  },
];
