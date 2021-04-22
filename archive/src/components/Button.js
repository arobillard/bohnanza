import React from 'react';
import styled, { css } from 'styled-components';

const ButtonStyles = styled.button`
  display: inline-block;
  font-size: inherit;
  font-family: inherit;
  text-align: center;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
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
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
  ${({ cancel }) =>
    cancel &&
    css`
      background-color: #999;
      border-color: #999;
      &:hover,
      &:focus {
        background-color: #666;
        border-color: #666;
      }
    `}
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
}) {
  return (
    <ButtonStyles
      as={as}
      fullWidth={fullWidth}
      cancel={cancel}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonStyles>
  );
}
