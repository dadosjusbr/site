import styled from 'styled-components';

const Player = styled.iframe<{ $lgWidth?: number }>`
  width: 100%;
  aspect-ratio: 16/9;
  border: none;
  border-radius: 8px;
  @media (min-width: 900px) {
    width: ${props => props.$lgWidth}px;
    height: (9/16) * ${props => props.$lgWidth}px;
  }
`;

export default Player;
