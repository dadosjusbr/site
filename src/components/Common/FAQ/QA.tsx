import { Box, Link } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { useState } from 'react';

export const QA = [
  {
    id: 1,
    question: (
      <span>
        As remunerações contemplam servidores públicos lotados em cargos
        administrativos, técnicos, de assessoramento, entre outros?
      </span>
    ),
    answer: (
      <span>
        Não. O DadosJusBr monitora apenas a remuneração dos membros do sistema
        de justiça, isto é, magistrados no Judiciário e promotores e
        procuradores do Ministério Público.
      </span>
    ),
  },
  {
    id: 2,
    question: <span>Os valores estão corrigidos pela inflação?</span>,
    answer: (
      <span>
        Não. Os valores correspondem ao que foi pago no mês e ano de referência.
      </span>
    ),
  },
  {
    id: 3,
    question: (
      <span>
        Todos os proventos, incluindo salário, benefícios e indenizações, foram
        efetivamente recebidos pelos membros?
      </span>
    ),
    answer: (
      <span>
        É necessário analisar caso a caso. Sobre os valores brutos incidem
        descontos de abatimento do teto constitucional, contribuições
        previdenciárias e imposto de renda. Portanto, o salário líquido será em
        geral inferior ao salário bruto.
      </span>
    ),
  },
  {
    id: 4,
    question: <span>Quais remunerações estão incluídas nos “benefícios”?</span>,
    answer: (
      <span>
        A categoria “benefícios” inclui todas as verbas de caráter remuneratório
        ou indenizatório, sem distinção, que são pagas adicionalmente ao salário
        base do membro.
        <br />
        A princípio, juntar essas verbas de naturezas distintas contribui para
        enxergar o peso de todos os benefícios nos contracheques dos membros,
        mas também dificulta a compreensão de quais benefícios são limitados
        pelo teto remuneratório, uma vez que ele incide apenas sobre os
        benefícios remuneratórios e não sobre os indenizatórios.
        <br />
        Contudo, essa escolha foi necessária porque a falta de transparência dos
        diversos contracheques dificulta a identificação de cada uma dessas
        verbas de acordo com sua natureza.
        <br />A falta de padronização das rubricas que tratam sobre os mesmos
        benefícios, por exemplo, assim como a presença recorrente de rubricas
        temporárias sem descrição clara, são alguns dos entraves para a
        identificação confiável da natureza de cada benefício.
      </span>
    ),
  },
  {
    id: 5,
    question: (
      <span>
        Ao utilizar os dados em uma reportagem ou estudo, como devem ser
        creditados?
      </span>
    ),
    answer: (
      <span>
        Reportagens devem mencionar que os dados foram obtidos do DadosJusBr,
        informando que trata-se de um projeto da Transparência Brasil.
        <br />
        Para referências acadêmicas, basta ir na consulta dos órgãos, clicar no
        botão “Compartilhar” e depois no ícone de aspas. Será disponibilizado um
        texto com a referência, como no texto e imagem na sequência:
        <br />
        <br />
        “DADOSJUSBR. Tribunal Regional do Trabalho da 1ª Região. Disponível em:
        https://dadosjusbr.org/orgao/trt1. Acesso em: 07 de ago. de 2024.”
        <br />
        <br />
        <SimpleBackdrop>
          <Box sx={{ border: '1px solid #fff' }} display="flex">
            <Image
              src="/img/FAQ/exemplo-citacao.png"
              alt="Exemplo de citação"
              width={1418}
              height={944}
            />
          </Box>
        </SimpleBackdrop>
      </span>
    ),
  },
  {
    id: 6,
    question: <span>Quais são as fontes dos dados apresentados?</span>,
    answer: (
      <span>
        Os dados do Judiciário são extraídos do Painel de Remuneração dos
        Magistrados do Conselho Nacional de Justiça e do portal oficial do
        Supremo Tribunal Federal. Os dados do Ministério Público são obtidos no
        portal de transparência de cada órgão, já que não existe centralização
        das informações em uma única plataforma oficial.
      </span>
    ),
  },
  {
    id: 7,
    question: <span>Com qual frequência os dados são atualizados?</span>,
    answer: (
      <span>
        Os dados são atualizados mensalmente. A coleta de dados ocorre em dois
        momentos:
        <br />
        Todo dia 1°: verificação da disponibilidade dos meses ausentes na série
        histórica.
        <br />
        Todo dia 16: coleta dos contracheques referentes ao mês anterior.
      </span>
    ),
  },
  {
    id: 8,
    question: (
      <span>
        Existem limitações ou implicações legais para o uso dos dados fornecidos
        pela plataforma?
      </span>
    ),
    answer: (
      <span>
        O projeto disponibiliza dados brutos para download obtidos das fontes
        oficiais, sem alterações. Nos gráficos, há consolidações por órgão, mês,
        ano e benefícios, sem adulterar os valores individuais disponibilizados
        pelos órgãos. DadosJusBr não opina sobre os dados. A manipulação dessas
        informações, bem como o teor de sua divulgação, é de responsabilidade do
        usuário.
      </span>
    ),
  },
  {
    id: 9,
    question: (
      <span>Como é garantida a precisão e a confiabilidade dos dados?</span>
    ),
    answer: (
      <span>
        A equipe do DadosJusBr desenvolveu uma metodologia consistente e
        confiável para coleta, limpeza, sistematização, sanitização e divulgação
        automatizada dos contracheques. Todos os estágios da metodologia
        utilizada podem ser acessados no nosso{' '}
        <Link href="https://github.com/dadosjusbr">repositório no GitHub</Link>.
        Além disso, disponibilizamos a seção &ldquo;Mais informações sobre a
        coleta&rdquo; no DadosJus, que fornece detalhes sobre a obtenção e
        tratamento de dados da folha de pagamento mensal de cada órgão.
        <br />
        Quando o órgão não divulga os dados, os robôs realizam mensalmente novas
        varreduras para tentar obtê-los. Quando a coleta é bem-sucedida em um
        dado mês, ela não é atualizada novamente. Portanto, o usuário deve estar
        ciente de que podem ocorrer divergências caso os órgãos modifiquem os
        dados inicialmente informados.
        <br />O projeto também realiza rotineiras análises de integridade das
        informações para verificar possíveis erros das fontes oficiais. usuário.
      </span>
    ),
  },
  {
    id: 10,
    question: (
      <span>
        Como posso reportar erros ou inconsistências nos dados, tirar outras
        dúvidas sobre o DadosJusBr ou sugerir melhorias e novos recursos para a
        plataforma?
      </span>
    ),
    answer: (
      <span>
        Sua opinião é essencial para fortalecer o projeto. Envie um e-mail para{' '}
        <Link href="mailto:contato@dadosjusbr.org">contato@dadosjusbr.org</Link>
      </span>
    ),
  },
];

export default function SimpleBackdrop({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Box px={{ xs: 2, md: 4 }}>{children}</Box>
      </Backdrop>
    </div>
  );
}
