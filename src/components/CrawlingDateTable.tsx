import styled from 'styled-components';
import MONTHS from '../@types/MONTHS';
import ActivityIndicator from './ActivityIndicator';

function TableRow(props) {
  const { month, crawlingtimeseconds } = props;
  const d = new Date(crawlingtimeseconds * 1000);
  return (
    <tr>
      <td width={80} align="left">
        {MONTHS[month]}
      </td>
      <td align="right">
        {d.getDate()} de {MONTHS[d.getMonth() + 1]} de {d.getFullYear()}
      </td>
    </tr>
  );
}

const CrawlingDateTable: React.FC<{
  data;
  dataLoading;
}> = ({ data, dataLoading }) => (
  <div>
    {dataLoading ? (
      <>
        <ActivityIndicator spinnerColor="#3e5363" />
        <span>Aguarde...</span>
      </>
    ) : (
      <CrawlingDates>
        <Heading>Datas de realização das coletas dos dados</Heading>
        {data.length > 0 ? (
          <CrawlingTable>
            <table>
              {data.map(d => (
                <TableRow
                  month={d.Month}
                  crawlingtimeseconds={d.CrawlingTimestamp.seconds}
                />
                // <pre>{JSON.stringify(d.CrawlingTimestamp.seconds)}</pre>
              ))}
            </table>
          </CrawlingTable>
        ) : (
          <></>
        )}
      </CrawlingDates>
    )}
  </div>
);

const CrawlingDates = styled.div`
  color: black;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CrawlingTable = styled.div`
  > table > tr > td {
    font-size: 1.6rem;
  }
`;

const Heading = styled.h2`
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

export default CrawlingDateTable;
