export const isMinValue = (num: number, array: number[]): boolean => {
  if (!array || !num) {
    return false;
  }

  let minValue = array[0];

  for (let i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    }
  }

  return minValue === num;
};
