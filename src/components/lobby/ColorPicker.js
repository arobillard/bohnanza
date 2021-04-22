import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { applyUserColor } from '../../styles/Theme';

const ColorPickerStyles = styled.div`
  --cols: 4;
  display: grid;
  row-gap: ${({ theme }) => theme.spacers.half}rem;
  grid-template-columns: repeat(var(--cols), 1fr);
  padding: ${({ theme }) => theme.spacers.half}rem;
  margin-bottom: ${({ theme }) => theme.spacers.x1}rem;
  ${({ theme }) => theme.radius}
  background-color: #fff;
  @media ${({ theme }) => theme.mq.m} {
    --cols: 8;
  }
`;

export const ColorItem = styled.div`
  display: flex;
  justify-content: center;
  input {
    position: absolute;
    left: -200vw;
    &:checked + label {
      transform: scale(1.2);
      box-shadow: 0 0 10px #0004;
      opacity: 1;
    }
  }
  label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ size }) => size ? `${size * .5}rem` : '2rem'};
    color: #fff;
    cursor: pointer;
    width: ${({ size }) => size ? `${size}rem` : '2rem'};
    height: ${({ size }) => size ? `${size}rem` : '2rem'};
    ${({ color }) => applyUserColor(color)}
    border-radius: 50%;
    opacity: .5;
    transition:
      opacity ${({ theme }) => theme.transition},
      transform ${({ theme }) => theme.transition},
      box-shadow ${({ theme }) => theme.transition};
    &:hover {
      transform: scale(1.3);
      box-shadow: 0 0 5px #0004;
    }
  }
`;

const FakeColorPH = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #ccc;
  justify-self: center;
`;

export default function ColorPicker({ users }) {
  const [claimedColors, setClaimedColors] = useState([]);
  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'pink',
    'turquoise',
  ];

  useEffect(() => {
    const updatedClaimedColors = [];
    users &&
      users.forEach((user) => {
        if (user.bohnanza.color) {
          updatedClaimedColors.push(user.bohnanza.color);
        }
      });
    setClaimedColors(updatedClaimedColors);
  }, [users]);

  return (
    <ColorPickerStyles>
      {colors.filter(color => !claimedColors.includes(color)).map((color, i) => (
        <ColorItem
          key={`color-picker-${color}`}
          color={color}
        >
          <input
            type="radio"
            name="colorPicker"
            id={color}
            value={color}
            defaultChecked={i === 0}
          />
          <label htmlFor={color}>
            <span className="screen-reader-text">{color}</span>
          </label>
        </ColorItem>
      ))}
      {claimedColors.map((_, i) => (
        <FakeColorPH key={`claimed-color-${i}`} />
      ))}
    </ColorPickerStyles>
  );
}
