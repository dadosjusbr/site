import React from 'react';
import {
  EmailShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton,
} from 'react-share';

import { Box, IconButton, Typography, Modal } from '@mui/material';
import WhatsappOutlinedIcon from '@mui/icons-material/WhatsappOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

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
  const a = 0;
  return (
    <Modal open={isOpen} onClose={onRequestClose} aria-labelledby="modal-title">
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
        <WhatsappShareButton url={url || window.location.href}>
          <IconButton aria-label="whatsapp" size="large">
            <WhatsappOutlinedIcon />
          </IconButton>
        </WhatsappShareButton>
        <TwitterShareButton url={url || window.location.href}>
          <IconButton aria-label="twitter" size="large">
            <TwitterIcon />
          </IconButton>
        </TwitterShareButton>
        <FacebookShareButton url={url || window.location.href}>
          <IconButton aria-label="facebook" size="large">
            <FacebookOutlinedIcon />
          </IconButton>
        </FacebookShareButton>
        <EmailShareButton url={url || window.location.href}>
          <IconButton aria-label="email" size="large">
            <EmailOutlinedIcon />
          </IconButton>
        </EmailShareButton>
      </Box>
    </Modal>
  );
};

export default ShareModal;
