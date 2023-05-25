import React from 'react';
import {
  EmailShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton,
} from 'react-share';
import ReactGA from 'react-ga4';
import { Box, IconButton, Typography, Modal, Dialog } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FormatQuote from '@mui/icons-material/FormatQuote';
import ContentCopy from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';

import MONTHS from '../@types/MONTHS';

interface ShareModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  url?: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onRequestClose,
  url,
}) => {
  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const year = new Date().getFullYear();
  const date = `${new Date().getDate()} de ${MONTHS[new Date().getMonth() + 1]
    .substring(0, 3)
    .toLowerCase()}. de ${year}`;

  const handleQuoteOpen = () => {
    setQuoteOpen(!quoteOpen);
  };
  const text = `DADOSJUSBR, ${year}. Disponível em:${'\n'}<${url}>.${'\n'}Acesso em: ${date}.`;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(text);
    ReactGA.event('share', {
      action: 'share',
      category: 'copy to clipboard',
    });
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Modal open={isOpen} onClose={onRequestClose} aria-labelledby="modal-title">
      <>
        <Box
          textAlign="center"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 320,
            bgcolor: 'background.paper',
            border: '2px solid #fff',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Compartilhar
          </Typography>
          <WhatsappShareButton
            url={url || window.location.href}
            onClick={() =>
              ReactGA.event('share', {
                action: 'share',
                category: 'whatsapp',
              })
            }
          >
            <IconButton aria-label="whatsapp" size="large">
              <WhatsAppIcon />
            </IconButton>
          </WhatsappShareButton>
          <TwitterShareButton
            url={url || window.location.href}
            onClick={() =>
              ReactGA.event('share', {
                action: 'share',
                category: 'twitter',
              })
            }
          >
            <IconButton aria-label="twitter" size="large">
              <TwitterIcon />
            </IconButton>
          </TwitterShareButton>
          <FacebookShareButton
            url={url || window.location.href}
            onClick={() =>
              ReactGA.event('share', {
                action: 'share',
                category: 'facebook',
              })
            }
          >
            <IconButton aria-label="facebook" size="large">
              <FacebookOutlinedIcon />
            </IconButton>
          </FacebookShareButton>
          <EmailShareButton
            url={url || window.location.href}
            onClick={() =>
              ReactGA.event('share', {
                action: 'share',
                category: 'email',
              })
            }
          >
            <IconButton aria-label="email" size="large">
              <EmailOutlinedIcon />
            </IconButton>
          </EmailShareButton>
          <IconButton aria-label="quote" size="large" onClick={handleQuoteOpen}>
            <FormatQuote />
          </IconButton>
        </Box>

        <Dialog open={quoteOpen} onClose={handleQuoteOpen}>
          <Box
            sx={{
              px: 2,
              py: 2,
              bgcolor: 'background.paper',
              border: '2px solid #fff',
              overflow: 'auto',
            }}
          >
            <Box display="flex">
              <Typography
                id="dialog-title"
                variant="h6"
                component="h2"
                margin="auto"
              >
                Citar
              </Typography>
              <IconButton onClick={handleClick}>
                <ContentCopy />
              </IconButton>
            </Box>

            <Typography>{text}</Typography>

            <Snackbar
              open={open}
              autoHideDuration={4000}
              onClose={handleClose}
              message="Copiado para a área de transferência"
              action={action}
            />
          </Box>
        </Dialog>
      </>
    </Modal>
  );
};

export default ShareModal;
