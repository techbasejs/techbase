import * as yup from "yup";
import {  isMobilePhoneYup } from "../is-mobile-phone";
import "../../types/yup.d.ts";

// Define the new method using isPhoneNumber in project
yup.addMethod(
  yup.string,
  "isMobilePhone",
  isMobilePhoneYup,
);
