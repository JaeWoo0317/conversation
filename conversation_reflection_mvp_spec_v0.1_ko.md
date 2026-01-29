# 대화 리플렉션 웹앱 MVP 설계서 (커플/직장/가족 3모드)

- 버전: v0.1 (MVP)
- 작성일: 2026-01-29
- 범위: 웹앱(Next.js) + 서버 API(LLM 호출) + 선택 저장(Supabase)

---

## 1. 개요

**목표**  
사용자가 대화를 붙여넣으면 → 모드/목표를 고르고 → 아래 결과를 한 번에 받는다.

- **1장 리포트**
- **바로 쓸 문장 3개**(부드럽게/단호하게/짧게)
- **짧은 리허설 1턴**(상대 반응 2가지에 대한 답변)

**핵심 설계 원칙**  
- **공통 코어 엔진 1개** + **모드(규칙/톤/출력) 3개**(커플/직장/가족)
- 코어 엔진은 **입력/출력 JSON 계약**을 고정하여 UI/저장/테스트 안정화

---

## 2. MVP에서 반드시 되는 것 (Acceptance Criteria)

1) **텍스트 대화 입력(붙여넣기)**  
2) **모드 선택**: 커플/직장/가족  
3) **목표 선택**: 화해/설득/합의/피드백/경계설정  
4) **결과 출력**:
   - 중립 요약(각자 주장 1줄 + 쟁점 1~3개)
   - 오해 지점(해석 갈린 문장 + 왜 위험한지 + 중립 재진술)
   - “비난→요청” 변환 문장 3종(부드럽게/단호하게/짧게)
   - 리허설 1턴(상대 반응 2가지 + 추천 답변)

---

## 3. 추천 기술 스택

- **프론트/백엔드**: Next.js(App Router) + TypeScript
- **인증/DB**: Supabase(이메일 로그인 + Postgres)
- **AI 호출**: 서버(API Route)에서 LLM 호출
- **배포**: Vercel(웹+서버리스) / Supabase(DB)

**장점**  
하나의 Next.js 프로젝트에서 UI + API를 함께 운영하며, 인증/DB는 Supabase가 담당해 초기 구축 비용과 운영 난이도가 낮다.

---

## 4. UX(화면) 설계 — 3페이지

### 4.1 홈/입력 페이지 (/)
- 대화 입력창(붙여넣기)
- 모드 선택(커플/직장/가족)
- 목표 선택(버튼)
- 안내 문구: “민감정보(주민번호/계좌/주소 등)는 입력하지 마세요”
- 저장 토글: 기본 OFF(프라이버시 우선)

### 4.2 결과 리포트 페이지 (/result/[id])
- 핵심 요약 카드(각자 주장 1줄 + 쟁점)
- 오해 포인트 하이라이트(인용 + 중립 재진술)
- “다음 한 문장” 3개(복사 버튼)
- “리허설 시작” 버튼

### 4.3 리허설 페이지 (/rehearsal/[id] 혹은 /result/[id] 내 섹션)
- “상대가 이렇게 말했을 때” 2개 선택지
- 각 선택지에 대한 추천 답변 1~2문장

---

## 5. 데이터 모델(최소)

### 5.1 테이블
- `users` : Supabase Auth
- `reflections`
  - `id`, `user_id`(선택), `mode`, `goal`, `conversation_text`, `result_json`, `created_at`
- (옵션) `templates`(자주 쓰는 문장 저장), `stats`(패턴 집계)

**MVP 결론**  
`result_json`만 저장해도 충분하며, 패턴/통계는 2차 기능으로 확장한다.

---

## 6. 코어 엔진 입력/출력 계약 (JSON)

### 6.1 입력(JSON)
- `mode`: `couple | work | family`
- `goal`: `repair | persuade | agree | feedback | boundaries`
- `conversation`: 원문
- `tone_preference`: optional

### 6.2 출력(JSON) — MVP 최소 스키마
```json
{
  "neutral_summary": {
    "userA_claim": "…",
    "userB_claim": "…",
    "issues": ["…", "…"]
  },
  "misunderstanding_points": [
    {
      "quote": "…",
      "why_risky": "…",
      "neutral_reframe": "…"
    }
  ],
  "next_sentences": {
    "soft": "…",
    "firm": "…",
    "short": "…"
  },
  "rehearsal": {
    "scenarioA": {
      "partner_reply": "…",
      "recommended_answer": "…"
    },
    "scenarioB": {
      "partner_reply": "…",
      "recommended_answer": "…"
    }
  }
}
```

---

## 7. 모드(3개) 정의 — 룰/톤/출력 차이

### 7.1 커플/부부 갈등 회복 (mode=couple)
- 목표 흐름: 감정 수습 → 안전감 회복 → 작은 요청(구체)
- 금지: 단정/비난(“항상/절대/네가 문제”) → “나는 …해서 …이 필요해”로 전환
- 출력 강조: 공감/확인, 사과(인정+영향+다음 행동), 합의 문장

### 7.2 직장 대화 (mode=work)
- 목표 흐름: 사실(관찰) → 영향 → 요청(대안 포함)
- 톤: 전문적/간결/공격성 금지
- 출력 강조: 설득용 1분 피치, 반론 대비, 피드백 템플릿

### 7.3 가족/부모-자녀 (mode=family)
- 목표 흐름: 통제 싸움↓, 신뢰/경계↑
- 금지: 수치심 유발/훈계 과다 → 행동/규칙/선택지 중심
- 출력 강조: 멈춤-재개 문장, 가족 합의문 초안, 경계 설정

---

## 8. 안전/신뢰 설계(초기 필수)

- **치료/진단/상담처럼 말하지 않기**: “커뮤니케이션 코치/리플렉션 도구”로 톤 고정
- **위기 신호(자해 등) 감지 시**: 즉시 안전 안내 + 도움 자원 유도(지역 긴급전화/주변 도움)
- **프라이버시 기본값**: 저장 OFF(또는 익명 저장) + 삭제 버튼 노출
- **단정 금지**: “가능한 해석”으로 제시 + 사용자가 수정 가능하도록 안내

---

## 9. 구현 순서(웹앱 제작 플랜)

### Step 1) 프로젝트 스캐폴딩
- Next.js + Supabase Auth 연결
- 라우트: `/` 입력, `/result/[id]` 결과

### Step 2) 분석 API 만들기
- `POST /api/analyze`
  - 입력 검증(모드/목표/길이 제한)
  - LLM 호출
  - JSON 스키마 파싱/검증
  - (옵션) 저장 후 결과 id 반환

### Step 3) 결과 UI 렌더링
- `result_json`을 카드 형태로 출력
- 복사 UX(soft/firm/short)

### Step 4) 리허설(2분기)
- scenario A/B 선택 → 추천 답변 표시

### Step 5) 품질 안정화
- 프롬프트에 중립/비난 금지/구체 요청 유도/모드 룰 고정
- JSON 파싱 실패 시 자동 복구(재시도/정형 출력)

---

## 10. 다음에 만들 파일(구현 산출물 제안)

- `directives/conversation_reflection_mvp.md` : SOP(목표/입력/출력/테스트/엣지케이스)
- `src/app/api/analyze/route.ts` : 분석 API
- `src/lib/reflection/schema.ts` : JSON 스키마
- `src/lib/reflection/prompts.ts` : 모드/목표별 프롬프트
- `src/app/page.tsx` : 입력 페이지
- `src/app/result/[id]/page.tsx` : 결과 페이지

---

## 11. 체크리스트(출시 전)

- [ ] 입력 길이 제한/에러 메시지
- [ ] 저장 기본 OFF
- [ ] 위험 신호 감지 시 안내 노출
- [ ] 결과 JSON 스키마 검증 통과율 ≥ 99%
- [ ] 결과 문장 “복사→전송”이 자연스럽게 읽히는지 QA
