"use client";
import { signOut, useSession } from "../../src/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user } = useSession<{ email: string }>();
  const router = useRouter();
  const logoutHandler = async () => {
    await signOut();
    router.push("/login");
  };
  return (
    <div>
      <h1>Hello, {user?.email}</h1>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}
