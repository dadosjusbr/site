import styled from 'styled-components';
import MONTHS from '../@types/MONTHS';
import ActivityIndicator from './ActivityIndicator';

function TableRow(props) {
  const t = props.crawlingtimeseconds;
  const d = new Date(t.CrawlingTimestamp.seconds * 1000);
  return (
    <CrawlingDate>
      {d.getDate()} de {MONTHS[d.getMonth() + 1]} de {d.getFullYear()}
    </CrawlingDate>
  );
}

const CrawlingDateTable: React.FC<{
  data;
  dataLoading;
}> = ({ data, dataLoading }) => (
  <div>
    {dataLoading ? (
      <ActivityIndicatorPlaceholder fontColor="#3e5363">
        <ActivityIndicator spinnerColor="#3e5363" />
        <span>Aguarde...</span>
      </ActivityIndicatorPlaceholder>
    ) : (
      <>
        {data.length > 0 ? (
          <CrawlingDates>
            {data.map(t => (
              <TableRow crawlingtimeseconds={t} />
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

export default CrawlingDateTable;
