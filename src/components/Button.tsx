/* eslint-disable prettier/prettier */
import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
}
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  borderColor = '#000',
  backgroundColor = '#3e5363',
  textColor = '#FFF',
  ...rest
}) => (
  <ButtonStyled
    borderColor={borderColor}
    backgroundColor={backgroundColor}
    textColor={textColor}
    type="button"
    onClick={onClick}
    {...rest}
  >
    {children}
  </ButtonStyled>
);

const ButtonStyled = styled.button`
  border: solid 2px;
  padding: 30px;
  width: 30rem;
  display: flex;
  font-family: 'Roboto Condensed', sans-serif;
  align-items: center;
  font-weight: bold;
  justify-content: center;
  background-color: ${(p: ButtonProps) => p.backgroundColor};
  border-color: ${(p: ButtonProps) => p.borderColor};
  color: ${(p: ButtonProps) => p.textColor};
  transition: background 0.2s;
  &:hover {
    background-color: ${(p: ButtonProps) =>
    p.hoverBackgroundColor
      ? p.hoverBackgroundColor
      : darken(0.02, p.backgroundColor)};
    color: ${(p: ButtonProps) => p.hoverTextColor ? p.hoverTextColor : p.textColor}
  }
`;

export default Button;
