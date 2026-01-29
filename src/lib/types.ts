export type Mode = "couple" | "work" | "family";
export type Goal = "repair" | "persuate" | "agree" | "feedback" | "boundaries";

export interface AnalysisRequest {
  mode: Mode;
  goal: Goal;
  conversation: string;
  image?: string; // Base64 string
  language?: 'ko' | 'en';
}

export interface AnalysisResult {
  neutral_summary: {
    userA_claim: string;
    userB_claim: string;
    issues: string[];
  };
  misunderstanding_points: {
    quote: string;
    why_risky: string;
    neutral_reframe: string;
  }[];
  next_sentences: {
    soft: string;
    firm: string;
    short: string;
  };
  rehearsal: {
    scenarioA: {
      partner_reply: string;
      recommended_answer: string;
    };
    scenarioB: {
      partner_reply: string;
      recommended_answer: string;
    };
  };
}

export interface Reflection {
  id: string;
  user_id: string;
  conversation: string;
  mode: Mode;
  goal: Goal;
  result: AnalysisResult;
  created_at: string;
}
