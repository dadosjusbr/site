import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Search from '../../Search';
import { searchHandleClick } from '../../../functions/query';
import { getCurrentYear } from '../../../functions/currentYear';
import ShareModal from '../../Common/ShareModal';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';

type SearchAccordionProps = {
  selectedYears: number;
  selectedMonths: Month[];
  selectedAgencies: Agency[];
};

const SearchAccordion = ({
  selectedYears,
  selectedMonths,
  selectedAgencies,
}: SearchAccordionProps) => {
  const years: number[] = [];
  for (let i = getCurrentYear(); i >= 2018; i--) {
    years.push(i);
  }

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('Tudo');
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState([]);
  const [downloadAvailable, setDownloadAvailable] = useState(false);
  const [downloadLimit, setDownloadLimit] = useState(100000);
  const [numRowsIfAvailable, setNumRowsIfAvailable] = useState(0);
  const [query, setQuery] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const clearSearch = () => {
    setCategory('Tudo');
  };

  return (
    <Grid item xs={12} md={20}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography align="center" variant="h6">
            Investigar dados de remunerações
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Search.CategorySelect
                category={category}
                setCategory={setCategory}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} py={3}>
            <Grid item xs={12} sm={3}>
              <Search.Button
                color="secondary"
                loading={loading}
                onClick={() =>
                  searchHandleClick({
                    selectedYears,
                    years,
                    selectedMonths,
                    selectedAgencies,
                    category,
                    setLoading,
                    setResult,
                    setDownloadAvailable,
                    setNumRowsIfAvailable,
                    setShowResults,
                    setQuery,
                    setDownloadLimit,
                  })
                }
                startIcon={<SearchOutlinedIcon />}
              >
                Pesquisar
              </Search.Button>
            </Grid>
            <Grid item xs={12} sm={9} display="flex" justifyContent="right">
              <Search.Button
                color="secondary"
                onClick={clearSearch}
                startIcon={<SearchOffOutlinedIcon />}
              >
                Limpar pesquisa
              </Search.Button>
            </Grid>
          </Grid>
          <Search.Result
            downloadble={false}
            loading={loading}
            showResults={showResults}
            numRowsIfAvailable={numRowsIfAvailable}
            downloadAvailable={downloadAvailable}
            downloadLimit={downloadLimit}
            result={result}
            query={query}
            setModalIsOpen={setModalIsOpen}
          />
          <ShareModal
            isOpen={modalIsOpen}
            url={`https://dadosjusbr.org/pesquisar${query}`}
            onRequestClose={() => setModalIsOpen(false)}
          />
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default SearchAccordion;
