import { useEffect, useState } from "react";
import styled, { css } from "styled-components"
import { nextPhase, progressPhase, reshuffleDeck, turnUpCards } from "../../utils/database";
import { drawCard } from "../../utils/users";
import CardBack from "./CardBack";
import Card from "./Card";

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
  /* padding-top: ${({ theme }) => theme.cardRatio.h}; */
  position: relative;
  width: 100%;
  display: inline-block;
  ${({ theme }) => theme.radius}
  border: 0;
  padding: 0;
  background-color: transparent;
  .draw-info {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    padding: ${({ theme }) => theme.spacers.twoThirds}rem ${({ theme }) => theme.spacers.half}rem ${({ theme }) => theme.spacers.twoThirds}rem ${({ theme }) => theme.spacers.third}rem;
    /* padding: ${({ theme }) => theme.spacers.twoThirds}rem ${({ theme }) => theme.spacers.twoThirds}rem ${({ theme }) => theme.spacers.third}rem; */
    border-radius: 0 50% 50% 0;
  }
  ${({ discardPile }) => discardPile && css`
    margin-top: ${({ theme }) => theme.spacers.twoThirds}rem;
    border: 3px solid ${({ theme }) => theme.colors.secondaryPale};
    div {
      opacity: .333;
    }
  `}
`;

const EmptyDiscard = styled.div`
  padding-top: ${({ theme }) => theme.cardRatio.h};
  ${({ theme }) => theme.radius}
  background-color: #fff5;
  position: relative;
  p {
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary}77;
  }
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
  const [discardCard, setDiscardCard] = useState(null);

  useEffect(() => {
    
    if (gameData.turnPhase.phase2.turned && gameData.turnPhase.phase === 2) {
      setOpen(false);
    } else if (gameData.turnPhase.phase === 2 && myTurn) {
      setOpen(true);
    } else if (gameData.turnPhase.phase === 4 && myTurn) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [gameData.turnPhase, myTurn])

  useEffect(() => {
    setDiscardCard(gameData?.discardPile.reverse()[0]);
  }, [gameData.discardPile])

  function toggleOpen() {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  async function handleDraw() {
    if (myTurn && gameData.turnPhase.phase === 4) {
      if (gameData.deck.length > 0) {
        progressPhase(gameCode, gameData, 'p4Draw');
        drawCard(userData, gameData, gameCode);
        if (gameData.turnPhase.phase4.drawn === 2) {
          nextPhase(gameData, gameCode, setErrors, errors);
        }
      } else {
        const updatedErrors = [
          ...errors,
          {
            type: 'warning',
            msg: 'Reshuffling deck!'
          }
        ]
        setErrors(updatedErrors);
      }
    } else if (myTurn && gameData.turnPhase.phase === 2 && !gameData.turnPhase.phase2.turned) {
      if (gameData.deck.length > 1) {
        turnUpCards(gameCode, gameData);
        progressPhase(gameCode, gameData, 'turnUp');
      } else {
        const updatedErrors = [
          ...errors,
          {
            type: 'warning',
            msg: 'Reshuffling deck!'
          }
        ]
        setErrors(updatedErrors);
        await reshuffleDeck(gameCode, gameData.deck, gameData.discardPile);
        // turnUpCards(gameCode, gameData);
        // progressPhase(gameCode, gameData, 'turnUp');
      }
    }
  }

  return (
    <DeckStyles open={open}>
      <OpenButton onClick={toggleOpen}>
        View Deck
      </OpenButton>
      {/* <DeckButton onClick={handleDraw}>
        <div>
          <h3>Draw</h3>
          <p>{gameData?.deck.length}</p>
        </div>
      </DeckButton> */}
      <DeckButton onClick={handleDraw}>
        <CardBack
          rotate="true"
        />
        <div className="draw-info">
          {gameData?.deck.length}
        </div>
      </DeckButton>
      {
        discardCard
        ?
        <Card
          cardNum={discardCard}
          location="discardPile"
          rotate="true"
        />
        :
        <EmptyDiscard>
          <p>Discard Pile</p>
        </EmptyDiscard>
      }
      {/* <DeckButton discardPile>
        <div>
          <h3>Discard</h3>
          <p>{gameData?.discardPile.length}</p>
        </div>
      </DeckButton> */}
    </DeckStyles>
  )
}