import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CardPHStyles } from '../../../styles/modules/Placeholders';
import { UserTitle } from '../../../styles/Typography';
import { randomTilt } from '../../../utils/helpers';

const UserScoreStyles = styled.div`
  grid-area: userScore;
  align-self: stretch;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
`;

const ScoreStackStyles = styled.div`
  position: relative;
  width: min(10rem, 100%);
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  .embeder {
    padding-top: 140%;
  }
`;

const StackedCardPH = styled(CardPHStyles)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${({ tilt }) => tilt});
  width: 85%;
`;

const ScoreStack = ({ coinCards }) => (
  <ScoreStackStyles>
    <div className="embeder">
      {coinCards.map((card, i) => (
        <StackedCardPH key={`user-score-card-${i + 1}`} tilt={randomTilt(15)}>
          <div>
            <span>{i + 1}</span>
          </div>
        </StackedCardPH>
      ))}
    </div>
  </ScoreStackStyles>
);

export default function UserScore({ score, coinCards }) {
  return (
    <UserScoreStyles>
      {/* <UserTitle>Score</UserTitle> */}
      {coinCards.length ? (
        <ScoreStack coinCards={coinCards} />
      ) : (
        <p>they don't got score</p>
      )}
    </UserScoreStyles>
  );
}
