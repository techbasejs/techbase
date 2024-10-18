// types/yup.d.ts
import { StringSchema } from "yup";

declare module "yup" {
  interface StringSchema {
    isMobilePhone(message?: string, locale?: MobilePhoneLocaleType): this;
  }
}
