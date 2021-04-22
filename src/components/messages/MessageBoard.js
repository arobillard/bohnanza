import styled from "styled-components"
import MessageBar from "./MessageBar";
import MessageDisplay from "./MessageDisplay";

const MessageBoardStyles = styled.div`
  grid-area: message;
  background-color: ${({ theme }) => theme.colors.secondaryPale};
  ${({ theme }) => theme.radius}
  /* padding: ${({ theme }) => theme.spacers.twoThirds}rem; */
  z-index: 200;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr auto;
  /* gap: ${({ theme }) => theme.spacers.twoThirds}rem; */
  .type-bar {
    padding: ${({ theme }) => theme.spacers.half}rem;
    background-color: #eee;
    ${({ theme }) => theme.radius};
  }
`;

export default function MessageBoard({
  gameData,
  gameCode,
  userData,
  users,
  errors,
  setErrors,
  setTradeBoardVisible,
  trades
}) {
  return (
    <MessageBoardStyles>
      <MessageDisplay
        gameData={gameData}
        gameCode={gameCode}
        userData={userData}
        users={users}
        errors={errors}
        setErrors={setErrors}
        trades={trades}
      />
      <MessageBar
        gameData={gameData}
        gameCode={gameCode}
        userData={userData}
        users={users}
        errors={errors}
        setErrors={setErrors}
        setTradeBoardVisible={setTradeBoardVisible}
      />
    </MessageBoardStyles>
  )
}