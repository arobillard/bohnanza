import { useEffect, useState } from "react";
import styled, { css } from "styled-components"

const ErrorStyles = styled.ol`
  position: absolute;
  top: ${({ theme }) => theme.spacers.half}rem;
  left: 50%;
  transform: translateX(-50%);
  width: min(35rem, 100%);
  list-style-type: none;
  padding: 0;
  margin: 0;
  z-index: 1000000000;
`;

const ErrorItemStyles = styled.li`
  margin-bottom: ${({ theme }) => theme.spacers.half}rem;
  text-align: center;
  padding: ${({ theme }) => theme.spacers.third}rem;
  position: relative;
  cursor: pointer;
  ${({ theme }) => theme.fontSizes.scale5}
  box-shadow: ${({ theme }) => theme.shadow};
  transition: opacity 1s;
  ${({ type }) => {
    if (type === 'warning') {
      return css`
        background-color: ${({ theme }) => theme.colors.secondary};
      `;
    } else if (type === 'error') {
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: #fff;
      `;
    } else if (type === 'success') {
      return css`
        background-color: ${({ theme }) => theme.colors.green};
        color: #fff;
      `;
    }
  }}
  ${({ out }) => out && css`
    opacity: 0;
  `}
  button {
    background-color: transparent;
    border: 0;
    color: #fff;
    position: absolute;
    right: ${({ theme }) => theme.spacers.half}rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

function ErrorItem({ err, clearError, index }) {

  const [out, setOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setOut(true), 3000);
  }, [])

  useEffect(() => {
    if (out) {
      setTimeout(() => clearError(index), 1000);
    }
  }, [out, index, clearError])

  return (
    <ErrorItemStyles
      onClick={() => clearError(index)}
      type={err.type}
      out={out}
    >
      {err.msg}
      <button className="material-icons">close</button>
    </ErrorItemStyles>
  )
}

export default function Errors({ errors, setErrors }) {

  function clearError(i) {
    const currentErrors = [...errors];
    const updatedErrors = [
      ...currentErrors.slice(0, i),
      ...currentErrors.slice(i + 1, currentErrors.length)
    ]
    setErrors(updatedErrors);
  }
  
  if (errors.length) {
    return (
      <ErrorStyles>
        {errors.map((err, i) => (
          <ErrorItem
            key={`error-message-${i}`}
            index={i}
            clearError={clearError}
            err={err}
          />
        ))}
      </ErrorStyles>
    )
  }
  return null;
}