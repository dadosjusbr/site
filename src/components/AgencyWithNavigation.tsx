import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import ShareModal from './ShareModal';
import RemunerationBarGraph from './RemunerationBarGraph';
import * as url from '../url';

export interface AgencyPageWithNavigationProps {
  id: string;
  year: number;
  title: string;
  nextDateIsNavigable: boolean;
  previousDateIsNavigable: boolean;
  setYear: (y: number) => void;
  data: any[];
  dataLoading: boolean;
  navigableMonth: number;
  summaryPackage?: any;
}

const AgencyPageWithNavigation: React.FC<AgencyPageWithNavigationProps> = ({
  id,
  title,
  year,
  setYear,
  data,
  dataLoading,
  navigableMonth,
  summaryPackage,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const nextDateIsNavigable = useMemo<boolean>(
    () => year !== new Date().getFullYear(),
    [year],
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(navigableMonth);
  const previousDateIsNavigable = useMemo<boolean>(() => year !== 2018, [year]);
  return (
    <>
      <MainGraphSection>
        <MainGraphSectionHeader>
          <a href={`/orgao/${id}/${year}`}>
            <h2>
              {title} ({id.toLocaleUpperCase('pt')})
            </h2>
          </a>
          <div>
            <button
              className="left"
              onClick={() => setYear(year - 1)}
              disabled={!previousDateIsNavigable}
              type="button"
            >
              <img src="/img/arrow.svg" alt="seta esquerda" />
            </button>
            <span>{year}</span>
            <button
              disabled={!nextDateIsNavigable}
              onClick={() => setYear(year + 1)}
              type="button"
            >
              <img src="/img/arrow.svg" alt="seta direita" />
            </button>
          </div>
        </MainGraphSectionHeader>
        <RemunerationBarGraph
          onMonthChange={month => {
            if (selectedMonth === month) {
              setSelectedMonth(navigableMonth);
            } else {
              setSelectedMonth(month);
            }
          }}
          data={data}
          year={year}
          dataLoading={dataLoading}
        />
        <div className="buttons">
          <div>
            {summaryPackage && (
              <a
                target="_blank"
                href={url.downloadURL(summaryPackage.Package.url)}
                rel="noreferrer"
              >
                <Button
                  textColor="#3e5363"
                  borderColor="#3e5363"
                  backgroundColor="#fff"
                  hoverBackgroundColor="#3e5363"
                  id="download-button"
                >
                  Baixar Dados
                  <img src="/img/icon_download_share.svg" alt="compartilhar" />
                </Button>
              </a>
            )}
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
            <a href={`/orgao/${id}/${year}/${selectedMonth}`}>
              <Button
                textColor="#B361C6"
                borderColor="#B361C6"
                backgroundColor="#fff"
                hoverBackgroundColor="#B361C6"
              >
                Explorar Meses
                <img src="/img/icon_calendario.svg" alt="calendario" />
              </Button>
            </a>
          </div>
        </div>
        <ShareModal
          isOpen={modalIsOpen}
          url={`https://dadosjusbr.org/orgao/${id}/${year}`}
          onRequestClose={() => setModalIsOpen(false)}
        />
      </MainGraphSection>
    </>
  );
};

export default AgencyPageWithNavigation;
const MainGraphSectionHeader = styled.div`
  font-size: 4rem;
  color: #3e5363;
  display: flex;
  a {
    color: #3e5363;
    text-decoration: none;
    &:hover {
      h2 {
        text-decoration: underline #3e5363;
      }
    }
  }
  width: 35rem;
  flex-direction: column;
  align-items: center;
  align-self: center;
  h2 {
    margin-bottom: 1rem;
    font-size: 3rem;
  }
  span {
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: 400;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    button {
      &:disabled,
      &[disabled] {
        border: 2px solid #3e5363;
        img {
          filter: invert(75%) sepia(56%) saturate(285%) hue-rotate(163deg)
            brightness(87%) contrast(84%);
        }
        background-color: #fff;
      }
      &.left {
        transform: rotate(180deg);
      }
      img {
        position: initial;
      }
      width: 30px;
      color: #3e5363;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: none;
      background-color: #3e5363;
    }
    span {
      font-size: 2rem;
      font-weight: bold;
    }
  }
  margin-bottom: 4.5rem;
`;
const MainGraphSection = styled.section`
  padding: 5rem;
  @media (max-width: 600px) {
    padding: 1rem;
  }
  @media (min-width: 600px) {
    margin-left: 8rem;
    margin-right: 8rem;
  }
  margin-bottom: 4rem;
  text-align: center;
  background-color: #fff;
  font-size: 4rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto Condensed', sans-serif;
  .buttons {
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    #download-button:hover {
      img {
        filter: brightness(0) invert(1);
      }
    }
    div {
      @media (max-width: 600px) {
        justify-content: center;
      }
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      & + div {
        & > :first-child {
          &:hover {
            img {
              filter: brightness(0) invert(1);
            }
          }
        }
      }
    }
    @media (max-width: 600px) {
      justify-content: center;
    }
    button {
      font-size: 2rem;
      margin: 1rem;
      position: relative;
      img {
        right: 3rem;
        position: absolute;
      }
    }
  }
`;
