import firebase from '../firebase';

export function createNewUser(name, color) {
  const newUser = {
    name,
    color,
    hand: [],
    pot: [],
    score: 5,
    coinCards: [],
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
  };
  return newUser;
}

export function addFirstUser(gameCode, user) {
  const updatedUser = { ...user };
  updatedUser.id = 0;
  firebase.ref(`/bohnanza/${gameCode}/users`).set([updatedUser]);
}

export function addNewUser(gameCode, user, numUsers) {
  const updatedUser = { ...user };
  updatedUser.id = numUsers;
  firebase.ref(`/bohnanza/${gameCode}/users/${numUsers}`).set(updatedUser);
}
