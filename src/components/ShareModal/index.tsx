import React from 'react';
import {
  EmailShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton,
} from 'react-share';
import ReactGA from 'react-ga4';
import {
  Box,
  IconButton,
  Typography,
  Modal,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FormatQuote from '@mui/icons-material/FormatQuote';
import ContentCopy from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import { Link as LinkButton } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import {
  setUtmParameters,
  removeUtmParameters,
} from '../../functions/utmParameters';

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
  const [open, setOpen] = React.useState(false);
  const [quote, setQuote] = React.useState(false);
  const year = new Date().getFullYear();
  const date = `${new Date().toLocaleDateString('pt-BR', {
    calendar: 'gregory',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })}`;

  const text = `DADOSJUSBR, ${year}. Disponível em: <${removeUtmParameters(
    url,
  )}>. ${' '}Acesso em: ${date}.`;

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(
      quote
        ? text
        : setUtmParameters(
            `${url || window.location.href}`,
            'copied_link',
            'site_share',
            'share_buttons',
          ),
    );
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
            width: '90%',
            maxWidth: 650,
            bgcolor: 'background.paper',
            border: '2px solid #fff',
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Compartilhar
          </Typography>

          <IconButton
            aria-label="copy link"
            size="large"
            title="Copiar link"
            onClick={() => setQuote(false)}
          >
            <LinkButton />
          </IconButton>
          <IconButton
            aria-label="quote"
            size="large"
            title="Fazer citação"
            onClick={() => setQuote(true)}
          >
            <FormatQuote />
          </IconButton>
          <WhatsappShareButton
            url={setUtmParameters(
              `${url || window.location.href}`,
              'whatsapp',
              'site_share',
              'share_buttons',
            )}
            onClick={() =>
              ReactGA.event('share', {
                action: 'share',
                category: 'whatsapp',
              })
            }
          >
            <IconButton
              aria-label="whatsapp"
              size="large"
              title="Compartilhar no Whatsapp"
            >
              <WhatsAppIcon />
            </IconButton>
          </WhatsappShareButton>
          <TwitterShareButton
            url={setUtmParameters(
              `${url || window.location.href}`,
              'twitter',
              'site_share',
              'share_buttons',
            )}
            onClick={() =>
              ReactGA.event('share', {
                action: 'share',
                category: 'twitter',
              })
            }
          >
            <IconButton
              aria-label="twitter"
              size="large"
              title="Compartilhar no Twitter"
            >
              <TwitterIcon />
            </IconButton>
          </TwitterShareButton>
          <FacebookShareButton
            url={setUtmParameters(
              `${url || window.location.href}`,
              'facebook',
              'site_share',
              'share_buttons',
            )}
            onClick={() =>
              ReactGA.event('share', {
                action: 'share',
                category: 'facebook',
              })
            }
          >
            <IconButton
              aria-label="facebook"
              size="large"
              title="Compartilhar no Facebook"
            >
              <FacebookOutlinedIcon />
            </IconButton>
          </FacebookShareButton>
          <EmailShareButton
            url={setUtmParameters(
              `${url || window.location.href}`,
              'email',
              'site_share',
              'share_buttons',
            )}
            onClick={() =>
              ReactGA.event('share', {
                action: 'share',
                category: 'email',
              })
            }
          >
            <IconButton
              aria-label="email"
              size="large"
              title="Compartilhar com Email"
            >
              <EmailOutlinedIcon />
            </IconButton>
          </EmailShareButton>

          <Box mt={4} mx={1} mb={2}>
            <OutlinedInput
              id="outlined-basic"
              fullWidth
              multiline
              value={
                quote
                  ? text
                  : setUtmParameters(
                      `${url || window.location.href}`,
                      'copied_link',
                      'site_share',
                      'share_buttons',
                    )
              }
              endAdornment={
                <InputAdornment position="end">
                  <ContentCopy
                    titleAccess="Copiar link"
                    sx={{ cursor: 'pointer' }}
                    onClick={handleClick}
                  />
                </InputAdornment>
              }
            />
          </Box>
        </Box>

        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Copiado para a área de transferência"
          action={action}
        />
      </>
    </Modal>
  );
};

export default ShareModal;
