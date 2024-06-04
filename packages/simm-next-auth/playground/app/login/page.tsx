"use client";
import { useState } from "react";
import { signIn, useSession } from "../../../src/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user, update } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    enable_2fa: false,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const loginHandler = async () => {
    const res = await signIn<{
      email: string;
      password: string;
      enable_2fa: boolean;
    }>("login", {
      email: form.email,
      password: form.password,
      enable_2fa: form.enable_2fa,
    });
    if (res.error) {
      setErrorMsg(res.error.message);
      return;
    }
    await update();
    if (form.enable_2fa) {
      router.push("/2fa");
    } else {
      router.push("/");
    }
  };

  const register = (name: string) => {
    return {
      onChange: (e) => {
        setForm((form) => ({
          ...form,
          [name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value,
        }));
      },
    };
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ccc",
          padding: "20px",
          maxWidth: "600px",
        }}
      >
        <h1>Login page</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            alignItems: "center",
          }}
        >
          <div>
            <input placeholder="username or email" {...register("email")} />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <div>
            <input type="checkbox" {...register("enable_2fa")} />
            Enable 2FA
          </div>
          <div>
            <button onClick={loginHandler}>Login</button>
          </div>
        </div>
        {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
      </div>
    </div>
  );
}
