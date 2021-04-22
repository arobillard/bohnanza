import React from 'react';
import styled from 'styled-components';
import { CardPH } from '../../styles/modules/Placeholders';

const FaceUpCardsStyle = styled.div`
  grid-area: faceUp;
  background-color: #ccc;
  ${({ theme }) => theme.radius}
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  display: grid;
  gap: ${({ theme }) => theme.spacers.third}rem;
  grid-template-columns: 1fr 1fr;
  @media ${({ theme }) => theme.mq.m} {
    grid-template-columns: 1fr;
  }
  @media ${({ theme }) => theme.mq.l} {
    grid-template-columns: 1fr 1fr;
  }
  @media ${({ theme }) => theme.mq.xl} {
    grid-template-columns: 1fr;
  }
  > div {
    display: flex;
    align-items: center;
    > div {
      width: 100%;
    }
  }
`;

export default function FaceUpCards({ faceUp }) {
  return (
    <FaceUpCardsStyle>
      {faceUp.length > 0 &&
        faceUp.map((card, i) => (
          <div>
            <CardPH key={`faceUp-${i}`} cardNum={card} rotate />
          </div>
        ))}
    </FaceUpCardsStyle>
  );
}
