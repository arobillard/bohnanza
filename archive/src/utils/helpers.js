export function generateGameCode() {
  const lets = Array.from('abcdefghijklmnopqrstuvwxyz');
  const randomLet = lets[Math.floor(Math.random() * lets.length)];
  const gc = `${randomLet}-${Math.floor(Math.random() * 1000)}`;
  return gc;
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function randomTilt(max) {
  let deg = Math.ceil(Math.random() * max);
  const neg = Math.round(Math.random());
  if (neg === 0) {
    deg *= -1;
  }
  return `${deg}deg`;
}

export function objIsEmpty(obj, msg) {
  if (obj) {
    if (msg) {
      console.log(msg, obj, Object.keys(obj).length === 0);
    }
    return Object.keys(obj).length === 0;
  }
  return true;
}
