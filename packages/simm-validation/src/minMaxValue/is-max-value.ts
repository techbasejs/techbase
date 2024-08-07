export const isMaxValue = (num: number, array: number[]): boolean => {
  if (!array || !num) {
    return false;
  }

  let maxValue = array[0];

  for (let i = 1; i < array.length; i++) {
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }

  return maxValue === num;
};
