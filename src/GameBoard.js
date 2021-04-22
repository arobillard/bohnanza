import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Deck from "./components/Deck";
import FaceUpCards from "./components/FaceUpCards";
import GameBoardGrid from "./components/GameBoardGrid";
import HostOptions from "./components/HostOptions";
import Lobby from "./components/lobby/Lobby";
import MessageBoard from "./components/messages/MessageBoard";
import PlayersBoard from "./components/PlayersBoard";
import TradeBoard from "./components/trades/TradeBoard";
import UserBoard from "./components/users/UserBoard";
import { loadGame } from "./utils/database";
import { watchTradesInGame } from "./utils/trades";

export default function GameBoard({
  match,
  gameCode,
  setGameCode,
  setErrors,
  errors
}) {
  
  const [gameData, setGameData] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [trades, setTrades] = useState([]);
  const [myTurn, setMyTurn] = useState(false);
  const [tradeBoardVisible, setTradeBoardVisible] = useState(false);

  const { gameCode: gCode } = useParams();

  const savedUser = JSON.parse(localStorage.getItem('user'));

  ///////////// functions ////////////////
  
  
  ///////////// useEffect ////////////////

  useEffect(() => {
    setGameCode(gCode);
  }, [gCode, setGameCode])

  useEffect(() => {
    if (!user && savedUser) {
      setUser(savedUser)
    }
  }, [user, savedUser])

  useEffect(() => {
    if (gameCode) {
      loadGame(gameCode, setGameData);
      watchTradesInGame(gameCode, setTrades);
    }
  }, [gameCode]);

  useEffect(() => {
    if (gameData?.turn === user?.id) {
      setMyTurn(true);
    } else {
      setMyTurn(false);
    }
  }, [gameData, user]);

  if (gameData?.gameStart) {
    return (
      <>
        <GameBoardGrid>
          <UserBoard
            userData={users.filter(u => u.userId === user?.id)[0]}
            gameData={gameData}
            gameCode={gameCode}
            myTurn={myTurn}
            errors={errors}
            setErrors={setErrors}
            users={users}
          />
          <MessageBoard
            gameData={gameData}
            gameCode={gameCode}
            userData={users.filter(u => u.userId === user?.id)[0]}
            users={users}
            errors={errors}
            setErrors={setErrors}
            setTradeBoardVisible={setTradeBoardVisible}
            trades={trades}
          />
          <FaceUpCards
            gameData={gameData}
            gameCode={gameCode}
            myTurn={myTurn}
            userData={users.filter(u => u.userId === user?.id)[0]}
          />
          <PlayersBoard
            gameData={gameData}
            gameCode={gameCode}
            myTurn={myTurn}
            users={users}
            userData={users.filter(u => u.userId === user?.id)[0]}
          />
        </GameBoardGrid>
        <Deck
          userData={users.filter(u => u.userId === user?.id)[0]}
          gameData={gameData}
          gameCode={gameCode}
          myTurn={myTurn}
          errors={errors}
          setErrors={setErrors}
        />
        <TradeBoard
          tradeBoardVisible={tradeBoardVisible}
          setTradeBoardVisible={setTradeBoardVisible}
          userData={users.filter(u => u.userId === user?.id)[0]}
          gameData={gameData}
          gameCode={gameCode}
          users={users}
          errors={errors}
          setErrors={setErrors}
          myTurn={myTurn}
        />
        {
          gameData?.host === user?.id
          &&
          <HostOptions
            gameCode={gameCode}
            gameData={gameData}
            errors={errors}
            setErrors={setErrors}
          />
        }
      </>
    )
  }

  return (
    <Lobby
      gameCode={gameCode}
      gameData={gameData}
      user={user}
      setUser={setUser}
      users={users}
      setUsers={setUsers}
      setErrors={setErrors}
      errors={errors}
      savedUser={savedUser}
    />
  );
}
