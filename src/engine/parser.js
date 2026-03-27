import { SYMBOLS } from "../symbolic/dictionary";

export function parse(input) {
  return input.split(" ").map(symbol => {
    return SYMBOLS[symbol] || { name: "unknown", raw: symbol };
  });
}