import * as yup from "yup";
import { isMobilePhone, MobilePhoneLocaleType } from "../is-mobile-phone";

// Define the new method using isPhoneNumber in project
yup.addMethod(
  yup.string,
  "isPhoneNumber",
  function (message = "Invalid phone number", locale?: MobilePhoneLocaleType) {
    return (this as yup.StringSchema).test(
      "isPhoneNumber",
      message,
      function (value) {
        if (!value) return true;

        return isMobilePhone(value, locale);
      },
    );
  },
);
