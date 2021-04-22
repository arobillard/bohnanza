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
  border: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const LabelStyles = styled.label`
  ${({ labelHide }) => labelHide && css`
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `}
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
  labelText,
  labelHide
}) {
  return (
    <>
      {labelText && <LabelStyles labelHide={labelHide} htmlFor={name}>{labelText}</LabelStyles>}
      <InputStyles
        type={type || 'text'}
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        padding={padding}
      />
    </>
  );
}
