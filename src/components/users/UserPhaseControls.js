import styled, { css } from "styled-components";
import { applyUserColor } from "../../styles/Theme";
import { UserTitle } from "../../styles/Typography";
import { nextPhase } from "../../utils/database";
import Button from "../Button";

const UPCStyles = styled.div`
  grid-area: userPhase;
  display: flex;
  flex-direction: column;
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

  function handleNextPhase() {

    let allPlanted = false;
    if (gameData.turnPhase.phase === 3) {
      let theresAPot = false;

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.bohnanza.pot.length) {
          theresAPot = true;
          break;
        }
      }

      if (!theresAPot) {
        allPlanted = true;
      }

    }

    nextPhase(gameData, gameCode, setErrors, errors, allPlanted)
  }

  return (
    <UPCStyles color={userData.bohnanza.color}>
      <UserTitle>Phase {turnPhase.phase} - {turnPhase[`phase${turnPhase.phase}`].title}</UserTitle>
      <SmallText>
        {turnPhase[`phase${turnPhase.phase}`].desc}
      </SmallText>
      {myTurn && <Button color="secondary" fullWidth onClick={handleNextPhase}>Next Phase</Button>}
    </UPCStyles>
  )
  
}