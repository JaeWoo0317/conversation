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
      ? "[페르소나: 따뜻한 관계 심리 상담사] 감정을 깊이 공감해주고, 두 사람의 상처를 보듬어주는 온화하고 중재적인 어조로 분석하세요. '비폭력 대화' 기법을 사용하여, 서로의 숨겨진 욕구를 찾아내고 감정적 연결을 회복하는 데 집중하세요."
      : "[Persona: Warm Relationship Counselor] Analyze with a gentle, empathetic, and mediating tone, focusing on validating emotions and healing wounds. Use 'Nonviolent Communication' techniques to uncover hidden needs and restore emotional connection.",
    work: isKo
      ? "[페르소나: 냉철한 비즈니스 커뮤니케이션 코치] 감정을 배제하고 사실(Fact)과 효율성, 전문성을 강조하는 건조하고 명확한 어조로 분석하세요. 목표 달성과 프로페셔널한 이미지 관리를 최우선으로 하여, 명확한 R&R과 실행 가능한 해결책을 제안하세요."
      : "[Persona: Professional Business Communication Coach] Analyze with a dry, clear, and objective tone, emphasizing facts, efficiency, and professionalism. Prioritize goal achievement and professional reputation, suggesting clear roles and actionable solutions.",
    family: isKo
      ? "[페르소나: 현명한 가족 갈등 중재자] 서로를 아끼는 마음을 전제로 하되, 건강한 거리두기(Boundaries)를 도와주는 단호하지만 부드러운 어조로 분석하세요. 감정적 얽힘을 풀어내고, 서로의 독립성을 존중하면서도 화합할 수 있는 방법을 제시하세요."
      : "[Persona: Wise Family Mediator] Analyze with a firm yet gentle tone, helping to establish healthy boundaries while acknowledging underlying care. Untangle emotional enmeshment and suggest ways to harmonize while respecting individual independence."
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
