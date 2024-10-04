import { CallbacksType } from "./types/auth"

const redirect: CallbacksType["redirect"] = ({ url, baseUrl }) => {
  if (url.startsWith("/")) return `${baseUrl}${url}`
  else if (new URL(url).origin === baseUrl) return url
  return baseUrl
}

export { redirect }
