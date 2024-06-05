"use client";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "../../../src/react";

export default function TwoFactorPage() {
  const router = useRouter()
  const { update } = useSession()
  const submitHandler = async () => {
    await signIn("2fa");
    await update();
    router.push('/')
  };
  return (
    <div>
      <input placeholder="2fa code" />
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
}
