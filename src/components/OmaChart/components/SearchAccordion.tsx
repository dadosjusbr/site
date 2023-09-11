import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  Button,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ReactGA from 'react-ga4';

import Search from '../../Search';
import { searchHandleClick } from '../../../functions/query';
import { getCurrentYear } from '../../../functions/currentYear';
import ShareModal from '../../Common/ShareModal';
import { getSearchUrlParameter } from '../../../functions/url';
import api from '../../../services/api';

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
  for (let i = getCurrentYear(); i >= 2018; i -= 1) {
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
  const isFirstRender = useRef(true);

  const [expanded, setExpanded] = useState(false);

  const clearSearch = () => {
    setCategory('Tudo');
  };

  const firstRequest = async () => {
    setLoading(true);
    setShowResults(false);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('dev_mode');
      setQuery(url.search);
      const res = await api.ui.get(`/v2/pesquisar${url.search}`);
      const data = res.data.result.map((d, i) => {
        const item = d;
        item.id = i + 1;
        return item;
      });
      setResult(data);
      setDownloadAvailable(res.data.download_available);
      setDownloadLimit(res.data.download_limit);
      setNumRowsIfAvailable(res.data.num_rows_if_available);
      setShowResults(true);
    } catch (error) {
      setResult([]);
      setDownloadAvailable(false);
      setShowResults(false);
    } finally {
      setLoading(false);
      setExpanded(true);
    }
  };

  useEffect(() => {
    setCategory(getSearchUrlParameter('categorias') as string);

    // stop removing dev_mode from url when turning off dev_mode
    const url = new URL(window.location.href);
    url.searchParams.delete('dev_mode');

    // turn this into location.search !== '' when removing dev_mode feature
    url.search !== '' && firstRequest();

    const timer = setTimeout(() => {
      url.search !== '' && window.location.assign('#search-accordion');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const url = new URL(window.location.href);
    const params = url.searchParams;
    params.set('anos', selectedYears != null ? selectedYears.toString() : '');
    params.set('meses', selectedMonths.map(m => String(m.value)).join(','));
    params.set('orgaos', selectedAgencies.map(a => a.id_orgao).join(','));
    params.set(
      'categorias',
      category
        .split(' ')
        .at(category === 'Remuneração base' ? -1 : 0)
        .toLowerCase(),
    );
    window.history.replaceState({}, '', `${url}`);
  }, [category]);

  return (
    <Grid item xs={12} md={20}>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="search-accordion"
        >
          <Typography align="center" variant="h6">
            Pesquisar dados coletados
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
            sharable={false}
            loading={loading}
            showResults={showResults}
            numRowsIfAvailable={numRowsIfAvailable}
            downloadAvailable={downloadAvailable}
            downloadLimit={downloadLimit}
            result={result}
            setModalIsOpen={setModalIsOpen}
            downloadButton={
              <Button
                variant="outlined"
                color="secondary"
                endIcon={<CloudDownloadIcon />}
                disabled={!downloadAvailable}
                onClick={() => {
                  ReactGA.event('file_download', {
                    category: 'download',
                    action: `From: ${window.location.pathname}`,
                  });
                }}
                href={`${process.env.API_BASE_URL}/v2/download${query}`}
                id="download-button"
              >
                BAIXAR DADOS FILTRADOS
              </Button>
            }
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
