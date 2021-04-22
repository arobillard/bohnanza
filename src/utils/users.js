import { slugify } from "./helpers";
import firebase from '../firebase';
import { cardList } from "../data/cards";

const db = firebase.firestore();

export function createNewUser(name, color) {
  const newUser = {
    name,
    bohnanza: {
      color,
      score: [],
      fields: {
        field1: {
          cardNum: null,
          numCards: 0,
          active: true,
        },
        field2: {
          cardNum: null,
          numCards: 0,
          active: true,
        },
        field3: {
          cardNum: null,
          numCards: 0,
          active: false,
        },
      },
      hand: [],
      pot: []
    }
  };
  return newUser;
}

export function newUserCredentials(name) {
  return {
    id: slugify(`${name}-${Date.now()}`),
    userName: name
  };
}

export function addUserData(gameCode, userId, data) {
  db.collection('users').doc(userId).set({
    userId,
    activeGame: 'bohnanza',
    bohnanzaGC: gameCode,
    ...data
  }, { merge: true });
}

export function setHost(gameCode, userId) {
  db.collection('bohnanza').doc(gameCode).update({
    host: userId
  });
}

export function addUserToGame(gameCode, gameData, user, color) {
  if (!gameData?.host) {
    setHost(gameCode, user.id);
  }
  db.collection('bohnanza').doc(gameCode).update({
    users: firebase.firestore.FieldValue.arrayUnion(user.id)
  });
  addUserData(gameCode, user.id, createNewUser(user.userName, color));
}

export function clearUserGameCode(userId) {
  db.collection('users').doc(userId).set({
    bohnanzaGC: null,
  }, { merge: true });
}

export function removeUserFromGame(gameCode, userId) {
  db.collection('bohnanza').doc(gameCode).update({
    users: firebase.firestore.FieldValue.arrayRemove(userId)
  });
  clearUserGameCode(userId);
}

export function watchUsersInGame(gameCode, setUsers) {
  db.collection('users').where('bohnanzaGC', '==', gameCode)
    .onSnapshot((querySnapshot) => {
      var users = [];
      querySnapshot.forEach((user) => {
        users.push(user.data());
      });
      setUsers(users);
    })
}

export function stopWatchingUsersInGame(gameCode) {
  db.collection(gameCode).onSnapshot(() => {});
}

export async function drawCard(user, gameData, gameCode) {

  const updatedHand = [
    ...user.bohnanza.hand,
    gameData.deck[0]
  ]

  const updatedUserGameData = {
    ...user.bohnanza
  }

  updatedUserGameData['hand'] = updatedHand;

  const updatedDeck = [
    ...gameData.deck.slice(1, gameData.deck.length)
  ]

  try {
    await Promise.all([
      db.collection('users').doc(user.userId).update({
        bohnanza: updatedUserGameData
      }),
      db.collection('bohnanza').doc(gameCode).update({
        deck: updatedDeck
      })
    ])
  } catch (err) {
    console.log(err);
  }

}

export async function resetUserGameInfo(user, hand) {
  const newUserData = {
    color: user.bohnanza.color,
    score: [],
    fields: {
      field1: {
        cardNum: null,
        numCards: 0,
        active: true,
      },
      field2: {
        cardNum: null,
        numCards: 0,
        active: true,
      },
      field3: {
        cardNum: null,
        numCards: 0,
        active: false,
      },
    },
    hand,
    pot: []
  }

  try {
    await Promise.all([
      db.collection('users').doc(user.userId).update({
        bohnanza: newUserData
      }),
    ]);
  } catch (err) {
    console.log(err);
  }
}

export function deal(deck, users) {
  const numHands = users.length;
  let i = 0;
  let cardNum = 0;
  const hands = [];
  let updatedDeck = [
    ...deck
  ]

  while (cardNum < 5) {
    while (i < numHands) {
        if (!hands[i]) {
          hands[i] = [
            updatedDeck[0]
          ]
        } else {
          hands[i].push(updatedDeck[0]);
        }

      updatedDeck = [
        ...updatedDeck.slice(1, updatedDeck.length)
      ]

      i++;
    }
    i = 0;
    cardNum++;
  }

  return { hands, deck: updatedDeck };
}

export async function plantCard(cardNum, user, source, gameData, gameCode) {
  const { fields } = user.bohnanza;
  let plantableField = null;

  Object.keys(fields).reverse().forEach(field => {
    if (fields[field].cardNum === null && fields[field].active) {
      plantableField = field;
    }
  });

  Object.keys(fields).reverse().forEach(field => {
    if (fields[field].cardNum === cardNum && fields[field].active) {
      plantableField = field;
    }
  });

  if (!plantableField) {
    console.log('no plantable fields!');
    return false;
  }

  const updatedField = {
    ...fields[plantableField]
  }

  updatedField['cardNum'] = cardNum;
  updatedField['numCards'] = updatedField['numCards'] + 1;

  const newUserData = {
    ...user.bohnanza
  }
  newUserData.fields[plantableField] = updatedField;

  if (source === 'hand') {
    const updatedHand = [
      ...newUserData.hand.slice(1, newUserData.hand.length)
    ];
    newUserData.hand = updatedHand;
    
    try {
      await Promise.all([
        db.collection('users').doc(user.userId).update({
          bohnanza: newUserData
        }),
      ]);
      return true;
    } catch (err) {
      console.log(err);
    }
  }

  if (source === 'faceUp') {

    const removedIndex = gameData.faceUp.indexOf(cardNum);
    let updatedFaceUp = [];

    if (gameData.faceUp.length === 2) {
      updatedFaceUp = [
        gameData.faceUp[removedIndex === 0 ? 1 : 0]
      ];
    }

    try {
      await Promise.all([
        db.collection('bohnanza').doc(gameCode).update({
          faceUp: updatedFaceUp
        }),
        db.collection('users').doc(user.userId).update({
          bohnanza: newUserData
        }),
      ]);
      return true;
    } catch (err) {
      console.log(err);
    }

  }

  if (source === 'userPot') {
    const updatedPot = [
      ...newUserData.pot.slice(0, newUserData.pot.indexOf(cardNum)),
      ...newUserData.pot.slice(newUserData.pot.indexOf(cardNum) + 1)
    ];
    newUserData.pot = updatedPot;
    
    try {
      await Promise.all([
        db.collection('users').doc(user.userId).update({
          bohnanza: newUserData
        }),
      ]);
      return true;
    } catch (err) {
      console.log(err);
    }
  }

}

export async function buyField(user) {
  console.log('activating field!');

  const newUserData = {...user}.bohnanza;

  console.log(newUserData);

  newUserData.score = [
    ...newUserData.score.slice(3, newUserData.score.length)
  ]

  newUserData.fields.field3.active = true;

  try {
    await Promise.all([
      db.collection('users').doc(user.userId).update({
        bohnanza: newUserData
      }),
    ]);
    return true;
  } catch (err) {
    console.log(err);
  }
}

export async function harvest(userData, cardNum, numCards, fieldNum, gameCode, gameData) {
  const updatedUserData = {...userData.bohnanza};
  const updatedGameData = {...gameData};
  const card = cardList[cardNum];
  let coins = 0;
  const addToScore = [];
  const addToDiscard = [];

  Object.keys(card.score).forEach(num => {
    const val = parseInt(num);
    if (numCards >= val) {
      coins = card.score[num];
    }
  });

  let i = 0;
  while (i < coins) {
    addToScore.push(cardNum)
    i++;
  }

  updatedUserData.fields[`field${fieldNum}`] = {
    cardNum: null,
    numCards: 0,
    active: true,
  }

  i = 0;
  while (i < (numCards - coins)) {
    addToDiscard.push(cardNum);
    i++;
  }

  updatedUserData.score = [
    ...updatedUserData.score,
    ...addToScore
  ];

  updatedGameData.discardPile = [
    ...gameData.discardPile,
    ...addToDiscard
  ];

  try {
    await Promise.all([
      db.collection('users').doc(userData.userId).update({
        bohnanza: updatedUserData
      }),
      db.collection('bohnanza').doc(gameCode).update({
        discardPile: updatedGameData.discardPile
      }),
    ]);
  } catch (err) {
    console.log(err);
  }
}
