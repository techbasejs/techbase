import { ofetch } from "ofetch";
import { Cookies } from "./cookies";
import { COOKIE_TOKEN_KEY } from "./constants";

async function signOut(): Promise<any> {
  const url = `/api/auth/logout`;
  
  try {
    const response = await ofetch(url, {
      method: "POST",
    });
    const cookies = new Cookies();
    cookies.remove(COOKIE_TOKEN_KEY);
    return response;
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
}

export { signOut };
