import firebase from '../firebase';

export const db = firebase.ref('/bohnanza');

export function getAll() {
  return db;
}

export function createItem(path, data) {
  firebase.ref(`/bohnanza/${path}`).push(data);
}

export function update(key, data) {
  return db.child(key).update(data);
}

export function remove(key) {
  return db.child(key).remove();
}

export function removeAll() {
  return db.remove();
}
