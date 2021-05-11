import Head from 'next/head';
import { useRef } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Nav from '../components/Header';
import {
  Animation1,
  Animation2,
  Animation3,
  Animation4,
} from '../components/index-animations';

export default function Index() {
  const divRef = useRef<HTMLSpanElement>(null);
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
        <Animation>
          {/*
            the ref prop is used to get the reference of a component and store into a variable
            the use is similar to document.getElementById function in javascript
            we need the reference of the animation here to activate the start when the button bellow is hovered
          */}
          <Animation1 ref={divRef} />
          <Button
            backgroundColor="#2FBB96"
            borderColor="#2FBB96"
            hoverTextColor="#2FBB96"
            hoverBackgroundColor="#3e5363"
            onMouseEnter={() => {
              for (let i = 0; i < divRef.current.childNodes.length; i += 1) {
                const node = divRef.current.childNodes[i] as HTMLImageElement;
                node.classList.add('active');
              }
            }}
            onMouseLeave={() => {
              for (let i = 0; i < divRef.current.childNodes.length; i += 1) {
                const node = divRef.current.childNodes[i] as HTMLImageElement;
                node.classList.remove('active');
              }
            }}
          >
            Acessar os dados libertados
          </Button>
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
    </>
  );
}

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
  justify-content: center;
  button {
    margin-top: 120px;
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
