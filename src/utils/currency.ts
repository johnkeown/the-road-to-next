import { MyBig } from "@/lib/big";

export const toCent = (amount: number) =>
  MyBig(amount).times(100).round(2).toNumber();

export const fromCent = (amount: number) =>
  MyBig(amount).div(100).round(2).toNumber();

export const toCurrencyFromCent = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(fromCent(amount));
