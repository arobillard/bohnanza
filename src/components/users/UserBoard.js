import styled from "styled-components";
import { harvest } from "../../utils/users";
import UserFields from "./UserFields";
import UserHand from "./UserHand";
import UserPhaseControls from "./UserPhaseControls";
import UserPot from "./UserPot";

const UserBoardStyle = styled.div`
  grid-area: user;
  background-color: ${({ theme }) => theme.colors.secondaryPale};
  border: 3px solid ${({ borderColor, theme }) => {
    if (borderColor === 'yellow') {
        return theme.colors.secondary;
      } else if (borderColor === 'red') {
        return theme.colors.primary;
      }
      return theme.colors[borderColor];
  }};
  ${({ theme }) => theme.radius}
  padding: ${({ theme }) => theme.spacers.half}rem;
  gap: ${({ theme }) => theme.spacers.x1}rem;
  width: 100%;
  display: grid;
  column-gap: ${({ theme }) => theme.spacers.half}rem;
  /* align-items: flex-start; */
  grid-template-columns: 1fr;
  grid-template-areas:
    'userFields'
    'userHand'
    'userPot'
    'userPhase';
  @media ${({ theme }) => theme.mq.m} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'userFields userFields userFields'
      'userHand userHand userHand'
      'userPot userPot userPhase';
  }
`;

export default function UserBoard({
  userData,
  gameData,
  gameCode,
  myTurn,
  setErrors,
  errors,
  users
}) {

  function handleHarvest(cardNum, numCards, fieldNum) {
    harvest(userData, cardNum, numCards, fieldNum, gameCode, gameData)
  }

  return (
    <UserBoardStyle borderColor={myTurn ? userData.bohnanza.color : 'secondaryPale'}>
      {
        userData ? (
          <>
            <UserFields
              userData={userData}
              myTurn={myTurn}
              setErrors={setErrors}
              errors={errors}
              inUserBoard={true}
              handleHarvest={handleHarvest}
            />
            <UserHand
              userData={userData}
              myTurn={myTurn}
              setErrors={setErrors}
              gameData={gameData}
              gameCode={gameCode}
            />
            <UserPot
              userData={userData}
              gameData={gameData}
              gameCode={gameCode}
            />
            <UserPhaseControls
              gameData={gameData}
              gameCode={gameCode}
              setErrors={setErrors}
              errors={errors}
              myTurn={myTurn}
              userData={userData}
              users={users}
            />
          </>
        ) : (
          <p style={{ gridColumn: '1 / -1' }}>
            Sorry, unable to load data!
          </p>
        )
      }
    </UserBoardStyle>
  )
}