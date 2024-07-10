import { Link, Typography } from '@mui/material';
import styled from 'styled-components';

const Subtitle = styled(Typography)`
  padding: 8px 32px;
  line-height: 1.6;

  @media (max-width: 600px) {
    padding: 8px 16px;
  }
`;

export const Playlist = [
  {
    url: 'fFyDINfubbc',
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
  {
    url: '6RMOPw1Zsso',
    title: 'O que pode ser feito com os dados que publicamos?',
    subtitle: (
      <>
        <Subtitle>
          O DadosJusBr publica dados de todos os órgãos do sistema de justiça
          que permitem a obtenção automática desses dados. É possível examinar a
          diferença entre o total pago pelo órgão em salários e benefícios ou
          comparar os pagamentos de diferentes órgãos. Com os dados de
          diferentes anos ou meses é possível explorar como o pagamento cresceu
          ou não em um órgão ao longo do tempo ou identificar períodos em que
          houve um grande pagamento de benefícios.
        </Subtitle>
        <Subtitle>
          Examinando os dados detalhados podemos identificar verbas que foram
          responsáveis por grandes pagamentos e entender ou questionar esses
          pagamentos. Como temos os mesmos dados para vários órgãos, é possível
          comparar o comportamento de diferentes órgãos, como o tribunal e
          ministério público de um mesmo estado.
        </Subtitle>
      </>
    ),
  },
  {
    url: 'zs1N83PgLA0',
    title: 'Análises sobre o sistema de Justiça',
    subtitle: (
      <>
        <Subtitle>
          Os dados disponíveis no DadosJusBr permitem muitos tipos de análise.
          Nesse vídeo compartilhamos algumas análises feitas pela Transparência
          Brasil. Essas análises podem ser encontradas na aba de{' '}
          <Link href="/relatorios">relatórios</Link> do site.
        </Subtitle>
        <Subtitle>
          Utilizando os dados publicados no DadosJusBr , a Transparência Brasil
          identificou que a licença-prêmio convertida em pagamento foi a
          principal verba indenizatória paga no MPU entre 2019 e 2022,
          totalizando ao menos R$438 milhões nesses 4 anos. Os procurados do MPU
          receberam em média R$ 184 mil cada um apenas com esse benefício. Para
          chegar nesses valores, a Transparência Brasil analisou todas as
          nomenclaturas dadas pelos órgãos do MPU para esse mesmo benefício.
          Você pode acessar esse relatório{' '}
          <Link
            href="https://www.transparencia.org.br/downloads/publicacoes/relatriompuinflasalrioscomlicenasprmiopagasemdinheiro.pdf"
            target="_blank"
          >
            clicando aqui.
          </Link>
        </Subtitle>
        <Subtitle>
          Um segundo exemplo de análise feita pela Transparência Brasil foi o
          exame dos{' '}
          <Link
            href="https://www.transparencia.org.br/downloads/publicacoes/trfs_relatorio_set_2023.pdf"
            target="_blank"
          >
            salários pagos acima do teto constitucional nos Tribunais Regionais
            Federais no primeiro semestre de 2023.
          </Link>{' '}
          Com os dados publicados pelo DadosJusBr foi possível verificar que
          nesse período mais de 1500 magistrados receberam acima do teto
          constitucional, com um contracheque chegando a mais de R$400 mil. O
          maior benefício pago por esses tribunais foi a gratificação por
          exercício cumulativo. Os detalhes dessas duas análises e outras estão
          publicados no formato de relatórios no site do DadosJusBr e podem
          servir de inspiração para você.
        </Subtitle>
      </>
    ),
  },
  {
    url: 'B-onBtzfXTg',
    title: 'Entendendo rubricas em contracheques',
    subtitle: (
      <>
        <Subtitle>
          A primeira distinção que precisamos fazer é entre o salário base e os
          benefícios. O salário base é o vencimento mensal de um membro do
          sistema de justiça. Já os benefícios são o total das verbas adicionais
          recebidas por ele, em um dado mês.
        </Subtitle>
        <Subtitle>
          A remuneração líquida é a soma dessas duas categorias, menos os
          descontos, que englobam deduções de previdência pública e impostos,
          retenção pelo teto e outros descontos eventuais.
        </Subtitle>
        <Subtitle>
          Os benefícios dos membros possuem subcategorias: eles se dividem em
          “verbas indenizatórias” e “verbas remuneratórias”. De forma geral, as
          verbas remuneratórias são limitadas pelo teto constitucional. Já as
          indenizatórias, não são. Mas ao abrir uma planilha de contracheque, no
          modelo utilizado pelo sistema de Justiça, notamos que os benefícios
          não estão separados de acordo com essa característica. Da mesma forma,
          na base de dados do DadosJusBr, os benefícios estão todos listados
          como “outras remunerações”. Apenas o campo de “Descrição de
          remuneração” pode nos dar pistas sobre a natureza de cada benefício.
        </Subtitle>
        <Subtitle>
          No caso das verbas indenizatórias, englobam principalmente os
          seguintes benefícios:
          <ul>
            <li>Diárias</li>
            <li>
              Auxílios (alimentação, saúde, transporte, moradia, natalidade,
              funeral, pré-escolar, entre outros)
            </li>
            <li>Ajudas de custo para mudança e transporte</li>
            <li>Indenização de férias</li>
            <li>JETON</li>
            <li>Licença-prêmio</li>
            <li>Licença compensatória</li>
          </ul>
          Nenhum desses benefícios é limitado pelo teto constitucional, podendo
          aumentar indefinidamente a remuneração mensal do membro.
        </Subtitle>
        <Subtitle>
          Já no caso das verbas remuneratórias, algumas delas são somadas ao
          salário e limitadas pelo teto. Por exemplo:
          <ul>
            <li>Gratificação por exercício cumulativo</li>
            <li>Substituições</li>
            <li>Diferença de entrância</li>
            <li>Adicionais por tempo de serviço</li>
            <li>Vantagens pessoais nominalmente identificadas (VPNIs)</li>
            <li>Ajuda de custo para capacitação profissional</li>
            <li>Verbas de representação, abonos, prêmios</li>
          </ul>
        </Subtitle>
        <Subtitle>
          Algumas verbas remuneratórias não são somadas ao salário base para o
          cálculo da retenção pelo teto, mas ainda são limitadas individualmente
          por ele. São elas:
          <ul>
            <li>Antecipação de férias (ou “abono pecuniário”)</li>
            <li>Abono constitucional de ⅓ de férias</li>
            <li>Gratificação natalina (13º salário)</li>
            <li>Gratificações de magistério</li>
            <li>Bolsas de estudos</li>
            <li>Abono de permanência</li>
          </ul>
        </Subtitle>
        <Subtitle>
          O DadosJusBr quer melhorar a transparência dos contracheques, para que
          qualquer pessoa consiga entender o que é cada benefício, quais estão
          ou não limitados pelo teto constitucional, e o impacto de cada um na
          remuneração final dos membros do sistema de justiça brasileiro. Para
          isso, trabalhamos continuamente na distinção e unificação das
          rubricas. Apenas no Judiciário, são 2,6 mil nomenclaturas distintas de
          benefícios.
        </Subtitle>
      </>
    ),
  },
  {
    url: '4fpDY1P9Ezc',
    title: 'O teto constitucional',
    subtitle: (
      <>
        <Subtitle>
          A Constituição Federal estabelece que o salário de um ministro do STF
          é o teto do funcionalismo público. Mesmo assim, muitos membros do
          Judiciário e Ministério Público recebem acima desse limite. Como isso
          acontece?
        </Subtitle>
        <Subtitle>
          Como vimos no vídeo sobre as rubricas presentes nos contracheques,
          alguns deles possuem natureza indenizatória. Isso quer dizer que são
          pagos, a princípio, como uma compensação a prejuízos ou despesas que
          ficaram ou ficarão à encargo do funcionário. No âmbito do regime CLT,
          por exemplo, o aviso prévio e o FGTS são considerados verbas de
          natureza indenizatória.
        </Subtitle>
        <Subtitle>
          O sistema de Justiça vem ampliando as verbas indenizatórias, sem muito
          controle externo, devido a uma interpretação sobre a autonomia dessas
          instituições. Existe uma corrida pela maximização dos benefícios. Ao
          ver um órgão adotando uma nova verba indenizatória, outro decide fazer
          o mesmo, e isso se repete sequencialmente, como uma fileira de peças
          de dominó caindo. Esse movimento acontece internamente entre
          diferentes Tribunais de Justiça e entre os Ministérios Públicos, mas
          também entre esses dois setores, ao acionar o princípio da “simetria
          entre Judiciário e MP”. Mas essa simetria serve apenas para aumentar a
          quantidade de verbas, já que a extinção de um benefício nunca é
          replicada entre as instituições. A legalidade dessas verbas que
          ultrapassam o teto costuma ser defendida pelos membros do sistema de
          Justiça, mas não deixa de ser questionável, tanto que a discussão
          muitas vezes vai parar no STF. Sua ampliação irrestrita é, no mínimo,
          irracional e contrária ao interesse público, já que elas sobrecarregam
          cada vez mais o orçamento do sistema de Justiça sem trazer benefícios
          concretos para o cidadão no acesso à justiça, beneficiam somente o
          membro que as recebe.
        </Subtitle>
        <Subtitle>
          O DadosJusBr ajuda a entender o peso dos penduricalhos no salário dos
          membros do sistema Justiça. A plataforma separa o que é salário base e
          o que são benefícios, e traz o detalhamento das principais
          indenizações e gratificações que ajudam a extrapolar o teto
          constitucional.
        </Subtitle>
      </>
    ),
  },
  {
    url: 'PszEbxtfhW0',
    title: 'Aprenda a fazer tabelas dinâmicas',
    subtitle: (
      <>
        <Subtitle>
          Uma ferramenta que pode ser de grande ajuda ao examinar as
          remunerações publicadas pelo DadosJusBr são as tabelas dinâmicas de
          programas de planilha. Esse vídeo mostra como você pode usá-las no
          Google Sheets No nosso exemplo, estamos examinando as remunerações do{' '}
          <Link href="/orgao/tjba">TJ-BA</Link>. Repare que há uma alta no valor
          dos benefícios em 2023 em comparação com 2022. Veja também que essa
          alta acontece principalmente em dezembro de 2023. Para examinar essa
          alta, vamos baixar os dados de outras remunerações, que correspondem
          aos benefícios pagos aos membros, nos últimos 3 meses desse órgão e
          vamos importá-los no Google Sheets. Temos outro vídeo no site do
          DadosJusBr que dá mais detalhes sobre essa importação se você quiser
          conferir.
        </Subtitle>
        <Subtitle>
          Quando você for importar os dados, é útil conferir primeiro se sua
          planilha está configurada para usar o padrão brasileiros de números e
          moeda. Outra dica é transformar os valores para a formatação de moeda,
          o que facilita sua leitura.
        </Subtitle>
        <Subtitle>
          Se queremos achar os benefícios com os maiores pagamentos nos meses
          que estamos analisando, é preciso contabilizar o total pago por verba.
          Você pode facilmente agregar esses dados com uma tabela dinâmica. Use
          a opção de INSERIR &gt; TABELA DINÂMICA e crie essa tabela em uma nova
          aba da sua planilha. Aqui a tabela dinâmica está em branco. Para
          contabilizar os totais, adicione o detalhamento dos itens do
          contracheque nas linhas da tabela dinâmica e a coluna valor da tabela
          original nos valores. Aproveite e ordene as linhas pelo valor total,
          em ordem decrescente.
        </Subtitle>
        <Subtitle>
          Assim temos uma nova tabela que mostra em quais benefícios foram pagos
          os maiores valores. Por exemplo, no ABONO PECUNIÁRIO foram pagos mais
          de 30 milhões de reais.
        </Subtitle>
        <Subtitle>
          Um passo adicional que você pode fazer com uma tabela dinâmica é
          examinar em quais meses foram feitos os pagamentos de cada benefício.
          Adicionando o mês nas colunas da tabela dinâmica temos agora os totais
          por mês e podemos identificar quais benefícios são pagos todo mês e
          quais foram pagos em meses específicos.{' '}
        </Subtitle>
      </>
    ),
  },
];
