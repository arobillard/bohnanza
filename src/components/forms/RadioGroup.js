import React from 'react';
import styled from 'styled-components';

const RadioGroupStyles = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0;
    font-weight: bold;
  }
  label {
    margin-left: ${({ theme }) => theme.spacers.twoThirds}rem;
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr;
    gap: ${({ theme }) => theme.spacers.third}rem;
    .visual-radio {
      width: ${({ theme }) => theme.spacers.threeQuarters}rem;
      height: ${({ theme }) => theme.spacers.threeQuarters}rem;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.secondaryPale};
      border: 2px solid ${({ theme }) => theme.colors.primary};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      &::before {
        content: ' ';
        width: 70%;
        height: 70%;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.primary};
        display: inline-block;
        opacity: 0;
        transition:
          opacity ${({ theme }) => theme.transition};
      }
    }
  }
  input:checked + label {
    .visual-radio {
      &::before {
        opacity: 1;
      }
    }
  }
`;

export default function RadioGroup({
  label,
  name,
  options,
  active,
  update
}) {

  function handleChange(e, value) {
    e.preventDefault();
    update(value);
  }
  console.log(active); 
  return (
    <RadioGroupStyles>
      <p>{label}</p>
      {options.map((opt, i) => (
        <React.Fragment key={`${opt.name}-${i}`}>
          <input
            type="radio"
            name={name}
            id={opt.name}
            className="screen-reader-text"
            defaultChecked={active === opt.name}
            onClick={(e) => handleChange(e, opt.name)}
          />
          <label htmlFor={opt.name}>
            <span className="visual-radio"></span>
            <span className="visual-label">{opt.label}</span>
          </label>
        </React.Fragment>
      ))}
    </RadioGroupStyles>
  )
}