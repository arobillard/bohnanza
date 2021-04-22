import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const ColorPickerStyles = styled.div`
  --cols: 4;
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  @media ${({ theme }) => theme.mq.m} {
    --cols: 8;
  }
`;

const ColorItem = styled.div`
  input {
    position: absolute;
    left: -200vw;
    &:checked + label {
      transform: scale(1.2);
      box-shadow: 0 0 10px #0004;
    }
  }
  label {
    display: inline-block;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    background-color: ${({ color }) => color};
    border-radius: 50%;
    transition: transform ${({ theme }) => theme.transition},
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
        if (user.color) {
          updatedClaimedColors.push(user.color);
        }
      });
    setClaimedColors(updatedClaimedColors);
  }, [users]);

  return (
    <ColorPickerStyles>
      {colors.map((color, i) => {
        if (!claimedColors.includes(color)) {
          return (
            <ColorItem key={`color-picker-${color}`} color={color}>
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
          );
        }
      })}
      {claimedColors.map((_, i) => (
        <FakeColorPH key={`claimed-color-${i}`} />
      ))}
    </ColorPickerStyles>
  );
}
