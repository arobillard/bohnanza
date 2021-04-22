import React from 'react';
import styled, { css } from 'styled-components';

const InputStyles = styled.input`
  ${({ theme }) => theme.radius};
  padding: ${({ padding }) =>
    padding ||
    css`
      ${({ theme }) => theme.spacers.half}rem
    `};
  font-size: 1rem;
  width: 100%;
`;

export default function Input({
  type,
  name,
  required,
  placeholder,
  defaultValue,
  value,
  onChange,
  padding,
}) {
  return (
    <InputStyles
      type={type || 'text'}
      name={name}
      required={required}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      padding={padding}
    />
  );
}
