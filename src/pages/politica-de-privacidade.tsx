import Head from 'next/head';
import styled from 'styled-components';
import { Grid, Link } from '@mui/material';

import Footer from '../components/Essentials/Footer';
import Header from '../components/Essentials/Header';

export default function PrivacityPolicy() {
  return (
    <Page>
      <Head>
        <title>Política de Privacidade do DadosJusBr</title>
      </Head>
      <Header />
      <Grid container justifyContent="center" py={4}>
        <Grid item width={692}>
          <h1>DadosJusBr Um compromisso com a sua privacidade!</h1>
          <p>
            Esta Política de Privacidade dispõe sobre o processo de coleta,
            armazenamento, utilização, tratamento, compartilhamento e exclusão
            de dados pessoais eventualmente coletados pelo DadosJusBr.
          </p>

          <p>
            O DadosJusBr busca respeitar integralmente a Lei Geral de Proteção
            de Dados Pessoais - LGPD (Lei Federal nº 13.709/2018) e declara o
            compromisso da entidade de preservar a privacidade e o sigilo dos
            dados pessoais. Nos preocupamos com a sua privacidade, honra e
            imagem, e utilizaremos todos os meios possíveis para protegê-las.
          </p>

          <p>
            De acordo com a LGPD e para fins desta política, considera-se dado
            pessoal toda e qualquer informação relacionada a pessoa natural
            identificada ou identificável, o que poderá incluir nome, e-mail,
            endereço, número do CPF, RG, dados de localização e endereço IP, sem
            prejuízo de outros dados que, em conjunto, permitam identificar uma
            pessoa de forma inequívoca.
          </p>

          <p>
            Os dados pessoais sensíveis são aqueles sobre origem racial ou
            étnica, convicção religiosa, opinião política, filiação a sindicato
            ou a organização de caráter religioso, filosófico ou político, dado
            referente à saúde ou à vida sexual, dado genético ou biométrico,
            quando vinculado a uma pessoa.
          </p>

          <p>
            Ao acessar este site, você declara estar ciente das normas desta
            política e ter feito a leitura completa e atenta das regras aqui
            contidas, conferindo, assim, seu livre e expresso consentimento com
            esta Política de Privacidade.
          </p>

          <h4>1. DADOS POSSIVELMENTE COLETADOS PELO DADOSJUSBR</h4>

          <li>
            <p>
              Visita ao site do DadosJusBr: durante a visita ao site, podemos
              registrar alguns dados, como dados relativos ao seu provedor de
              internet, sistema operacional, navegador, configurações de vídeo e
              páginas acessadas.
            </p>

            <p>
              Esses dados são coletados por meio de{' '}
              <Link
                color="inherit"
                href="https://www.techtudo.com.br/noticias/2018/10/o-que-sao-cookies-entenda-os-dados-que-os-sites-guardam-sobre-voce.ghtml"
              >
                cookies
              </Link>
              .o DadosJus utliza <strong>Cookies Obrigatórios</strong> porém
              Você pode ajustar suas configurações de navegador para desabilitar
              os cookies ou deletá-los. Caso estejam habilitados, nós (e os
              terceiros previamente mencionados) emitiremos cookies quando você
              interagir com o nosso site. Somente coletamos, via cookies, dados
              essenciais para o funcionamento do nosso site e para as métricas
              de acesso. Não compartilhamos esses dados com terceiros, além
              daqueles responsáveis pelos próprios cookies.
            </p>

            <p>
              Não serão automaticamente coletados dados pessoais; informações
              dessa natureza serão registradas em nossos bancos de dados apenas
              quando um formulário for preenchido voluntariamente pelo usuário.
            </p>

            <p>
              Além disso, o site do DadosJusBr usa a ferramenta{' '}
              <Link
                color="inherit"
                href="https://analytics.google.com/analytics/web/"
              >
                Google Analytics
              </Link>{' '}
              que analisa suas interações e como você usa o site. O Google
              Analytics é um serviço de web analytics que identifica os seus
              padrões de navegação no nosso site e gera relatórios sobre essas
              atividades, para que possamos melhorar o site do DadosJusBr. Para
              fazer isso, são coletados/compartilhados dados pessoais para
              contato, como você usa o site e dados que o identificam. O
              tratamento desses dados é regido pela{' '}
              <Link
                color="inherit"
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
              >
                política de privacidade do Google.
              </Link>
            </p>
          </li>

          <p>
            Para fins das atividades aqui mencionadas <strong>não serão</strong>{' '}
            coletados <strong>dados pessoais sensíveis.</strong>
          </p>

          <p>
            Os dados serão adquiridos mediante prévio consentimento coletado
            individualmente de forma clara, específica e legítima. O
            consentimento poderá ser alterado pelo titular a qualquer tempo para
            conceder novas permissões, retirar seu consentimento para permissões
            antigas e solicitar a exclusão de seus dados de nossa base de dados,
            conforme indicado no Item 5 abaixo.
          </p>

          <h4>2. FORMA DE UTILIZAÇÃO DOS DADOS COLETADOS</h4>

          <p>
            O DadosjusBR utliza os dados para: (i) nos comunicar com as pessoas
            interessadas; (ii) divulgar as nossas atividades; (iii) promover a
            associação de interessados à entidade; e (iv) identificar as
            características de acesso e navegação em nosso site.
          </p>

          <h4>3. COMPARTILHAMENTO DOS DADOS</h4>

          <p>
            De forma geral, o DadosJusBr não venderá, compartilhará, cederá ou
            transmitirá seus dados pessoais a terceiros sem prévio
            consentimento.
          </p>

          <p>
            Nas hipóteses em que seja necessária a manipulação de seus dados por
            fornecedores, o contrato de prestação de serviços contará com uma
            cláusula de confidencialidade para proteção desses dados.
          </p>

          <h4>4. TEMPO DE ARMAZENAMENTO DOS DADOS</h4>

          <p>
            O DadosJusBr apenas manterá os seus dados armazenados pelo tempo
            necessário para o cumprimento das finalidades para as quais foram
            coletados. A fim de manter o histórico de solicitações recebidas, os
            dados pessoais fornecidos serão anonimizados no prazo máximo de 3
            meses após a coleta dos dados.
          </p>

          <h4>5. SOLICITAR ACESSO E EXCLUSÃO DE DADOS</h4>

          <p>
            Os cookies de navegação podem ser apagados diretamente no seu
            navegador mas no caso de dados no analytics o usuário poderá
            solicitar uma cópia de suas informações pessoais a qualquer momento,
            bem como solicitar a correção ou remoção dessas informações. Caso o
            usuário deseje a exclusão imediata de seus dados, poderá, a qualquer
            momento, solicitá-la por mensagem enviada à nossa equipe por meio do
            e-mail:{' '}
            <Link
              color="inherit"
              href="mailto:contato@dadosjusbr.org"
              target="_blank"
              rel="noreferrer"
            >
              contato@dadosjusbr.org
            </Link>
          </p>
        </Grid>
      </Grid>
      <Footer />
    </Page>
  );
}
const Page = styled.div`
  background-color: #3e5363;
`;
