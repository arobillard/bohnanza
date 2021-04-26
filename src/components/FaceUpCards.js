import styled from 'styled-components';
import Card from './cards/Card';

const FaceUpCardsStyle = styled.div`
  grid-area: faceUp;
  background-color: ${({ theme }) => theme.colors.secondaryPale};
  ${({ theme }) => theme.radius}
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  display: grid;
  gap: ${({ theme }) => theme.spacers.third}rem;
  grid-template-columns: 1fr 1fr;
  > div {
    display: flex;
    align-items: center;
    &:nth-child(2) {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
    &:last-child {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }
    > div {
      width: 100%;
    }
  }
  .card-ph {
    padding-top: ${({ theme }) => theme.cardRatio.h}
  }
  .section-title {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    /* ${({ theme }) => theme.fontSizes.scale1} */
    font-family: ${({ theme }) => theme.fonts.primary};
    text-transform: uppercase;
    text-shadow: none;
    color: ${({ theme }) => theme.colors.primary};
    opacity: .15;
    text-align: center;
  }
  @media ${({ theme }) => theme.mq.m} {
    grid-template-columns: 1fr 1fr 1fr;
    .section-title {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
    > div {
      &:nth-child(2) {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
      }
      &:last-child {
        grid-column: 3 / 4;
        grid-row: 1 / 2;
      }
    }
  }
  @media ${({ theme }) => theme.mq.ml} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    .section-title {
      grid-column: 1 / -1;
      grid-row: 1 / -1;
    }
    > div {
      &:nth-child(2) {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
      }
      &:last-child {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
      }
    }
  }
  @media ${({ theme }) => theme.mq.l} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    > div {
      &:nth-child(2) {
        grid-column: 1 / -1;
        grid-row: 1 / 2;
      }
      &:last-child {
        grid-column: 1 / -2;
        grid-row: 2 / 3;
      }
    }
  }
  @media ${({ theme }) => theme.mq.xl} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

export default function FaceUpCards({
  gameData,
  gameCode,
  myTurn,
  userData
}) {
  return (
    <FaceUpCardsStyle>
      <h2 className="section-title">Face Up</h2>
      {
        gameData?.faceUp?.length
        ?
        gameData?.faceUp.map((card, i) => (
          <div key={`faceUp-${i}`}>
            <Card
              cardNum={card}
              location='faceUp'
              actionable={myTurn && gameData.turnPhase.phase === 3}
              plantType='faceUp'
              rotate='true'
              gameData={gameData}
              gameCode={gameCode}
              userData={userData}
            />
          </div>
        ))
        :
        <div className="card-ph"></div>
      }
    </FaceUpCardsStyle>
  );
}
