import { useState } from "react";
import styled, { css } from "styled-components";
import { applyUserColor } from "../../styles/Theme";
import { UserTitle } from "../../styles/Typography";
import { nextPhase } from "../../utils/database";
import Button from "../Button";

const UPCStyles = styled.div`
  grid-area: userPhase;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  ${({ color }) => applyUserColor(color)}
  ${({ color }) => {
    applyUserColor(color);
    if (color !== 'yellow') {
      return css`
        color: #fff;
      `;
    }
  }}
  ${({ theme }) => theme.radius}
  padding: ${({ theme }) => theme.spacers.half}rem;
  h2 {
    margin-bottom: ${({ theme }) => theme.spacers.third}rem;
    ${({ color }) => {
    if (color !== 'yellow') {
      return css`
        color: #fff;
      `;
    }
  }}
  }
  p {
    flex-grow: 1;
  }
`;

const SmallText = styled.p`
  ${({ theme }) => theme.fontSizes.small}
  margin-bottom: ${({ theme }) => theme.spacers.third}rem;
`;

const TradeWarning = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${({ color }) => applyUserColor(color)}
  ${({ color }) => {
    applyUserColor(color);
    if (color !== 'yellow') {
      return css`
        color: #fff;
      `;
    }
  }}
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacers.x1}rem;
  strong {
    ${({ theme }) => theme.fontSizes.scale5}
    text-transform: uppercase;
  }
  p {
    margin: 0;
  }
`;

export default function UserPhaseControls({
  gameCode,
  gameData,
  errors,
  setErrors,
  myTurn,
  userData,
  users
}) {

  const turnPhase = gameData.turnPhase;

  const [tradesEnd, setTradesEnd] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  function handleNextPhase() {
    
    let allPlanted = false;
    const usersWithPot = [];
    let customErr = null;

    if (gameData.turnPhase.phase === 3) {

      users.forEach(user => {
        if (user.bohnanza.pot.length) {
          usersWithPot.push(user.name);
        }
      })

      if (usersWithPot.length) {
        customErr = `Players who still need to plant: ${usersWithPot.join(', ')}`;
      } else if (gameData.faceUp.length) {
        customErr = `${gameData.turn === userData.userId ? 'You' : users.filter(u => u.userId === gameData.turn)[0].name} must plant face up cards!`;
      }
      
      if (!usersWithPot.length && !gameData.faceUp.length) {
        allPlanted = true;
      }

    }

    if (!tradesEnd && gameData.turnPhase.phase === 2) {
      setTradesEnd(true);
      setShowWarning(true);
      // setTimeout(setShowWarning(false), 1500);
      return;
    }

    nextPhase(gameData, gameCode, setErrors, errors, allPlanted, false, userData.bohnanza.hand, customErr);
    setTradesEnd(false);
  }

  function autoHideWarning() {
    setTimeout(() => setShowWarning(false), 1500);
  }

  return (
    <UPCStyles color={userData.bohnanza.color}>
      <UserTitle>Phase {turnPhase.phase} - {turnPhase[`phase${turnPhase.phase}`].title}</UserTitle>
      <SmallText>
        {turnPhase[`phase${turnPhase.phase}`].desc}
      </SmallText>
      {myTurn &&
        <Button
          color={userData.bohnanza.color === 'yellow' ? 'primary' : 'secondary' }
          fullWidth
          onClick={handleNextPhase}
        >
          Next Phase
        </Button>
      }
      {showWarning
        &&
        <TradeWarning
          color={userData.bohnanza.color}
          onClick={autoHideWarning()}
        >
          <div>
            <strong>Warning</strong>
            <p>You can only trade is phase 2!</p>
          </div>
        </TradeWarning>
      }
    </UPCStyles>
  )
  
}