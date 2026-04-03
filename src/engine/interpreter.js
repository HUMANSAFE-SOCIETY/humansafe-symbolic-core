import { parse } from "./parser.js";

export function interpret(input) {
  const tokens = parse(input);

  let state = {
    level: "neutral",
    signals: [],
    urgency: 0
  };

  tokens.forEach(token => {
    const name = token.name?.toLowerCase();

    if (!name) return;

    // segnali riconosciuti
    state.signals.push(name);

    // logica base Humansafe
    if (name.includes("danger") || name.includes("help")) {
      state.level = "critical";
      state.urgency += 2;
    }

    else if (name.includes("stress") || name.includes("fear")) {
      if (state.level !== "critical") {
        state.level = "alert";
      }
      state.urgency += 1;
    }

    else {
      state.urgency += 0.2;
    }
  });

  // normalizzazione
  if (state.urgency > 3) {
    state.level = "critical";
  } else if (state.urgency > 1) {
    state.level = "alert";
  }

  return {
    input,
    state
  };
}