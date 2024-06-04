"use client";

import { signIn } from "../../../src/react";

export default function TwoFactorPage() {
  const submitHandler = () => {
    signIn('2fa')
  };
  return (
    <div>
      <input placeholder="2fa code" />
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
}
