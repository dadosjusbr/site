import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { ExpandMore, Info } from '@mui/icons-material';
import PublicIcon from '@mui/icons-material/Public';
import TwitterIcon from '@mui/icons-material/Twitter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from 'react';

type MoreInfoAccordionProps = {
  children: React.ReactNode;
  ombudsman: string;
  twitterHandle: string;
  timestamp: number;
  repository: string;
};

const MoreInfoAccordion = ({
  children,
  ombudsman,
  repository,
  timestamp,
  twitterHandle,
}: MoreInfoAccordionProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Accordion elevation={0}>
      <AccordionSummary
        onClick={handleClick}
        expandIcon={open ? <ExpandMore /> : <Info />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {children}
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        <Typography variant="h6" textAlign="center">
          - Mais informações sobre o órgão -
        </Typography>
        <List dense sx={{ display: 'flex', justifyContent: 'center' }}>
          <ListItem disablePadding sx={{ width: 'fit-content' }}>
            <ListItemButton
              href={ombudsman && new URL(ombudsman).origin}
              target="_blank"
            >
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText
                primary="Portal de transparência"
                secondary={ombudsman && new URL(ombudsman).hostname}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ width: 'fit-content' }}>
            <ListItemButton
              href={twitterHandle ? `https://twitter.com/${twitterHandle}` : ''}
              target="_blank"
            >
              <ListItemIcon>
                <TwitterIcon />
              </ListItemIcon>
              <ListItemText
                primary="Twitter"
                secondary={twitterHandle ? `@${twitterHandle}` : 'Não possui'}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ width: 'fit-content' }}>
            <ListItemButton href={repository} target="_blank">
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Data da coleta"
                secondary={
                  timestamp
                    ? new Date(1000 * timestamp).toLocaleDateString('pt-BR')
                    : 'Não Coletado'
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default MoreInfoAccordion;
