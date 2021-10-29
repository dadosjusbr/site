import React from 'react';
import styled from 'styled-components';
import MONTHS from '../@types/MONTHS';

const ErrorTable: React.FC<{
  error: any;
  agency: string;
  month: number;
  year: number;
}> = ({ error, agency, month, year }) => (
  <Container>
    <div className="error-header">
      <span>
        A Coleta do Órgão <strong>{agency.toUpperCase()}</strong> em{' '}
        {MONTHS[month]} de {year} não foi realizada{' '}
      </span>
      <span className="info">
        <img src="/img/icon_info.svg" alt="informações" />
        <div>
          <span>
            <b>O que é isso?</b> quando existe um problema na coleta de um mês o
            site do dadosjusbr salva a informação de porquê não foi possível
            coletar o dado mês
          </span>
        </div>
      </span>
    </div>
    <Table>
      <tbody>
        <tr>
          <th>Stderr</th>
          <td>{error.stderr}</td>
        </tr>
        <tr>
          <th>Comando</th>
          <td>
            <code>{error.cmd}</code>
          </td>
        </tr>
        <tr>
          <th>Stdin</th>
          <td>
            <code>{error.stdin}</code>
          </td>
        </tr>
        <tr>
          <th>Status</th>
          <td>{error.status}</td>
        </tr>
      </tbody>
    </Table>
    <p>
      Você pode reportar problemas acessando o no o nosso{' '}
      <a href="https://github.com/dadosjusbr/coletas/issues">
        repositório de colétas
      </a>{' '}
      e submentendo sua issue
    </p>
  </Container>
);

const Container = styled.div`
  .error-header {
    display: flex;
    align-items: center;
  }
  .info {
    margin-left: 1rem;
    position: relative;
    div {
      background-color: #ced9e1;
      color: #3e5363;
      width: 900%;
      z-index: 100;
      padding: 2rem;
      font-size: 1rem;
      right: 0%;
      text-align: left;
      b {
        font-size: 2rem;
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
  display: flex;
  flex: 1;
  background-color: #3e5363;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 3rem;
  span {
    font-size: 2rem;
    font-weight: 400;
    strong {
      font-size: 2rem;
    }
  }

  p {
    margin-top: 2.3rem;
    font-size: 1.6rem;
    a {
      font-size: 1.6rem;
      color: #fff;
      text-decoration: underline;
    }
  }
`;

const Table = styled.table`
  padding: 2rem 0;
  margin-top: 3.5rem;
  width: 90%;
  tr {
    border: 1px solid #ddd;
    padding: 0.35em;
    justify-content: space-between;
  }
  table,
  td,
  th {
    margin: 0;
  }
  tr,
  td,
  th {
    background-color: #fff;
    color: #3e5363;
  }
  code {
    font-size: 1.2rem;
  }
  td {
    width: 65%;
    padding: 1.3rem;
    font-size: 1.5rem;
    justify-content: center;
  }
  th {
    padding: 1.6rem;
    align-items: center;
    font-size: 1.6rem;
  }
  @media (max-width: 820px) {
    code {
      font-size: 0.9rem;
    }
    td {
      font-size: 1.1rem;
    }
    th {
      font-size: 1.2rem;
    }
  }
  @media (max-width: 820px) {
    code {
      font-size: 0.9rem;
    }
    td {
      font-size: 1rem;
    }
    th {
      font-size: 1rem;
    }
  }
`;

export default ErrorTable;
