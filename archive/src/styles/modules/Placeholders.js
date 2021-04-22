import React from 'react';
import styled, { css } from 'styled-components';
import { cardList } from '../../data/cards';

export const CardPHStyles = styled.div`
  flex-shrink: 0;
  ${({ cWidth }) =>
    cWidth &&
    Object.keys(cWidth).map((size) => {
      if (size === 'xs') {
        return css`
          width: ${cWidth[size]};
        `;
      }
      return css`
        @media ${({ theme }) => theme.mq[size]} {
          width: ${cWidth[size]};
        }
      `;
    })}
  ${({ zIndex }) =>
    zIndex &&
    css`
      position: relative;
      z-index: ${zIndex};
    `};
  /* display: inline-block; */
  div {
    padding-top: ${({ rotate }) => (rotate ? '71.4286%' : '140%')};
    background-color: #aaa;
    border: 2px solid #ddd;
    position: relative;
    ${({ theme }) => theme.radius};
    text-align: center;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      /* width: calc(100% - ${({ theme }) => theme.spacers.x1}rem); */
      width: mac(calc(100% - ${({ theme }) => theme.spacers.x1}rem), 1rem);
    }
  }
`;

export function CardPH({ cardNum, text, width, zIndex, rotate }) {
  const card = cardList[cardNum];

  function cText() {
    if (card) {
      return card.name;
    }
    if (text) {
      return text;
    }
    return 'Card PH';
  }

  return (
    <CardPHStyles cWidth={width} zIndex={zIndex} rotate={rotate}>
      <div>
        <span>{cText()}</span>
      </div>
    </CardPHStyles>
  );
}
