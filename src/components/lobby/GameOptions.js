import { useState } from 'react';
import styled from 'styled-components';
import RadioGroup from '../forms/RadioGroup';

const GameOptionsStyles = styled.div`
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  margin-bottom: ${({ theme }) => theme.spacers.x1}rem;
  background-color: ${({ theme }) => theme.colors.secondaryPale};
  ${({ theme }) => theme.radius}
  box-shadow: ${({ theme }) => theme.shadow};
  h2 {
    ${({ theme }) => theme.fontSizes.scale4}
  }
`;

export default function GameOptions({
  gameData
}) {

  const [gameOptions, setGameOptions] = useState({
    winCondition: 'deck',
    deckCount: 1,
    winPoints: 10,
    cards: {
      0: true,
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
      10: true,
    },
    fields: {
      thirdActive: false,
      thirdCanBuy: true,
      thirdCost: 3
    },
    drawCount: 3
  })

  function updateWinCondition(value) {
    const updatedGameOptions = {...gameOptions};
    updatedGameOptions.winCondition = value;
    setGameOptions(updatedGameOptions);
  }

  return (
    <GameOptionsStyles>
      <h2>Game Options</h2>
      <RadioGroup
        label="Win Condition:"
        name="win-condition"
        update={updateWinCondition}
        active={gameOptions.winCondition}
        options={[
          {
            name: 'deck',
            label: 'Deck Count'
          },
          {
            name: 'score',
            label: 'Score'
          }
        ]}
      />

    </GameOptionsStyles>
  )
}