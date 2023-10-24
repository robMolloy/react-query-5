export const getRandomNumber = (x?: number) =>
  Math.floor(Math.random() * Math.pow(10, x ? x : 2));
