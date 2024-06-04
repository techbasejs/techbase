import { useState } from "react";

export const useHookTest = () => {
  const [counter, setCounter] = useState();
  return {
    counter,
  };
};
