import { useMemo, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Button from './Button';
import * as url from '../url';
import ShareModal from './ShareModal';

export interface OMASummaryProps {
  totalMembers: number;
  maxWage: number;
  totalWage: number;
  maxPerk: number;
  totalPerks: number;
  chartData: any;
  year: number;
  agency: string;
}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const OMASummary: React.FC<OMASummaryProps> = ({
  totalMembers,
  maxWage,
  totalWage,
  maxPerk,
  totalPerks,
  chartData,
  year,
  agency,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const fileLink = useMemo(() => chartData.PackageURL, [chartData]);
  return (
    <>
      <Captions>
        <div>
          <span className="info">
            <img src="/img/icon_info.svg" alt="informações" />
            <div>
              <span>
                <b>Salário:</b> valor recebido de acordo com a prestação de
                serviços, em decorrência do contrato de trabalho.
                <br />
                <br />
                <b>Remuneração:</b> é a soma do salário mais outras vantagens
                (indenizações e benefícios). - Benefício: valores eventuais, por
                exemplo, auxílios alimentação, saúde, escolar... - Membro: é o
                integrante da carreira &apos;principal&apos; do órgão do sistema
                de justiça. Por exemplo, juízes, desembargadores, ministros,
                defensores, procuradores públicos, promotores de justiça,
                procuradores de justiça, etc...
              </span>
            </div>
          </span>
          <span>
            <h3>{totalMembers} Membros</h3>
          </span>
          <span>
            <img src="/img/anim-group-2/icon_salario.svg" alt="salário" />
          </span>
        </div>
        <ul>
          <CaptionItems>
            <img src="/img/anim-group-2/icon_salario.svg" alt="salário" />
            <div>
              <span>Maior salário: R$ {(maxWage / 1000).toFixed(2)} mil</span>
              <span>Total Salários: R$ {(totalWage / 100000).toFixed(2)}M</span>
            </div>
          </CaptionItems>
          <CaptionItems>
            <img src="/img/anim-group-2/icon_beneficio.svg" alt="beneficios" />
            <div>
              <span>Maior Benefício: R$ {(maxPerk / 1000).toFixed(2)} mil</span>
              <span>
                Total benefícios: R$ {(totalPerks / 1000000).toFixed(2)}M
              </span>
            </div>
          </CaptionItems>
        </ul>
      </Captions>
      <ShareModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
      <GraphDivWithPagination>
        <h3>Total de Remunerações de Membros por Mês em {year}</h3>
        <div className="main-chart-wrapper">
          {!chartData.Members ? (
            <ActivityIndicatorPlaceholder fontColor="#3e5363">
              <span>Não há dados de membros para esse mês</span>
            </ActivityIndicatorPlaceholder>
          ) : (
            <Chart
              options={{
                legend: {
                  show: false,
                },
                colors: ['#c9a0d0', '#513658'],
                chart: {
                  stacked: true,
                  toolbar: {
                    show: false,
                  },
                  zoom: {
                    enabled: true,
                  },
                },
                responsive: [
                  {
                    breakpoint: 500,
                    options: {
                      chart: {
                        width: '95%',
                      },
                    },
                  },
                ],
                plotOptions: {
                  bar: {
                    horizontal: true,
                    barHeight: '70%',
                  },
                },
                yaxis: {
                  decimalsInFloat: 2,
                  labels: {
                    show: true,
                    minWidth: 0,
                    maxWidth: 160,
                    style: {
                      colors: [],
                      fontSize: '14px',
                      fontFamily: 'Roboto Condensed, sans-serif',
                      fontWeight: 600,
                      cssClass: 'apexcharts-yaxis-label',
                    },
                  },
                },
                xaxis: {
                  categories: [
                    '> R$ 50 mil',
                    'R$ 40-50 mil',
                    'R$ 30-40 mil',
                    'R$ 20-30 mil',
                    'R$ 10-20 mil',
                    '< R$ 10 mil',
                  ],
                  title: {
                    text: 'Quantidade',
                    offsetY: 30,
                  },
                },
                fill: {
                  opacity: 1,
                },
                dataLabels: {
                  enabled: false,
                },
              }}
              series={[
                {
                  name: 'Membros',
                  data: [
                    chartData.Members['-1'],
                    chartData.Members['50000'],
                    chartData.Members['40000'],
                    chartData.Members['30000'],
                    chartData.Members['20000'],
                    chartData.Members['10000'],
                  ],
                },
              ]}
              width="100%"
              height="500"
              type="bar"
            />
          )}
        </div>
        <div className="buttons">
          <div>
            <a
              target="_blank"
              href={`/orgao/${agency}/${year}`}
              rel="noreferrer"
            >
              <Button
                textColor="#2FBB96"
                borderColor="#2FBB96"
                backgroundColor="#fff"
                hoverBackgroundColor="#2FBB96"
                className="left"
              >
                Voltar para anos
                <img src="/img/icon_calendario_green.svg" alt="calendário" />
              </Button>
            </a>
          </div>
          <div>
            <Button
              textColor="#3e5363"
              borderColor="#3e5363"
              backgroundColor="#fff"
              hoverBackgroundColor="#3e5363"
              onClick={() => setModalIsOpen(true)}
            >
              Compartilhar
              <img src="/img/icon_share.svg" alt="compartilhar" />
            </Button>
            <a href={url.downloadURL(fileLink)}>
              <Button
                textColor="#3e5363"
                borderColor="#3e5363"
                backgroundColor="#fff"
                hoverBackgroundColor="#3e5363"
              >
                Baixar
                <img src="/img/icon_download_share.svg" alt="download" />
              </Button>
            </a>
          </div>
        </div>
      </GraphDivWithPagination>
    </>
  );
};

const Captions = styled.div`
  padding: 2rem;
  width: 100%;
  min-width: 34rem;
  justify-content: center;
  color: #3e5363;
  background: rgba(62, 83, 99, 0.05);
  div {
    padding: 0 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    span {
      &.info {
        position: relative;
        div {
          background-color: #ced9e1;
          color: #3e5363;
          width: 800%;
          z-index: 100;
          padding: 2rem;
          font-size: 2rem;
          text-align: left;
          b {
            font-size: 1.5rem;
          }
          display: none;
          position: absolute;
        }
        &:hover {
          div {
            display: block;
          }
        }
      }
      h3 {
        text-align: center;
        font-size: 2rem;
      }
    }
    img {
      background-color: #3e5363;
      border-radius: 50%;
      width: 4rem;
    }
    align-items: center;
  }
  ul {
    list-style: none;
    margin-top: 3rem;
    border-top: 1px solid #3e5363;
    padding: 1rem 1rem;
    padding-top: 2rem;
    display: flex;
    transition: all 1s ease;
    flex-wrap: wrap;
    justify-content: space-around;
    @media (max-width: 600px) {
      justify-content: flex-start;
    }
  }
`;
const CaptionItems = styled.li`
  display: flex;
  align-items: center;
  & + li {
    @media (max-width: 765px) {
      margin-top: 5rem;
    }
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1.5rem;
    width: fit-content;
  }
  button.active {
    opacity: 0.4;
    width: 65%;
  }
  img {
    width: 4rem;
    background: #3e5363;
    border-radius: 50%;
  }
  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #3e5363;
    margin: 10px 0;
    text-align: left;
    font-family: 'Roboto Condensed', sans-serif;
  }
`;
const GraphDivWithPagination = styled.div`
  margin-top: 3rem;
  display: flex;
  align-self: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  color: #3e5363;
  background: rgba(62, 83, 99, 0.06);
  h3 {
    padding: 1.5rem;
  }
  .main-chart-wrapper {
    width: 100%;
    div {
      & > * {
        font-size: 125%;
      }
      text {
        font-family: 'Roboto Condensed', sans-serif;
        font-size: 2.5rem;
        @media (max-width: 600px) {
          font-size: 2rem;
        }
        color: #fff;
        font-weight: bold;
        &.title {
          font-size: 120%;
        }
      }
    }
    padding-bottom: 1rem;
    border-bottom: 2px solid #3e5363;
  }
  margin-bottom: 3rem;
`;

const ActivityIndicatorPlaceholder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20rem 0;
  span {
    margin-top: 3rem;
  }
  font-family: 'Roboto Condensed', sans-serif;
  color: ${(p: { fontColor?: string }) => (p.fontColor ? p.fontColor : '#FFF')};
  font-size: 3rem;
  align-items: center;
`;

export default OMASummary;