import { useState } from "react";
import styled, { css } from "styled-components";
import { cancelGame, nextPhase, nextTurn } from "../utils/database";
import Button from "./Button";

const HostOptionsStyles = styled.div`
  position: fixed;
  top: 50%;
  left: 0;
  z-index: 10000;
  --shifted: -100%;
  transform: translate(var(--shifted), -50%);
  padding: ${({ theme }) => theme.spacers.x1}rem;
  ${({ open }) => open && css`--shifted: 0;`}
  background-color: grey;
  transition: transform ${({ theme }) => theme.transition};
  button { 
    display: block;
    margin-bottom: .5rem;
  }
`;

const OpenButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(calc(50% + 1.25rem), -50%) rotate(90deg);
  height: 2.5rem;
  width: max-content;
  padding: 0 3rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: 0;
  border-radius: .5rem .5rem 0 0;
  ${({ theme }) => theme.fontSizes.scale5}
`;

export default function HostOptions({ 
  gameCode,
  gameData,
  errors,
  setErrors
}) {

  const [open, setOpen] = useState(false);

  function toggleOpen() {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  function handleReturnToLobby() {
    cancelGame(gameCode);
  }

  function handleNextTurn() {
    nextTurn(gameCode, gameData);
  }

  return (
    <HostOptionsStyles open={open}>
      <h2>Host Options</h2>
      <Button onClick={handleReturnToLobby}>Return to Lobby</Button>
      <Button onClick={handleNextTurn}>Next Player Turn</Button>
      <Button onClick={() => nextPhase(gameData, gameCode, setErrors, errors, false, true)}>Next Player Phase</Button>
      <OpenButton onClick={toggleOpen}>Host Options</OpenButton>
    </HostOptionsStyles>
  )
}