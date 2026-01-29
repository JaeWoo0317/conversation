export type Language = 'ko' | 'en';

export const dictionaries = {
  ko: {
    title: '대화 리플렉션 도구',
    subtitle: '대화를 분석하고, 회고하여 더 나은 소통을 만들어보세요',
    modeLabel: '모드 (Mode)',
    goalLabel: '목표 (Goal)',
    conversationLabel: '대화 내용 (Conversation)',
    conversationPlaceholder: '여기에 대화 내용을 붙여넣으세요...',
    imageLabel: '또는 스크린샷 업로드',
    imageButton: '이미지 선택',
    removeImage: '삭제',
    analyzeButton: '대화 분석하기',
    analyzingButton: '분석 중입니다...',
    privacyNote: '대화 내용은 안전하게 처리됩니다. 민감한 개인정보는 제외하고 입력해주세요.',
    modes: {
      couple: '커플 / 부부 (관계 회복)',
      work: '직장 / 비즈니스 (전문성)',
      family: '가족 / 부모-자녀 (존중과 경계)'
    },
    goals: {
      repair: '관계 회복 / 화해',
      persuate: '설득 / 주장',
      agree: '합의 / 타협점 찾기',
      feedback: '피드백 주기',
      boundaries: '경계 설정 / 거절하기'
    },
    result: {
      backLink: '← 다른 대화 분석하기',
      title: '분석 리포트',
      summaryTitle: '중립적 요약 (Neutral Summary)',
      userA: 'A의 주장:',
      userB: 'B의 주장:',
      issues: '핵심 쟁점:',
      misunderstandingTitle: '오해의 소지가 있는 표현',
      whyRisky: '위험한 이유:',
      reframe: '이렇게 바꿔보세요:',
      nextSentencesTitle: '추천 답변 (Next Sentences)',
      soft: '부드럽게 / 공감',
      firm: '단호하게 / 경계 설정',
      short: '짧고 간결하게',
      copy: '복사',
      copied: '복사되었습니다!',
      rehearsalTitle: '미니 리허설 (Rehearsal)',
      scenarioA: '상대가 방어적으로 나올 때:',
      scenarioB: '상대가 회피하거나 무시할 때:',
      partnerReply: '상대 반응:',
      recommendation: '추천 대응:'
    },
    limitModal: {
      title: '일일 무료 분석 한도 초과',
      message: '하루에 한 번만 무료로 분석할 수 있습니다.\n로그인하면 무제한으로 이용하실 수 있어요!',
      loginButton: '로그인하고 계속하기',
      cancelButton: '닫기'
    }
  },
  en: {
    title: 'Conversation Reflection',
    subtitle: 'Analyze, reflect, and improve your communication',
    modeLabel: 'Mode',
    goalLabel: 'Goal',
    conversationLabel: 'Conversation',
    conversationPlaceholder: 'Enter conversation text here...',
    imageLabel: 'Or Upload Screenshot',
    imageButton: 'Choose Image',
    removeImage: 'Remove',
    analyzeButton: 'Analyze Conversation',
    analyzingButton: 'Analyzing...',
    privacyNote: 'Your conversation is processed securely. Please remove sensitive personal information.',
    modes: {
      couple: 'Couple / Relationship',
      work: 'Workplace / Professional',
      family: 'Family / Parent-Child'
    },
    goals: {
      repair: 'Repair Relationship',
      persuate: 'Persuade / Convince',
      agree: 'Reach Agreement',
      feedback: 'Give Feedback',
      boundaries: 'Set Boundaries'
    },
    result: {
      backLink: '← Analyze another conversation',
      title: 'Reflection Report',
      summaryTitle: 'Neutral Summary',
      userA: "User A's perspective:",
      userB: "User B's perspective:",
      issues: 'Key Issues:',
      misunderstandingTitle: 'Misunderstanding Points',
      whyRisky: "Why it's risky:",
      reframe: 'Try instead:',
      nextSentencesTitle: 'Recommended Next Sentences',
      soft: 'Soft / Gentle',
      firm: 'Firm / Boundary',
      short: 'Short / Neutral',
      copy: 'Copy',
      copied: 'Copied to clipboard!',
      rehearsalTitle: 'Mini Rehearsal',
      scenarioA: 'If they react with defensiveness:',
      scenarioB: 'If they react with avoidance:',
      partnerReply: 'They say:',
      recommendation: 'You say:'
    },
    limitModal: {
      title: 'Daily Limit Reached',
      message: 'You can only use the free analysis once per day.\nLog in to unlock unlimited access!',
      loginButton: 'Log In to Continue',
      cancelButton: 'Close'
    }
  }
};
