import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  Button,
} from '@mui/material';
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
import { months } from '../../../@types/MONTHS';

type SearchAccordionProps = {
  selectedAgencies: Agency[];
  agencyName: string;
};

const SearchAccordion = ({
  selectedAgencies,
  agencyName,
}: SearchAccordionProps) => {
  const years: number[] = [];
  for (let i = getCurrentYear(); i >= 2018; i -= 1) {
    years.push(i);
  }

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedYears, setSelectedYears] = useState(getCurrentYear());
  const [selectedMonths, setSelectedMonths] = useState(months);
  const [category, setCategory] = useState('Tudo');
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState([]);
  const [downloadAvailable, setDownloadAvailable] = useState(false);
  const [downloadLimit, setDownloadLimit] = useState(100000);
  const [numRowsIfAvailable, setNumRowsIfAvailable] = useState(0);
  const [query, setQuery] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [URLToChange, setURLToChange] = useState(
    new URL(`https://dadosjusbr.org${router.asPath}`),
  );

  const [expanded, setExpanded] = useState(false);

  const clearSearch = () => {
    setCategory('Tudo');
    setSelectedMonths(months);
    setSelectedYears(getCurrentYear());
  };

  const SearchHandleClick = () => {
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
    });
    URLToChange.searchParams.set('anos', selectedYears.toString());
    URLToChange.searchParams.set(
      'meses',
      selectedMonths.map(m => String(m.value)).join(','),
    );
    URLToChange.searchParams.set(
      'categorias',
      category
        .split(' ')
        .at(category === 'Remuneração base' ? -1 : 0)
        .toLowerCase(),
    );
  };

  useEffect(() => {
    setURLToChange(new URL(window.location.href));
    let timer: NodeJS.Timeout;

    if (window.location.pathname.split('/').includes('orgao')) {
      setCategory(getSearchUrlParameter('categorias') as string);
      setSelectedMonths(getSearchUrlParameter('meses') as Month[]);
      setSelectedYears(getSearchUrlParameter('anos') as number);

      if (
        URLToChange.search.includes('categorias') ||
        URLToChange.search.includes('meses') ||
        URLToChange.search.includes('anos')
      ) {
        setExpanded(true);

        timer = setTimeout(() => {
          window.location.assign('#search-accordion');
        }, 1500);
      }
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid item xs={12} md={20}>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="search-accordion"
        >
          <Typography align="center" variant="h6">
            Baixar um subconjunto desses dados
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Search.YearsAutocomplete
                selectedYears={selectedYears}
                setSelectedYears={setSelectedYears}
                years={years}
              />
            </Grid>
            <Grid item xs={12}>
              <Search.MonthsAutocomplete
                selectedMonths={selectedMonths}
                setSelectedMonths={setSelectedMonths}
                months={months}
              />
            </Grid>
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
                onClick={SearchHandleClick}
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
            buttonColorScheme="secondary"
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
            agencyName={agencyName}
            url={`
              ${URLToChange.origin}/orgao/${selectedAgencies.map(
              d => d?.id_orgao,
            )}${URLToChange.search}`}
            onRequestClose={() => setModalIsOpen(false)}
          />
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default SearchAccordion;
