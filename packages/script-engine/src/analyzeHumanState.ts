import type {
  HumanAnalysisResult,
  HumanInput,
  HumanSignal,
  UnifiedState,
} from "./types";

const DEFAULT_THRESHOLDS = {
  glucoseHigh: 140,
  lactateHigh: 4,
  heartRateHigh: 110,
};

export function analyzeHumanState(input: HumanInput): HumanAnalysisResult {
  const signals = detectSignals(input);
  const unified = computeUnifiedState(signals);
  const recommendation = generateRecommendation(unified);

  return {
    unified,
    signals,
    recommendation,
    timestamp: new Date().toISOString(),
  };
}

function detectSignals(input: HumanInput): HumanSignal[] {
  const signals: HumanSignal[] = [];

  if ((input.bio?.glucose ?? 0) > DEFAULT_THRESHOLDS.glucoseHigh) {
    signals.push("high_glucose");
  }

  if ((input.bio?.lactate ?? 0) > DEFAULT_THRESHOLDS.lactateHigh) {
    signals.push("high_lactate");
  }

  if ((input.bio?.heartRate ?? 0) > DEFAULT_THRESHOLDS.heartRateHigh) {
    signals.push("high_heart_rate");
  }

  if (input.emotional?.stress === "high") {
    signals.push("high_stress");
  }

  if (input.emotional?.overload) {
    signals.push("overload");
  }

  if (input.cognitive?.confusion) {
    signals.push("confusion");
  }

  if (input.relational?.sosRequested) {
    signals.push("sos");
  }

  if (input.existential?.direction === "lost") {
    signals.push("lost_direction");
  }

  return signals;
}

function computeUnifiedState(signals: HumanSignal[]): UnifiedState {
  if (signals.includes("sos")) {
    return "critical";
  }

  if (
    signals.includes("high_stress") &&
    signals.includes("overload") &&
    signals.includes("confusion")
  ) {
    return "vulnerable";
  }

  if (
    signals.includes("confusion") &&
    signals.includes("lost_direction")
  ) {
    return "misaligned";
  }

  if (
    signals.includes("high_glucose") ||
    signals.includes("high_lactate") ||
    signals.includes("high_heart_rate") ||
    signals.includes("high_stress") ||
    signals.includes("lost_direction")
  ) {
    return "under_load";
  }

  return "stable";
}

function generateRecommendation(unified: UnifiedState): string {
  switch (unified) {
    case "stable":
      return "State stable. Continue regular observation.";

    case "under_load":
      return "Signals detected. Reduce pressure and continue monitoring.";

    case "misaligned":
      return "Internal misalignment detected. Reassess direction and priorities.";

    case "vulnerable":
      return "Vulnerable condition detected. Activate support and reduce load.";

    case "critical":
      return "Critical condition detected. Activate emergency safety protocol.";

    default:
      return "State not determined.";
  }
}