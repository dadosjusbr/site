import Head from 'next/head';
import { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Nav from '../components/Header';

export default function Index() {
  const divRef = useRef<HTMLDivElement>(null);
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
          <span ref={divRef} className="context">
            <img
              src="img/anim-group-1/esquema.svg"
              alt="esquema_anim_group_1"
              id="esquema_anim_group_1"
            />
            <img
              src="img/anim-group-1/grafico_0.svg"
              alt="grafico_0_anim_group_1"
              id="grafico_0_anim_group_1"
            />
            <img
              src="img/anim-group-1/grafico_1.svg"
              alt="grafico_1_anim_group_1"
              id="grafico_1_anim_group_1"
            />
            <img
              src="img/anim-group-1/icon_documento.svg"
              alt="icon_documento_anim_group_1"
              id="icon_documento_up_anim_group_1"
            />
            <img
              src="img/anim-group-1/icon_documento.svg"
              alt="icon_documento_anim_group_1"
              id="icon_documento_down_anim_group_1"
            />
            <img
              src="img/anim-group-1/icon_documento.svg"
              alt="icon_documento_anim_group_1"
              id="icon_documento_right_anim_group_1"
            />
            <img
              src="img/anim-group-1/icon_predio.svg"
              alt="icon_predio_anim_group_1"
              id="icon_predio_anim_group_1"
            />
            <img
              src="img/anim-group-1/seta.svg"
              alt="seta_anim_group_1"
              id="seta_1_anim_group_1"
            />
            <img
              src="img/anim-group-1/seta.svg"
              alt="seta_anim_group_1"
              id="seta_2_anim_group_1"
            />
          </span>
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
          <span className="context">
            <img
              src="img/anim-group-2/icon_carrinho.svg"
              alt="icon_carrinho_anim_group_2"
              id="icon_carrinho_anim_group_2"
            />
            <img
              src="img/anim-group-2/icon_plus_large.svg"
              alt="icon_plus_large_anim_group_2"
              id="icon_plus_large_anim_group_2"
            />
            <img
              src="img/anim-group-2/inativos.svg"
              alt="inativos_anim_group_2"
              id="inativos_anim_group_2"
            />
            <img
              src="img/anim-group-2/remuneracao.svg"
              alt="remuneracao_anim_group_2"
              id="remuneracao_anim_group_2"
            />
            <img
              src="img/anim-group-2/icon_empregados_up.svg"
              alt="icon_empregados_up_anim_group_2"
              id="icon_empregados_up_anim_group_2"
            />
            <img
              src="img/anim-group-2/membros.svg"
              alt="membros_anim_group_2"
              id="membros_anim_group_2"
            />
            <img
              src="img/anim-group-2/seta.svg"
              alt="seta_1_anim_group_2"
              id="seta_1_anim_group_2"
            />
            <img
              src="img/anim-group-2/seta.svg"
              alt="seta_2_anim_group_2"
              id="seta_2_anim_group_2"
            />
            <img
              src="img/anim-group-2/plus.svg"
              alt="plus_1_anim_group_2"
              id="plus_1_anim_group_2"
            />
            <img
              src="img/anim-group-2/plus.svg"
              alt="plus_2_anim_group_2"
              id="plus_2_anim_group_2"
            />
            <img
              src="img/anim-group-2/plus.svg"
              alt="plus_3_anim_group_2"
              id="plus_3_anim_group_2"
            />
            <img
              src="img/anim-group-2/plus.svg"
              alt="plus_4_anim_group_2"
              id="plus_4_anim_group_2"
            />
            <img
              src="img/anim-group-2/plus.svg"
              alt="plus_5_anim_group_2"
              id="plus_5_anim_group_2"
            />
            <img
              src="img/anim-group-2/icon_beneficio.svg"
              alt="icon_beneficio_2_anim_group_2"
              id="icon_beneficio_2_anim_group_2"
            />
            <img
              src="img/anim-group-2/icon_salario.svg"
              alt="icon_salario_anim_group_2"
              id="icon_salario_anim_group_2"
            />
          </span>
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
          <span className="context">
            <img
              src="img/anim-group-2/seta.svg"
              alt="seta_anim_group_3"
              id="seta_anim_group_3"
            />
            <img
              src="img/anim-group-1/grafico_0.svg"
              alt="grafico_0_anim_group_3"
              id="grafico_0_anim_group_3"
            />
            <img
              src="img/anim-group-3/icon_membros.svg"
              alt="icon_membros_anim_group_3"
              id="icon_membros_anim_group_3"
            />
            <img
              src="img/anim-group-1/grafico_1.svg"
              alt="grafico_1_anim_group_3"
              id="grafico_1_anim_group_3"
            />
          </span>
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
          <span className="context">
            <img
              src="img/anim-group-4/icon_empregados_up.svg"
              alt="icon_empregado_1_anim_group_4"
              id="icon_empregado_1_anim_group_4"
            />
            <img
              src="img/anim-group-2/seta.svg"
              alt="seta_1_anim_group_4"
              id="seta_1_anim_group_4"
            />
            <img
              src="img/anim-group-4/icon_salario.svg"
              alt="icon_salario_1_anim_group_4"
              id="icon_salario_1_anim_group_4"
            />
            <img
              src="img/anim-group-2/plus.svg"
              alt="plus_1_anim_group_4"
              id="plus_1_anim_group_4"
            />
            <img
              src="img/anim-group-4/icon_beneficio.svg"
              alt="icon_beneficio_1_anim_group_4"
              id="icon_beneficio_1_anim_group_4"
            />
            <img
              src="img/anim-group-4/icon_empregados_up.svg"
              alt="icon_empregado_2_anim_group_4"
              id="icon_empregado_2_anim_group_4"
            />
            <img
              src="img/anim-group-2/seta.svg"
              alt="seta_2_anim_group_4"
              id="seta_2_anim_group_4"
            />
            <img
              src="img/anim-group-4/icon_salario.svg"
              alt="icon_salario_2_anim_group_4"
              id="icon_salario_2_anim_group_4"
            />
            <img
              src="img/anim-group-2/plus.svg"
              alt="plus_2_anim_group_4"
              id="plus_2_anim_group_4"
            />
            <img
              src="img/anim-group-4/icon_beneficio.svg"
              alt="icon_beneficio_2_anim_group_4"
              id="icon_beneficio_2_anim_group_4"
            />
            <img
              src="img/anim-group-4/icon_empregados_up.svg"
              alt="icon_empregado_3_anim_group_4"
              id="icon_empregado_3_anim_group_4"
            />
            <img
              src="img/anim-group-2/seta.svg"
              alt="seta_3_anim_group_4"
              id="seta_3_anim_group_4"
            />
            <img
              src="img/anim-group-4/icon_salario.svg"
              alt="icon_salario_3_anim_group_4"
              id="icon_salario_3_anim_group_4"
            />
            <img
              src="img/anim-group-2/plus.svg"
              alt="plus_3_anim_group_4"
              id="plus_3_anim_group_4"
            />
            <img
              src="img/anim-group-4/icon_beneficio.svg"
              alt="icon_beneficio_3_anim_group_4"
              id="icon_beneficio_3_anim_group_4"
            />
          </span>
        </Animation>
      </Container>
      <Footer />
    </>
  );
}
const iconPredioAnimation = keyframes`
  10%{
    opacity: 255;

  }
  100%{
      opacity: 255;
    }
`;
const iconEsquemaAnimation = keyframes`
    0%{
      opacity: 0;
    }
    20%{
      opacity: 0;
    }
    30%{
      opacity: 255;
    }
    90%{
      opacity: 255;
    }
    100%{
      opacity: 0;
    }
`;

const seta1Animation = keyframes`
    0%{
      transform: rotate(0deg);
      opacity: 0;
    }
    10%{
      opacity: 0;
    }
    20%{
      opacity: 255;
    }
    90%{
      opacity: 255;
    }
    100%{
      transform: rotate(0deg);
      opacity:0;
    }
`;

const topFileAnimation = keyframes`
    0%{
      opacity: 0;
    }
    30%{
      opacity: 0;
    }
    40%{
      opacity: 255;
    }
    50%{
      opacity: 255;
      transform: translateY(0) translateX(0);
    }
    60%{
      transform: translateY(90px) translateX(90px);
      opacity: 0;
    }
`;
const bottomFileAnimation = keyframes`
    0%{
      opacity: 0;
    }
    30%{
      opacity: 0;
    }
    40%{
      opacity: 255;
    }
    50%{
      opacity: 255;
      transform: translateY(0) translateX(0);
    }
    60%{
      opacity: 0;
      transform: translateY(-90px) translateX(90px);
    }
`;
const lastFileAnimation = keyframes`
    0%{
      opacity: 0;
    }
    40%{
      opacity: 0;
    }
    50%{
      opacity: 255;
    }
    90%{
      opacity: 255;
    }
`;
const seta2Animation = keyframes`
    0%{
      opacity: 0;
    }
    60%{
      opacity: 0;
    }
    70%{
      opacity: 255;
    }
    90%{
      opacity: 255;
    }
`;
const graficoAnimation = keyframes`
    0%{
      opacity: 0;
    }
    70%{
      opacity: 0;
    }
    80%{
      opacity: 255;
    }
    90%{
      opacity: 255;
    }
`;
const animSeta = keyframes`
  0%{
    opacity: 0;
  }
  10%{
    opacity: 0;
  }
  20%{
    opacity: 255;
  }
  90%{
    opacity: 255;
  }
`;
const animSalario = keyframes`
  0%{
    opacity: 0;
  }
  30%{
    opacity: 0;
  }
  40%{
    opacity: 255;
  }
  90%{
    opacity: 255;
  }
`;
const animPlus = keyframes`
  0%{
    opacity: 0;
  }
  50%{
    opacity: 0;
  }
  60%{
    opacity: 255;
  }
  90%{
    opacity: 255;
  }
`;
const animBeneficio = keyframes`
  0%{
    opacity: 0;
  }
  70%{
    opacity: 0;
  }
  80%{
    opacity: 255;
  }
  90%{
    opacity: 255;
  }
`;

const animTwoArrowOne = keyframes`
  0%{
    opacity: 0;
  }
  10%{
    opacity: 0;
  }
  20%{
    opacity: 255;
  }
  90%{
    opacity: 255;
  }
`;
const animTwoGiftBox = keyframes`
  0%{
    opacity: 0;
  }
  20%{
    opacity: 0;
  }
  30%{
    opacity: 255;
  }
  90%{
    opacity: 255;
  }
`;
const animTwoPlusOne = keyframes`
  0%{
    opacity: 0;
  }
  30%{
    opacity: 0;
  }
  40%{
    opacity: 255;
  }
  90%{
    opacity: 255;
  }
`;
const animTwoPocket = keyframes`
  0%{
    opacity: 0;
  }
  40%{
    opacity: 0;
  }
  50%{
    opacity: 255;
  }
  90%{
    opacity: 255;
  }
`;
const animTwoArrowTwo = keyframes`
  0%{
    opacity: 0;
  }
  50%{
    opacity: 0;
  }
  60%{
    opacity: 25;
  }
  90%{
    opacity: 255;
  }
`;
const animTwoLastAnim = keyframes`
  0%{
    opacity: 0;
  }
  60%{
    opacity: 0;
  }
  70%{
    opacity: 25;
  }
  90%{
    opacity: 255;
  }
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
`;
const Animation = styled.div`
  display: flex;
  .context {
    margin: 0;
    width: 100%;
    height: 10rem;
    & + .context {
      background-color: red;
    }
    display: flex;
    position: relative;
    @media (min-width: 960px) {
      #icon_predio_anim_group_1.active {
        animation: ${iconPredioAnimation} 10s forwards;
      }
      #esquema_anim_group_1.active {
        animation: ${iconEsquemaAnimation} 10s forwards infinite;
      }
      #seta_1_anim_group_1.active {
        animation: ${seta1Animation} 10s forwards infinite;
      }
      #icon_documento_up_anim_group_1.active {
        animation: ${topFileAnimation} 10s forwards infinite;
      }
      #icon_documento_down_anim_group_1.active {
        animation: ${bottomFileAnimation} 10s forwards infinite;
      }
      #icon_documento_right_anim_group_1.active {
        animation: ${lastFileAnimation} 10s forwards infinite;
      }
      #seta_2_anim_group_1.active {
        animation: ${seta2Animation} 10s forwards infinite;
      }
      #grafico_0_anim_group_1.active {
        animation: ${graficoAnimation} 10s forwards infinite;
      }
      #grafico_1_anim_group_1.active {
        animation: ${graficoAnimation} 10s forwards infinite;
      }
    }
    @media (max-width: 960px) {
      img {
        transform: scale(0.8);
      }
    }
    #icon_predio_anim_group_1 {
      left: -220px;
      top: 10px;
      opacity: 0;
    }
    #icon_membros_anim_group_3 {
      top: -30%;
    }
    #icon_documento_right_anim_group_1 {
      left: 190px;
      top: 30px;
      opacity: 0;
    }
    #seta_1_anim_group_1 {
      left: -110px;
      top: 40px;
      transform: rotate(180deg);
    }
    #seta_2_anim_group_1 {
      left: 290px;
      top: 40px;
      opacity: 0;
    }
    #seta_anim_group_3 {
      top: 40%;
    }
    #grafico_0_anim_group_1 {
      left: 400px;
      top: -10px;
      opacity: 0;
    }
    #grafico_1_anim_group_1 {
      top: 50px;
      left: 400px;
      opacity: 0;
    }
    #grafico_0_anim_group_3 {
      left: -40px;
      top: 80%;
    }
    #grafico_1_anim_group_3 {
      left: 40px;
      top: 80%;
    }
    #icon_documento_up_anim_group_1 {
      top: -60px;
      opacity: 0;
    }
    #icon_documento_down_anim_group_1 {
      top: 130px;
      left: -10px;
      opacity: 0;
    }
    #esquema_anim_group_1 {
      opacity: 255;
    }
    #icon_empregado_1_anim_group_4 {
      left: -90%;
    }
    #icon_empregado_2_anim_group_4 {
      left: -20%;
    }
    #icon_empregado_3_anim_group_4 {
      left: 50%;
    }
    #seta_1_anim_group_4 {
      left: -90%;
      top: 80px;
    }
    #seta_2_anim_group_4 {
      left: -20%;
      top: 80px;
    }
    #seta_3_anim_group_4 {
      left: 50%;
      top: 80px;
    }
    #icon_salario_1_anim_group_4 {
      left: -90%;
      top: 120px;
    }
    #icon_salario_2_anim_group_4 {
      left: -20%;
      top: 120px;
    }
    #icon_salario_3_anim_group_4 {
      left: 50%;
      top: 120px;
    }
    #plus_1_anim_group_4 {
      left: -70%;
      top: 150px;
    }
    #plus_2_anim_group_4 {
      top: 150px;
    }
    #plus_3_anim_group_4 {
      left: 70%;
      top: 150px;
    }
    #icon_beneficio_1_anim_group_4 {
      left: -50%;
      top: 120px;
    }
    #icon_beneficio_2_anim_group_4 {
      top: 120px;
      left: 20%;
    }
    #icon_beneficio_3_anim_group_4 {
      left: 90%;
      top: 120px;
    }
    #icon_empregado_1_anim_group_4,
    #icon_empregado_2_anim_group_4,
    #icon_empregado_3_anim_group_4 {
    }
    #seta_1_anim_group_4,
    #seta_2_anim_group_4,
    #seta_3_anim_group_4 {
      animation: ${animSeta} forwards 10s infinite;
    }
    #icon_salario_1_anim_group_4,
    #icon_salario_2_anim_group_4,
    #icon_salario_3_anim_group_4 {
      animation: ${animSalario} forwards 10s infinite;
    }
    #plus_1_anim_group_4,
    #plus_2_anim_group_4,
    #plus_3_anim_group_4 {
      animation: ${animPlus} forwards 10s infinite;
    }
    #icon_beneficio_1_anim_group_4,
    #icon_beneficio_2_anim_group_4,
    #icon_beneficio_3_anim_group_4 {
      animation: ${animBeneficio} forwards 10s infinite;
    }
    #icon_carrinho_anim_group_2 {
      top: 140%;
      animation: ${animTwoLastAnim} 10s forwards infinite;
    }
    #icon_plus_large_anim_group_2 {
      top: 140%;
      left: -40%;
      animation: ${animTwoLastAnim} 10s forwards infinite;
    }
    #inativos_anim_group_2 {
      top: 140%;
      left: -80%;
      animation: ${animTwoLastAnim} 10s forwards infinite;
    }
    #remuneracao_anim_group_2 {
      top: 140%;
      left: 40%;
      animation: ${animTwoLastAnim} 10s forwards infinite;
    }
    #icon_empregados_up_anim_group_2 {
      left: -40%;
      top: -80%;
    }
    #membros_anim_group_2 {
      top: 140%;
      left: 80%;
      animation: ${animTwoLastAnim} 10s forwards infinite;
    }
    #seta_1_anim_group_2 {
      animation: ${animTwoArrowOne} 10s forwards infinite;
      left: -40%;
    }
    #seta_2_anim_group_2 {
      animation: ${animTwoArrowTwo} 10s forwards infinite;
      top: 100%;
    }
    #icon_beneficio_2_anim_group_2 {
      animation: ${animTwoGiftBox} 10s forwards infinite;
      top: 20%;
      left: -40%;
    }
    #icon_salario_anim_group_2 {
      animation: ${animTwoPocket} 10s forwards infinite;
      top: 20%;
    }
    #plus_1_anim_group_2 {
      top: 40%;
      left: -20%;
    }
    #plus_1_anim_group_2 {
      animation: ${animTwoPlusOne} 10s forwards infinite;

      top: 40%;
      left: -20%;
    }
    #plus_2_anim_group_2,
    #plus_3_anim_group_2,
    #plus_4_anim_group_2,
    #plus_5_anim_group_2 {
      top: 150%;
      animation: ${animTwoLastAnim} 10s forwards infinite;
    }
    #plus_2_anim_group_2 {
      left: -60%;
    }
    #plus_3_anim_group_2 {
      left: -20%;
    }
    #plus_4_anim_group_2 {
      left: 20%;
    }
    #plus_5_anim_group_2 {
      left: 60%;
    }
    img {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      opacity: 255;
      right: 0;
      text-align: center;
    }
  }
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
