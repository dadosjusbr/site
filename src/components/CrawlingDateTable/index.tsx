import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MONTHS from '../../@types/MONTHS';

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

function DateTable({ data }: { data: v2MonthTotals[] }) {
  return (
    <Accordion
      sx={{
        minWidth: 230,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Datas de realização das coletas dos dados</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <table>
            <tbody>
              {data.map(d => (
                <TableRow
                  key={d.mes}
                  month={d.mes}
                  crawlingtimeseconds={d.timestamp.seconds}
                />
              ))}
            </tbody>
          </table>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

const CrawlingDateTable: React.FC<{
  data: v2MonthTotals[];
  dataLoading: boolean;
}> = ({ data, dataLoading }) => (
  <div>
    {dataLoading ? (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <CircularProgress color="info" />
        </div>
        <p>Aguarde...</p>
      </Box>
    ) : (
      data && data.length && data[0].timestamp && <DateTable data={data} />
    )}
  </div>
);

export default CrawlingDateTable;
