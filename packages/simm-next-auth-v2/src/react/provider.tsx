"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ofetch } from "ofetch";
import { User } from "../types";

export const SessionContext = createContext<{
  session: {
    user: User | null;
  };
  getSession?: () => void;
  updateSession?: (payload: User) => void;
}>({
  session: {
    user: null,
  },
});

export function useSessionContext<T>() {
  const context = useContext(SessionContext);
  return {
    user: context.session.user as T,
    update: context.getSession,
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
    getSession();
  }, []);

  const getSession = useCallback(() => {
    const url = `/api/auth/session`;

    ofetch(url).then((res) => {
      setSession({
        user: res.user || null,
      });
    });
  }, []);

  const updateSession = (payload: User) => {
    const url = `/api/auth/session`;
    ofetch(url, {
      method: "POST",
      body: payload,
    }).then((res) => {
      setSession({
        user: res.user || null,
      });
    });
  };

  return (
    <SessionContext.Provider value={{ session, getSession, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};
