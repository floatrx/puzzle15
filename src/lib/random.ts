export const randomNumber = (min: number = 1, max: number = 15) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
