import { USDollar, VNDong, exponentialToString, formatDecimalByExample, yen } from "../src/currency-format";


const price = 143450.123456789;

console.log("Dollars: " + USDollar.format(price));
console.log("VN Dong: " + VNDong.format(price));
console.log("YEN: " + yen.format(price));

console.log("Convert: " + formatDecimalByExample(455.2e-3, 324_324.015_435));
console.log("Exponential: " + exponentialToString(455.2e21));