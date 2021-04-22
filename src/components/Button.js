import React from 'react';
import styled, { css } from 'styled-components';
import { applyUserColor } from '../styles/Theme';

const ButtonStyles = styled.button`
  display: inline-block;
  font-size: inherit;
  font-family: inherit;
  text-align: center;
  background-color: ${({ theme, color }) => theme.colors[color]};
  border: 2px solid ${({ theme, color }) => theme.colors[color]};
  ${({ theme, color }) => {
    if (color === 'secondary') {
      return css`
        color: #000;;
      `;
    } else {
      return css`
        color: #fff;
      `;
    }
  }};
  ${({ theme }) => theme.radius};
  padding: ${({ theme }) => theme.spacers.third}rem
    ${({ theme }) => theme.spacers.x1}rem;
  cursor: pointer;
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  transition: background-color ${({ theme }) => theme.transition},
    border-color ${({ theme }) => theme.transition},
    color ${({ theme }) => theme.transition},
    box-shadow ${({ theme }) => theme.transition};
  &:hover,
  &:focus {
    background-color: ${({ theme, color }) => theme.colors[`${color}Dark`]};
    border-color: ${({ theme, color }) => theme.colors[`${color}Dark`]};
  }
  ${({ cancel }) =>
    cancel &&
    css`
      background-color: transparent;
      border-color: transparent;
      color: ${({ theme }) => theme.colors.primary};
      &:hover,
      &:focus {
        background-color: transparent;
        border-color: transparent;
        color: ${({ theme }) => theme.colors.primary};
      }
    `}
  ${({ textColor }) => {
    if (textColor) {
      return css`
        ${({ textColor }) => applyUserColor(textColor, 'color')}
        &:hover,
        &:focus {
          ${({ textColor }) => applyUserColor(textColor, 'color')}
        }
      `;
    }
  }};
  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export default function Button({
  children,
  as,
  fullWidth,
  cancel,
  onClick,
  disabled,
  color,
  type,
  padding,
  textColor
}) {
  return (
    <ButtonStyles
      as={as}
      fullWidth={fullWidth}
      cancel={cancel}
      onClick={onClick}
      disabled={disabled}
      color={color || 'primary'}
      type={type}
      padding={padding}
      textColor={textColor}
    >
      {children}
    </ButtonStyles>
  );
}
