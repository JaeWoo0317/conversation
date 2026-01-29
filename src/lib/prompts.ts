import { Mode, Goal } from './types';
import { Language } from './dictionaries';

export const SYSTEM_PROMPT = `You are an expert communication coach and conflict resolution specialist. 
Your goal is to analyze conversations and provide actionable, constructive feedback to help users achieve their goals.
You must always output valid JSON adhering strictly to the schema provided.
Do not use markdown formatting in the JSON output.
The tone should be empathetic, objective, and solution-oriented.`;

export function getUserPrompt(mode: Mode, goal: Goal, conversation: string, language: Language = 'ko'): string {
  const isKo = language === 'ko';

  const modeInstructions = {
    couple: isKo 
      ? "감정적 인정을 통해 안전감을 회복하고, 비난 없이 자신의 필요를 표현하는 데 집중하세요. '항상/절대' 같은 표현을 피하도록 하세요."
      : "Focus on emotional validation, restoring safety, and expressing needs without blame. Avoid 'always/never' statements.",
    work: isKo
      ? "사실과 전문적인 경계에 집중하고, 명확한 요청을 하세요. 감정적인 비난을 피하고 전문적인 태도를 유지하세요."
      : "Focus on facts, professional boundaries, and clear requests. Maintain a professional, non-aggressive tone.",
    family: isKo
      ? "통제하려는 싸움을 줄이고 건강한 경계를 설정하는 데 집중하세요. 상호 존중과 명확한 선택지를 제시하세요."
      : "Focus on reducing control struggles and establishing healthy boundaries. Aim for mutual respect and clear choices."
  };

  const goalInstructions = {
    repair: isKo
      ? "관계의 회복과 갈등 완화가 목표입니다."
      : "The goal is to repair the relationship and de-escalate conflict.",
    persuate: isKo
      ? "자신의 관점을 설득력 있게 전달하는 것이 목표입니다."
      : "The goal is to persuasively present a point of view.",
    agree: isKo
      ? "상호 합의나 타협점을 찾는 것이 목표입니다."
      : "The goal is to reach a mutual agreement or compromise.",
    feedback: isKo
      ? "상대방이 방어적이지 않도록 건설적인 피드백을 주는 것이 목표입니다."
      : "The goal is to give constructive feedback without causing defensiveness.",
    boundaries: isKo
      ? "개인적 또는 전문적 경계를 명확히 설정하는 것이 목표입니다."
      : "The goal is to establish or reinforce personal/professional boundaries."
  };

  const outputLanguageInstruction = isKo 
    ? "모든 출력은 '한국어(Korean)'로 작성해야 합니다."
    : "All output must be in 'English'.";

  const jsonStructure = isKo ? `
{
  "neutral_summary": {
    "userA_claim": "사용자 A의 주장을 한 문장으로 요약",
    "userB_claim": "사용자 B의 주장을 한 문장으로 요약",
    "issues": ["핵심 갈등 쟁점 리스트 1-3개"]
  },
  "misunderstanding_points": [
    {
      "quote": "문제가 되거나 오해를 살 수 있는 원문 문장",
      "why_risky": "왜 이 표현이 위험한지 설명 (비난조, 모호함, 공격적 등)",
      "neutral_reframe": "객관적이고 부드럽게 고친 표현"
    }
  ] (최대 3개),
  "next_sentences": {
    "soft": "부드럽고 공감적인 답변 옵션",
    "firm": "단호하게 경계를 설정하는 답변 옵션",
    "short": "짧고 간결하며 중립적인 답변 옵션"
  },
  "rehearsal": {
    "scenarioA": {
      "partner_reply": "상대방이 방어적이거나 부정적으로 나올 때의 예상 반응",
      "recommended_answer": "그에 대한 건설적인 대응 답변"
    },
    "scenarioB": {
      "partner_reply": "상대방이 회피하거나 무관심하게 나올 때의 예상 반응",
      "recommended_answer": "그에 대한 건설적인 대응 답변"
    }
  }
}
` : `
{
  "neutral_summary": {
    "userA_claim": "One sentence summary of User A's main point",
    "userB_claim": "One sentence summary of User B's main point",
    "issues": ["List of 1-3 key conflict points"]
  },
  "misunderstanding_points": [
    {
      "quote": "A specific risky/misinterpreted sentence from the text",
      "why_risky": "Why this is problematic (e.g., blame, vague, aggressive)",
      "neutral_reframe": "A better way to say it objectively"
    }
  ] (Max 3 points),
  "next_sentences": {
    "soft": "A gentle, empathetic response option",
    "firm": "A clear, boundary-setting response option",
    "short": "A concise, neutral response option"
  },
  "rehearsal": {
    "scenarioA": {
      "partner_reply": "A possible negative/defensive reaction from the partner",
      "recommended_answer": "How to handle this reaction constructively"
    },
    "scenarioB": {
      "partner_reply": "A possible dismissive/avoidant reaction from the partner",
      "recommended_answer": "How to handle this reaction constructively"
    }
  }
}
`;

  return `
${outputLanguageInstruction}

Analyze the following conversation:
"${conversation}"

Context:
- Mode: ${mode} (${modeInstructions[mode]})
- Goal: ${goal} (${goalInstructions[goal]})

Provide a JSON response with the following structure:
${jsonStructure}
`;
}
