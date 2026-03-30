export type UnifiedState =
  | "stable"
  | "under_load"
  | "misaligned"
  | "vulnerable"
  | "critical";

export type HumanSignal =
  | "high_glucose"
  | "high_lactate"
  | "high_heart_rate"
  | "high_stress"
  | "overload"
  | "confusion"
  | "sos"
  | "lost_direction";

export interface HumanInput {
  bio?: {
    glucose?: number;
    lactate?: number;
    heartRate?: number;
  };
  emotional?: {
    stress?: "low" | "medium" | "high";
    overload?: boolean;
  };
  cognitive?: {
    confusion?: boolean;
  };
  relational?: {
    sosRequested?: boolean;
  };
  existential?: {
    direction?: "lost" | "unclear" | "stable" | "growing";
  };
}

export interface HumanAnalysisResult {
  unified: UnifiedState;
  signals: HumanSignal[];
  recommendation: string;
  timestamp: string;
}