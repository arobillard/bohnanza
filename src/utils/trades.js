import firebase from '../firebase';
import { arraysEqual } from './helpers';

const db = firebase.firestore();

export function checkTrade(hand, tradeData) {
  const confirmedHas = [];

  const cardsToCheck = [];

  tradeData.get.forEach(card => {
    if (card.source !== 'faceUp') {
      cardsToCheck.push(card.cardNum);
    }
  })

  let handCopy = [...hand];

  cardsToCheck.forEach(c => {
    
    if (handCopy.indexOf(c) >= 0) {
      confirmedHas.push(c);
    }

    handCopy = [
      ...handCopy.slice(0, handCopy.indexOf(c)),
      ...handCopy.slice(handCopy.indexOf(c) + 1, handCopy.length)
    ]

  })

  return arraysEqual(confirmedHas, cardsToCheck);

}

export function watchTradesInGame(gameCode, setTrades) {
  db.collection('trades').where('gameCode', '==', gameCode)
    .onSnapshot((querySnapshot) => {
      var trades = [];
      querySnapshot.forEach((trade) => {
        trades.push(trade.data());
      });
      setTrades(trades);
    })
}

export async function setNewTrade(trade, gameCode) {

  try {
    await Promise.all([
      db.collection('trades').doc(trade.tradeId).set({
        ...trade
      }),
    ]);
  } catch (err) {
    console.log(err);
  }
}

export async function updateTradeUserStatus(tradeId, userTrade, status) {
  
  const updatedUserTrade = {...userTrade};
  updatedUserTrade.status = status;

  try {
    await Promise.all([
      db.collection('trades').doc(tradeId).update({
        to: firebase.firestore.FieldValue.arrayRemove(userTrade)
      }),
      db.collection('trades').doc(tradeId).update({
        to: firebase.firestore.FieldValue.arrayUnion(updatedUserTrade)
      }),
    ]);
  } catch (err) {
    console.log(err);
  }
}

export async function setConfirmedToUser(tradeData, userId) {
  try {
    await Promise.all([
      db.collection('trades').doc(tradeData.tradeId).update({
        confirmedTo: userId
      })
    ]);
  } catch (err) {
    console.log(err);
  }
}

export async function acceptTrade(tradeData, trader) {
  try {
    await Promise.all([
      db.collection('trades').doc(tradeData.tradeId).update({
        [trader]: true
      })
    ]);
  } catch (err) {
    console.log(err);
  }
}

export async function rejectTrade(tradeData, rejector) {
  try {
    await Promise.all([
      db.collection('trades').doc(tradeData.tradeId).update({
        rejected: true,
        rejector
      })
    ]);
  } catch (err) {
    console.log(err);
  }
}

export async function fulfillTrade(gameData, gameCode, tradeData, users) {

  const { give, get, from, confirmedTo: to } = tradeData;

  const fromUser = users.filter(u => u.userId === from)[0];
  const toUser = users.filter(u => u.userId === to)[0];

  const updatedFromData = {...fromUser.bohnanza};
  let updatedFromHand = [...updatedFromData.hand];

  const updatedToData = {...toUser.bohnanza};
  let updatedToHand = [...updatedToData.hand];

  const getClean = [];
  const giveClean = [];

  let updatedFaceUp = [...gameData.faceUp];

  get.forEach((card, i) => {
    if (card.source === 'hand') {
      updatedToHand = [
        ...updatedToHand.slice(0, updatedToHand.indexOf(card.cardNum)),
        ...updatedToHand.slice(updatedToHand.indexOf(card.cardNum) + 1)
      ]
    } else if (card.source === 'faceUp') {
      updatedFaceUp = [
        ...updatedFaceUp.slice(0, updatedFaceUp.indexOf(card.cardNum)),
        ...updatedFaceUp.slice(updatedFaceUp.indexOf(card.cardNum) + 1)
      ]
    }
    getClean.push(card.cardNum);
  });

  give.forEach((card, i) => {
    if (card.source === 'hand') {
      updatedFromHand = [
        ...updatedFromHand.slice(0, updatedFromHand.indexOf(card.cardNum)),
        ...updatedFromHand.slice(updatedFromHand.indexOf(card.cardNum) + 1)
      ]
    } else if (card.source === 'faceUp') {
      updatedFaceUp = [
        ...updatedFaceUp.slice(0, updatedFaceUp.indexOf(card.cardNum)),
        ...updatedFaceUp.slice(updatedFaceUp.indexOf(card.cardNum) + 1)
      ]
    }
    giveClean.push(card.cardNum);
  })

  const updatedFromPot = [
    ...updatedFromData.pot,
    ...getClean
  ]

  const updatedToPot = [
    ...updatedToData.pot,
    ...giveClean
  ]

  updatedFromData.hand = updatedFromHand;
  updatedFromData.pot = updatedFromPot;

  updatedToData.hand = updatedToHand;
  updatedToData.pot = updatedToPot;

  try {
    await Promise.all([
      db.collection('bohnanza').doc(gameCode).update({
        faceUp: updatedFaceUp
      }),
      db.collection('trades').doc(tradeData.tradeId).update({
        fulfilled: true
      }),
      db.collection('users').doc(from).update({
        bohnanza: updatedFromData
      }),
      db.collection('users').doc(to).update({
        bohnanza: updatedToData
      }),
    ]);
  } catch (err) {
    console.log(err);
  }

}