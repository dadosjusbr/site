import Head from 'next/head';
import styled from 'styled-components';
import Nav from '../components/Header';

export default function Index() {
  return (
    <>
      <Head>
        <title>DadosJusBr</title>
      </Head>
      <Nav />
      <Container>
        <div>
          <h2>VOCÊ JÁ TENTOU ACESSAR DADOS EM SITES DE ÓRGÃOS PÚBLICOS?</h2>
          <br />A Lei Federal 12.527/2011, ou mais comumente conhecida como Lei
          de Acesso à Informação (LAI), diz que é “obrigatória a divulgação em
          sítios oficiais da rede mundial de computadores (internet)” dos dados
          de gastos públicos.
          <br />
          <br /> Porém, a LAI pouco diz sobre a forma como esses dados devem ser
          disponibilizados. Por isso, nos sites dos órgãos são encontrados
          arquivos em diversos formatos (pdf, html, planilhas eletrônicas, json
          e etc), além disso nomenclaturas e formatação são muitas vezes
          diferentes para cada órgão.
          <br />
          <br /> Devido a essas características realizar um controle social e
          financeiro sobre essa enorme quantidade de dados de gastos públicos é
          uma tarefa difícil para uma pessoa.
        </div>
        <div />
        <div>
          <h2>VOCÊ JÁ TENTOU ACESSAR DADOS EM SITES DE ÓRGÃOS PÚBLICOS?</h2>
          <br />A Lei Federal 12.527/2011, ou mais comumente conhecida como Lei
          de Acesso à Informação (LAI), diz que é “obrigatória a divulgação em
          sítios oficiais da rede mundial de computadores (internet)” dos dados
          de gastos públicos.
          <br />
          <br /> Porém, a LAI pouco diz sobre a forma como esses dados devem ser
          disponibilizados. Por isso, nos sites dos órgãos são encontrados
          arquivos em diversos formatos (pdf, html, planilhas eletrônicas, json
          e etc), além disso nomenclaturas e formatação são muitas vezes
          diferentes para cada órgão.
          <br />
          <br /> Devido a essas características realizar um controle social e
          financeiro sobre essa enorme quantidade de dados de gastos públicos é
          uma tarefa difícil para uma pessoa.
        </div>
        <div />
      </Container>
      <ExclamativeText>
        <h2>O DADOSJUSBR EXISTE PARA DENUNCIAR E LIBERTAR ESTES DADOS.</h2>
      </ExclamativeText>
      <Container>
        <div>
          <h2> COMO NÓS FAZEMOS ISSO?</h2>
          <br />
          Os agentes públicos do sistema de justiça brasileiro recebem outras
          verbas, além de seus salários, para exercerem seus cargos. Dentre elas
          encontramos auxílio moradia, despesas com saúde, auxílio transporte,
          gratificações, diárias, entre outros benefícios.
        </div>
        <div>
          <h2>VOCÊ JÁ TENTOU ACESSAR DADOS EM SITES DE ÓRGÃOS PÚBLICOS?</h2>
          <br />A Lei Federal 12.527/2011, ou mais comumente conhecida como Lei
          de Acesso à Informação (LAI), diz que é “obrigatória a divulgação em
          sítios oficiais da rede mundial de computadores (internet)” dos dados
          de gastos públicos.
        </div>
      </Container>
      <Container>
        <div>
          Inspirados em projetos como o <b>Serenata de amor</b> e{' '}
          <b>Brasil.io</b>, o <b>DadosJusBr</b> surge com o objetivo de
          apresentar de forma detalhada, organizada e unificada os dados de
          gastos com remuneração dos órgãos que constituem o sistema de justiça
          brasileiro, assim facilitando o acesso e promovendo o controle social
          sobre esses gastos do poder judiciário, ministério público, defensoria
          pública e procuradorias.
        </div>
        <div>
          <h1>VOCÊ JÁ TENTOU ACESSAR DADOS EM SITES DE ÓRGÃOS PÚBLICOS?</h1>
          <br />A Lei Federal 12.527/2011, ou mais comumente conhecida como Lei
          de Acesso à Informação (LAI), diz que é “obrigatória a divulgação em
          sítios oficiais da rede mundial de computadores (internet)” dos dados
          de gastos públicos.
        </div>
      </Container>
      <Container>
        <div>
          O <b>DadosJusBr</b> utiliza a inteligência de dados para a ação
          cidadã, promovendo um acesso mais democrático e fácil aos dados de
          remuneração do sistema de justiça brasileiro. No DadosJusBr podemos
          entender como cada juiz, promotor e desembargador são remunerados.
          Quais auxílios recebem? Quais os valores destes auxílios? Quanto além
          do salário um funcionário recebeu em determinado mês? Quanto um órgão
          gastou em determinado mês? Todas essas perguntas podem ser respondidas
          através do DadosJusBr.
        </div>
        <div>
          <h1>VOCÊ JÁ TENTOU ACESSAR DADOS EM SITES DE ÓRGÃOS PÚBLICOS?</h1>
          <br />A Lei Federal 12.527/2011, ou mais comumente conhecida como Lei
          de Acesso à Informação (LAI), diz que é “obrigatória a divulgação em
          sítios oficiais da rede mundial de computadores (internet)” dos dados
          de gastos públicos.
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  margin: 0px 68px;
  color: #fff;
  padding-top: 14rem;
  padding-bottom: 14rem;
  div {
    max-width: 50%;

    padding-right: 3rem;
    font-size: 2rem;
    * {
      font-size: 2rem;
    }
    font-family: 'Roboto Condensed', sans-serif;
  }
`;
const ExclamativeText = styled.div`
  background-color: #7f3d8b;
  padding: 10rem 8rem;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 5rem;
  color: #fff;
  text-align: center;
  background-image: url('/img/splash_background.png');
`;
