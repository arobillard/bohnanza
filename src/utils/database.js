import firebase from '../firebase';
import { generateDeck, shuffle } from './deck';
import { rando } from './helpers';
import { deal, resetUserGameInfo } from './users';

const db = firebase.firestore();

const turnPhaseDefault = {
  phase: 1,
  phase1 : { // Hand Plant
    title: 'Plant',
    desc: 'Plant the first card in your hand. Optionally play the second card as well.',
    planted: 0,
  },
  phase2 : { // Turn & Trade
    title: 'Trade',
    desc: 'Turn up two cards from the deck. You may trade or plant the cards.',
    turned: false,
  },
  phase3: { // Plant
    title: 'Plant',
    desc: 'Plant all turned up or traded cards.',
    allPlanted: false,
  },
  phase4: { // Draw
    title: 'Draw',
    desc: 'Draw three cards, placing in hand in order.',
    drawn: 0,
  }
}

export function createGame(gameCode) {
  db.collection('bohnanza').doc(gameCode).set({
    gameStart: false,
    users: [],
  })
  .then(() => {
    // console.log('Game created!');
  })
  .catch((error) => {
    console.log('Error adding game', error);
  })
}

export async function loadGame(gameCode, setGameData) {
  db.collection('bohnanza').doc(gameCode)
    .onSnapshot((doc) => {
      setGameData(doc.data());
      if (!doc.data()) {
        createGame(gameCode);
      }
    })
}

export function startGame(gameCode, users) {
  const shuffledDeck = shuffle(generateDeck());
  const { hands, deck } = deal(shuffledDeck, users);
  const firstUser = rando(users).userId;

  db.collection('bohnanza').doc(gameCode).update({
    gameStart: true,
    deck,
    discardPile: [9, 5, 10, 6, 3, 7],
    messages: [],
    faceUp: [],
    turn: firstUser,
    turnPhase: turnPhaseDefault
  })
  users.forEach((user, i) => {
    resetUserGameInfo(user, hands[i]);
  })
}

export async function reshuffleDeck(gameCode, deck, discardPile) {
  console.log('reshuffle function');
  const updatedDeck = shuffle([
    ...deck,
    ...discardPile
  ]);
  try {
    await Promise.all([
      db.collection('bohnanza').doc(gameCode).update({
        deck: updatedDeck,
        discardPile: [],
      }),
    ]);
  } catch (err) {
    console.log(err);
  }
}

export function cancelGame(gameCode) {
  db.collection('bohnanza').doc(gameCode).update({
    gameStart: false,
    deck: [],
    discardPile: [],
    messages: [],
    faceUp: [],
    turn: null,
    turnPhase: turnPhaseDefault
  })
}

export async function nextTurn(gameCode, gameData) {
  const newPlayerTurn = gameData.users[gameData.users.indexOf(gameData.turn) + 1] || gameData.users[0];
  try {
    await Promise.all([
      db.collection('bohnanza').doc(gameCode).update({
        turn: newPlayerTurn,
        turnPhase: turnPhaseDefault
      }),
    ]);
  } catch (err) {
    console.log(err);
  }
}

export async function turnUpCards(gameCode, gameData) {
  
  const updatedFaceUp = [
    gameData.deck[0],
    gameData.deck[1],
  ];

  const updatedDeck = [
    ...gameData.deck.slice(2, gameData.deck.length)
  ]

  try {
    await Promise.all([
      db.collection('bohnanza').doc(gameCode).update({
        deck: [...updatedDeck],
        faceUp: [...updatedFaceUp],
      }),
    ]);
  } catch (err) {
    console.log(err);
  }

}

export async function progressPhase(gameCode, gameData, action) {

  const updatedTurnPhase = {...gameData.turnPhase};

  if (action === 'handPlant') {
    updatedTurnPhase.phase1.planted +=1;
    if (updatedTurnPhase.phase1.planted === 2) {
      updatedTurnPhase.phase = 2;
    }
  } else if (action === 'turnUp') {
    updatedTurnPhase.phase2.turned = true;
  } else if (action === 'p4Draw') {
    updatedTurnPhase.phase4.drawn += 1;
  }

  try {
    await Promise.all([
      db.collection('bohnanza').doc(gameCode).update({
        turnPhase: updatedTurnPhase
      }),
    ]);
  } catch (err) {
    console.log(err);
  }

}

export async function nextPhase(gameData, gameCode, setErrors, errors, allPlanted, admin, userHand, customErr) {
  
  const { turnPhase } = gameData;
  let updatedTurnPhase = {...turnPhase};
  let doUpdate = false;
  let goNextTurn = false;

  if (admin) {
    if (updatedTurnPhase.phase === 4) {
      updatedTurnPhase = {...turnPhaseDefault};
      doUpdate = true;
      goNextTurn = true;
    } else {
      updatedTurnPhase = {...turnPhaseDefault};
      updatedTurnPhase.phase = turnPhase.phase + 1;
      doUpdate = true;
    }
  } else if (turnPhase.phase === 1 && turnPhase.phase1.planted > 0) {
    updatedTurnPhase = {...turnPhaseDefault};
    updatedTurnPhase.phase = turnPhase.phase + 1;
    doUpdate = true;
  } else if (turnPhase.phase === 1 && userHand.length === 0) {
    updatedTurnPhase = {...turnPhaseDefault};
    updatedTurnPhase.phase = turnPhase.phase + 1;
    doUpdate = true;
  } else if (turnPhase.phase === 2 && turnPhase.phase2.turned) {
    updatedTurnPhase = {...turnPhaseDefault};
    updatedTurnPhase.phase = turnPhase.phase + 1;
    doUpdate = true;
  } else if (turnPhase.phase === 3 && allPlanted) {
    updatedTurnPhase = {...turnPhaseDefault};
    updatedTurnPhase.phase = turnPhase.phase + 1;
    doUpdate = true;
  } else if (turnPhase.phase === 4 && turnPhase.phase4.drawn >= 2) {
    updatedTurnPhase = {...turnPhaseDefault};
    goNextTurn = true;
    doUpdate = true;
  } else {
    setErrors([
      ...errors,
      {
        msg: customErr || 'You must complete phase before progressing!',
        type: 'warning'
      }
    ])
  }

  const nextPlayer = gameData.users[gameData.users.indexOf(gameData.turn) + 1] || gameData.users[0];
  const playerTurn = goNextTurn ? nextPlayer : gameData.turn;

  if (doUpdate) {
    try {
      await Promise.all([
        db.collection('bohnanza').doc(gameCode).update({
          turnPhase: updatedTurnPhase,
          turn: playerTurn,
        }),
      ]);
    } catch (err) {
      console.log(err);
    }
  }

}

export async function setNewMessage(message, gameCode) {

  try {
    await Promise.all([
      db.collection('bohnanza').doc(gameCode).update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
      }),
    ]);
  } catch (err) {
    console.log(err);
  }
}