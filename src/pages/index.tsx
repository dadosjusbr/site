import Head from 'next/head';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Nav from '../components/Header';
import {
  Animation1,
  Animation2,
  Animation3,
  Animation4,
} from '../components/index-animations';
import DropDownGroupSelector from '../components/DropDownGroupSelector';

export default function Index() {
  return (
    <Page>
      <Head>
        <title>DadosJusBr</title>
        <meta property="og:image" content="/img/icon_dadosjus_background.png" />
        <meta property="og:title" content="DadosJusBr" />
        <meta
          property="og:description"
          content="DadosJusBr é uma plataforma que realiza a libertação continua de dados de remuneração de sistema de justiça brasileiro."
        />
      </Head>
      <Nav />
      <Container>
        <div>
          <h2>VOCÊ JÁ TENTOU ACESSAR DADOS EM SITES DE ÓRGÃOS PÚBLICOS?</h2>
          <br />A Lei Federal 12.527/2011, ou mais comumente conhecida como Lei
          de Acesso à Informação (LAI), afirma obrigatória a divulgação dos
          dados de gastos públicos.
          <br />
          <br /> Porém, a LAI pouco diz sobre a forma como esses dados devem ser
          disponibilizados. E isso acaba trazendo uma falta de padronização,
          tanto para quanto a maneira que os dados são arquivados ou quanto
          exibidos.
          <br />
          <br /> Devido a essas características realizar um controle social e
          financeiro sobre essa enorme quantidade de dados de gastos públicos é
          uma tarefa difícil para uma pessoa.
        </div>
        <Animation>
          <Animation1 />
          <GreenDropDownSelector />
        </Animation>
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
        <Animation>
          <Animation2 />
        </Animation>
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
        <Animation>
          <Animation3 />
        </Animation>
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
        <Animation>
          <Animation4 />
        </Animation>
      </Container>
      <Footer />
    </Page>
  );
}

const Page = styled.div`
  background: #3e5363;
`;

const Container = styled.div`
  display: flex;
  margin: 0px 68px;
  justify-content: space-between;
  color: #fff;
  padding-top: 14rem;
  padding-bottom: 14rem;
  @media (max-width: 600px) {
    padding: 0;
    margin: 0px 20px;
  }
  div {
    max-width: 45%;
    font-size: 2rem;
    * {
      font-size: 2rem;
    }
    font-family: 'Roboto Condensed', sans-serif;
  }
  @media (max-width: 600px) {
    div {
      max-width: 100%;
      padding-top: 7rem;
      padding-bottom: 7rem;
    }
    flex-direction: column;
  }
  &.first {
    padding-top: 4rem;
    @media (max-width: 600px) {
      padding-top: 3rem;
      div {
        padding-top: 0rem;
      }
    }
  }
`;
const Animation = styled.div`
  display: flex;
  @media (max-width: 600px) {
    .context {
      margin: 0;
    }
  }
  flex-direction: column;
  align-items: center;
  width: 100%;
  div {
    padding: 0;
    max-width: 100%;
  }
  justify-content: center;
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
const GreenDropDownSelector = styled(DropDownGroupSelector)`
  background-color: #2fbb96;
  border: #3e5363;
  margin-top: 120px;
  padding: 3rem 2rem;
  width: 80%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
