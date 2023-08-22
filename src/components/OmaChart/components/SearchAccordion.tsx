import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import Search from '../../Search';

const SearchAccordion = () => {
  const [category, setCategory] = useState('');

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
            <Tooltip
              placement="bottom"
              title={
                <Typography fontSize={{ xs: '0.8rem', md: '0.9rem' }}>
                  <b>Chave:</b> Valor.
                  <hr />
                </Typography>
              }
            >
              <IconButton aria-label="Botão de informações">
                <InfoIcon />
              </IconButton>
            </Tooltip>
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
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default SearchAccordion;
