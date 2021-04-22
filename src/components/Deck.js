import { useEffect, useState } from "react";
import styled, { css } from "styled-components"
import { nextPhase, progressPhase, turnUpCards } from "../utils/database";
import { drawCard } from "../utils/users";

const DeckStyles = styled.div`
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 999;
  --shifted: 100%;
  transform: translate(var(--shifted), -50%);
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  width: 15rem;
  ${({ open }) => open && css`--shifted: 0;`}
  background-color: ${({ theme }) => theme.colors.secondary};
  transition: transform ${({ theme }) => theme.transition};
  border-radius: 1rem 0 0 1rem;
`;

const OpenButton = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(calc(-50% - 1.25rem), -50%) rotate(-90deg);
  height: 2.5rem;
  white-space: nowrap;
  padding: 0 3rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: 0;
  border-radius: .5rem .5rem 0 0;
  ${({ theme }) => theme.fontSizes.scale5}
`;

const DeckButton = styled.button`
  padding-top: ${({ theme }) => theme.cardRatio.h};
  position: relative;
  width: 100%;
  display: inline-block;
  ${({ theme }) => theme.radius}
  background-color: #fff;
  border: 3px solid ${({ theme }) => theme.colors.secondary};
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h3, p {
      margin: 0;
    }
  }
  ${({ discardPile }) => discardPile && css`
    margin-top: ${({ theme }) => theme.spacers.twoThirds}rem;
    border: 3px solid ${({ theme }) => theme.colors.secondaryPale};
    div {
      opacity: .333;
    }
  `}
`;

export default function Deck({
  gameData,
  gameCode,
  userData,
  myTurn,
  errors,
  setErrors
}) {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    
    if (gameData.turnPhase.phase2.turned && gameData.turnPhase.phase === 2) {
      setOpen(false);
    } else if (gameData.turnPhase.phase === 2 || gameData.turnPhase.phase === 4) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [gameData.turnPhase])

  function toggleOpen() {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  function handleDraw() {
    if (myTurn && gameData.turnPhase.phase === 4) {
      progressPhase(gameCode, gameData, 'p4Draw');
      drawCard(userData, gameData, gameCode);
      if (gameData.turnPhase.phase4.drawn === 2) {
        nextPhase(gameData, gameCode, setErrors, errors);
      }
    } else if (myTurn && gameData.turnPhase.phase === 2 && !gameData.turnPhase.phase2.turned) {
      turnUpCards(gameCode, gameData);
      progressPhase(gameCode, gameData, 'turnUp');
    }
  }

  return (
    <DeckStyles open={open}>
      <OpenButton onClick={toggleOpen}>
        View Deck
      </OpenButton>
      <DeckButton onClick={handleDraw}>
        <div>
          <h3>Draw</h3>
          <p>{gameData?.deck.length}</p>
        </div>
      </DeckButton>
      <DeckButton discardPile>
        <div>
          <h3>Discard</h3>
          <p>{gameData?.discardPile.length}</p>
        </div>
      </DeckButton>
    </DeckStyles>
  )
}