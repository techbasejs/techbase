export const isInRange = (min: number, max: number) => {
  return (value: number) => {
    if (typeof value !== "number") {
      return false;
    }
    return value >= min && value <= max;
  };
};
