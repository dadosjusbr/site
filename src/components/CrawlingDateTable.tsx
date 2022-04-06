import styled from 'styled-components';
import MONTHS from '../@types/MONTHS';
import ActivityIndicator from './ActivityIndicator';

function TableRow(props) {
  const { month, crawlingtimeseconds } = props;
  const d = new Date(crawlingtimeseconds * 1000);
  return (
    <CrawlingDate>
      <CrawlingMonth>{MONTHS[month]}</CrawlingMonth> {d.getDate()} de {MONTHS[d.getMonth() + 1]} de {d.getFullYear()}
    </CrawlingDate>
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
      <>
        {data.length > 0 ? (
          <CrawlingDates>
            {data.map(d => (
              <TableRow
                month={d.Month}
                crawlingtimeseconds={d.CrawlingTimestamp.seconds}
              />
              // <pre>{JSON.stringify(d.CrawlingTimestamp.seconds)}</pre>
            ))}
          </CrawlingDates>
        ) : (
          <></>
        )}
      </>
    )}
  </div>
);

const CrawlingDates = styled.div`
  color: black;
`;

const CrawlingDate = styled.div`
  font-size: 1.8rem;
`;

const CrawlingMonth = styled.span`
  display: inline-block;
  width: 80px;
  font-size: 1.8rem;
  text-align: left;
`;

export default CrawlingDateTable;
