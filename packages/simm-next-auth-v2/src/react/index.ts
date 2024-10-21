import { useSessionContext } from "./provider";

export const useSession = <T>() => {
  const context = useSessionContext<T>();
  return context;
};

export * from "./provider";
