import * as React from 'react';
import { Box } from '@mui/material';
import { QA } from './QA';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionTypography,
  DetailsTypography,
} from './QAComponents';

export default function FAQ() {
  return (
    <Box mt={2}>
      <CustomizedAccordions />
    </Box>
  );
}

function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {QA.map(({ id, question, answer }, index) => (
        <Accordion
          key={id}
          expanded={expanded === `panel${id}`}
          onChange={handleChange(`panel${id}`)}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            aria-controls={`panel${id}d-content`}
            id={`panel${id}d-header`}
          >
            <AccordionTypography>
              {index + 1}°&#41; {question}
            </AccordionTypography>
          </AccordionSummary>
          <AccordionDetails>
            <DetailsTypography>{answer}</DetailsTypography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
