import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../../styles/modules/Layout";
import { bpScales, breakpointGenerateScales } from "../../styles/Typography";
import { startGame } from "../../utils/database";
import { watchUsersInGame } from "../../utils/users";
import Button from "../Button";
import GameOptions from "./GameOptions";
import UserJoin from "./UserJoin";
import UsersWaiting from "./UsersWaiting";

const GameInfo = styled.div`
  h2 {
    span {
      ${({ theme }) => theme.fontSizes.scale4}
      display: block;
    }
    strong {
      color: ${({ theme }) => theme.colors.primary};
      font-size: ${breakpointGenerateScales(bpScales, 5)}
    }
  }
`;

export default function Lobby({
  gameCode,
  gameData,
  user,
  setUser,
  users,
  setUsers,
  setErrors,
  errors,
  savedUser
}) {

  const [username, setUsername] = useState(user?.userName || '');

  useEffect(() => {
    watchUsersInGame(gameCode, setUsers);
    // return () => {
    //   stopWatchingUsersInGame(gameCode);
    // }
  }, [gameCode, setUsers])

  function handleStart() {
    startGame(gameCode, users);
  }

  return (
    <Container
      grid
      gap={{ col: 'x2', row: 'x1' }}
      cols={{ 'xs': 1, 'ml': 2}}
      vAlign="center"
      padding={{
        top: '3rem',
        bottom: '3rem',
      }}
    >
      <GameInfo>
        <h2>
          <span>Game Code:</span>
          <strong>{gameCode}</strong>
        </h2>
        {
          gameData?.host === user?.id
          &&
          <>
            {/* <GameOptions
              gameData={gameData}
            /> */}
            <Button onClick={handleStart}>Start Game</Button>
          </>
        }
      </GameInfo>
      {
        user?.gameCode === gameCode
        &&
        gameData?.users.includes(user.id)
        ?
        <UsersWaiting
          gameCode={gameCode}
          gameData={gameData}
          user={user}
          setUser={setUser}
          users={users}
        />
        :
        <UserJoin
          gameCode={gameCode}
          gameData={gameData}
          setUser={setUser}
          username={username}
          setUsername={setUsername}
          users={users}
          errors={errors}
          setErrors={setErrors}
          savedUser={savedUser}
        />
      }
    </Container>
  )
}