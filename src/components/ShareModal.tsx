import React from 'react';
import {
  EmailShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton,
  EmailIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookIcon,
} from 'react-share';
import Modal from 'react-modal';
import styled from 'styled-components';
// import { Container } from './styles';
interface ShareModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onRequestClose }) => {
  const a = 0;
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={() => {
        console.log('abriu');
      }}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '40rem',
          height: '20rem',
          marginRight: '-50%',
          borderRadius: '0',
          backgroundColor: '#CED9E1',
          transform: 'translate(-50%, -50%)',
        },
      }}
      contentLabel="Example Modal"
    >
      <ModalDiv>
        <span>
          <h2>Compartilhar</h2>
          <img src="/img/icon_share.svg" alt="share" />
        </span>
        <div>
          <EmailShareButton url={window.location.href}>
            <EmailIcon />
          </EmailShareButton>
          <TwitterShareButton url={window.location.href}>
            <TwitterIcon />
          </TwitterShareButton>
          <WhatsappShareButton url={window.location.href}>
            <WhatsappIcon />
          </WhatsappShareButton>
          <FacebookShareButton url={window.location.href}>
            <FacebookIcon />
          </FacebookShareButton>
        </div>
      </ModalDiv>
    </Modal>
  );
};

export default ShareModal;
const ModalDiv = styled.div`
  width: 100%;
  color: #3e5363;
  span {
    font-size: 3rem;
    display: flex;
    position: relative;
    justify-content: center;
    img {
      position: absolute;
      left: 120%;
      bottom: 0%;
    }
  }
  div {
    width: 80%;
    justify-content: space-between;
    margin-top: 3rem;
    display: flex;
  }
  align-items: center;
  justify-content: center;
  font-family: 'Roboto Condensed', sans-serif;
  display: flex;
  flex-direction: column;
`;
