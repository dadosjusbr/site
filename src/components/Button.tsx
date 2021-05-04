/* eslint-disable prettier/prettier */
import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

// The Button is the partial of the only stylized button within the application
// The use of it consists only of modifying the background or border colors
// It receives a children that can be from a text to a div containing a text and an icon
// As it extends the ButtonHTMLAttributes<HTMLButtonElement> it will have all the properties of a common button.

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  borderColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
}
// The component pattern used here uses the arrow function in a react.FC constant implementing a ButtonProps generic
// To avoid default conflict conflicts in eslint.
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  borderColor = '#000',
  backgroundColor = '#3e5363',
  ...rest
}) => (
  <ButtonStyled
    borderColor={borderColor}
    backgroundColor={backgroundColor}
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
  color: #FFF;
  transition: background 0.2s;
  &:hover {
    background-color: ${(p: ButtonProps) =>
    p.hoverBackgroundColor
      ? p.hoverBackgroundColor
      : darken(0.02, p.backgroundColor)};
    color: ${(p: ButtonProps) => p.hoverTextColor ? p.hoverTextColor : '#FFF'}
  }
`;

export default Button;
