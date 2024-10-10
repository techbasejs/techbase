// types/yup.d.ts
import * as yup from "yup";

declare module "yup" {
  interface StringSchema {
    isPhoneNumber(message?: string, locale?: MobilePhoneLocaleType): this;
  }
}
