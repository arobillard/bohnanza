import { useEffect, useState } from 'react';
import FaceUpCards from './components/gameboard/FaceUpCards';
import GameBoardGrid from './components/gameboard/GameBoardGrid';
import MessageBoard from './components/gameboard/MessageBoard';
import PlayersBoard from './components/gameboard/PlayersBoard';
import UserBoard from './components/gameboard/user/UserBoard';
import { sampleUsers } from './data/sampleUsers';
import { sampleMessages, sampleTrades } from './data/sampleMessages';
import Lobby from './components/Lobby';
import firebase from './firebase';
import { objIsEmpty } from './utils/helpers';
import { addFirstUser, addNewUser } from './utils/users';
// import { cardList } from './data/cards';
// import { generateDeck, discard, shuffle } from './utils/deck';

function App({ match, setVisualGameCode }) {
  const [gameCode, setGameCode] = useState(match.params.gameCode);
  const [gameData, setGameData] = useState({});
  const [dataChecked, setDataChecked] = useState(false);
  const [thisUser, setThisUser] = useState({});
  // const [deck, setDeck] = useState([]);
  // const [discardPile, setDiscardPile] = useState([]);
  // const [trades, setTrades] = useState([]);
  // const [messages, setMessages] = useState([]);
  // const [round, setRound] = useState(0);
  // const [turn, setTurn] = useState(0);
  // const [faceUp, setFaceUp] = useState([3, 6]);
  // const [users, setUsers] = useState([]);
  // const [gameStart, setGameStart] = useState(false);

  // const [gameOptions, setGameOptions] = useState({
  //   players: 6,
  //   // removedCardTypes: ['Cocoa Bean', 'Wax Bean', 'Coffee Bean'],
  //   removedCardTypes: [],
  // });

  // useEffect(() => {
  //   firebase.ref(`/bohnanza/${gameId}`).on('value', (snapshot) => {
  //     const data = snapshot.val();
  //     setDb(data);
  //   });
  // }, [gameId]);

  useEffect(() => {
    console.log('checking on data');
    firebase.ref(`/bohnanza/${gameCode}`).on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setGameData(data);
    });
    console.log('checked on data');
    setDataChecked(true);
  }, []);

  useEffect(() => {
    console.log('about to make new data');
    console.log('data check', dataChecked);
    if (
      objIsEmpty(gameData, 'checking to see if I should make data') &&
      dataChecked
    ) {
      console.log('making new data');
      firebase.ref(`/bohnanza/${gameCode}`).set({
        gameStart: false,
        settings: {
          removedCardTypes: [],
          maxRounds: 2,
          altDraw: false,
          buyThirdField: true,
        },
        deck: [],
        discardPile: [],
        round: 1,
        users: [],
        faceUp: [],
        trades: [],
        messages: [],
      });
    }
  }, [gameCode, dataChecked]);

  useEffect(() => {
    setVisualGameCode(gameCode);
    // setUsers(sampleUsers);
    // setMessages(sampleMessages);
    // setTrades(sampleTrades);
  }, [gameCode, setVisualGameCode]);

  useEffect(() => {
    if (!objIsEmpty(gameData) && gameData.users) {
      console.log('there are users');
      addNewUser(gameCode, thisUser, gameData.users.length);
    } else if (!objIsEmpty(gameData) && !gameData.users) {
      addFirstUser(gameCode, thisUser);
      console.log('there are no users');
    }
  }, [thisUser]);

  if (!objIsEmpty(gameData) && gameData.gameStart) {
    return (
      <GameBoardGrid>
        {/* <UserBoard thisUser={thisUser} setThisUser={setThisUser} /> */}
        {/* <MessageBoard
          messages={messages}
          setMessages={setMessages}
          trades={trades}
          setTrades={setTrades}
          thisUser={thisUser}
          users={users}
          setUsers={setUsers}
        /> */}
        {/* <FaceUpCards faceUp={faceUp} /> */}
        {/* <PlayersBoard users={users} thisUser={thisUser} /> */}
        <p>In game!</p>
      </GameBoardGrid>
    );
  }
  return (
    // <p>{gameData ? gameData.round : 'Lobby'}</p>
    <Lobby
      thisUser={thisUser}
      setThisUser={setThisUser}
      users={!objIsEmpty(gameData) ? gameData.users : []}
      gameCode={gameCode}
    />
  );
}

export default App;
