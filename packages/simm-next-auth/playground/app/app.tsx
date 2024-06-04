"use client";

import { SessionProvider } from "../../src/react";

export default function App({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
