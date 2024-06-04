"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ofetch } from "ofetch";

export const SessionContext = createContext<{
  session: {
    user: any;
  };
  updateSession?: () => void;
}>({
  session: {
    user: null,
  },
});

export function useSessionContext<T>() {
  const context = useContext(SessionContext);
  return {
    user: context.session.user as T,
    update: context.updateSession,
  };
}

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState({
    user: null,
  });
  useEffect(() => {
    updateSession();
  }, []);

  const updateSession = useCallback(() => {
    const url = `/api/auth/session`;

    ofetch(url, {
      credentials: "include",
    }).then((res) => {
      setSession({
        user: res.user || null,
      });
    });
  }, []);

  // if (!session.user) {
  //   return <></>;
  // }

  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};
