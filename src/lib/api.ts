import { AnalysisRequest, AnalysisResult } from './types';
import { SYSTEM_PROMPT, getUserPrompt } from './prompts';

// Mock data generator for fallback
function getMockResult(mode: string, language: string = 'ko'): AnalysisResult {
  // ... (Keep existing mock data logic same as before) ...
  if (language === 'ko') {
    return {
      neutral_summary: {
        userA_claim: "사용자 A는 대화 중 자꾸 끊기는 것에 대해 불편함을 느끼고 있습니다.",
        userB_claim: "사용자 B는 필요한 문맥을 추가하려다 보니 말이 겹쳤다고 생각합니다.",
        issues: ["대화 스타일의 차이", "피드백을 주는 타이밍에 대한 이견"]
      },
      misunderstanding_points: [
        {
          quote: "니는 내 말 절대 안 듣잖아.",
          why_risky: "'절대', '항상' 같은 단정적인 표현은 상대방의 방어기제를 자극합니다.",
          neutral_reframe: "말이 끊길 때 내가 무시받는 기분이 들어서 속상해."
        }
      ],
      next_sentences: {
        soft: "네 의견도 중요하지만, 내가 하던 말을 끝까지 들어주면 더 잘 이해될 것 같아.",
        firm: "잠시만요, 제 말이 끝나면 말씀해 주세요.",
        short: "한 명씩 번갈아 가며 이야기하자."
      },
      rehearsal: {
        scenarioA: {
          partner_reply: "아니 내가 말을 끊으려는 게 아니라 도와주려는 거라니까!",
          recommended_answer: "도와주려는 마음은 고마워. 하지만 끝까지 들어주는 게 지금은 더 큰 도움이 될 것 같아."
        },
        scenarioB: {
          partner_reply: "알았어, 그럼 나 아무 말도 안 할게.",
          recommended_answer: "아예 말을 안 하라는 게 아니야. 내 말이 끝난 뒤에 너의 생각을 듣고 싶다는 뜻이야."
        }
      }
    };
  } else {
    // English Mock Data
    return {
      neutral_summary: {
        userA_claim: "User A is concerned about the frequency of interruptions.",
        userB_claim: "User B feels they are just adding necessary context.",
        issues: ["Communication style differences", "Timing of feedback"]
      },
      misunderstanding_points: [
        {
          quote: "You never listen to me.",
          why_risky: "Absolute language ('never') invites defensiveness.",
          neutral_reframe: "I feel unheard when I'm interrupted."
        }
      ],
      next_sentences: {
        soft: "I value your input, but I lose my train of thought when interrupted. Can we wait until I finish?",
        firm: "Please let me finish my sentence before responding.",
        short: "Let's take turns speaking."
      },
      rehearsal: {
        scenarioA: {
          partner_reply: "I'm not interrupting, I'm helping!",
          recommended_answer: "I understand you want to help, but it feels overwhelming to me."
        },
        scenarioB: {
          partner_reply: "Fine, I won't say anything then.",
          recommended_answer: "I want to hear your thoughts, just after I've expressed mine completely."
        }
      }
    };
  }
}

export async function analyzeConversation(request: AnalysisRequest): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("No GEMINI_API_KEY found, returning mock data.");
    await new Promise(resolve => setTimeout(resolve, 1500));
    return getMockResult(request.mode, request.language);
  }

  try {
    const prompt = getUserPrompt(request.mode, request.goal, request.conversation, request.language);
    
    let apiContent: any[] = [];
    
    // Add image if present (extract base64 data)
    if (request.image) {
       // Expecting "data:image/png;base64,..."
       const base64Data = request.image.split(',')[1]; 
       apiContent.push({
         inlineData: {
           mimeType: "image/jpeg", // Assuming jpeg/png, Gemini handles most
           data: base64Data
         }
       });
       
       // Add instruction for image analysis
       apiContent.push({
         text: SYSTEM_PROMPT + "\n\n" + 
               (request.language === 'ko' ? "이미지에 있는 대화 내용을 분석해주세요. " : "Analyze the conversation in the image. ") +
               getUserPrompt(request.mode, request.goal, request.conversation || "(See image)", request.language)
       });
    } else {
       // Text only
       apiContent.push({ text: SYSTEM_PROMPT + "\n\n" + prompt });
    }

    // Using gemini-2.5-flash as verified (Newest fast model)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: apiContent
        }],
        generationConfig: {
          response_mime_type: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Gemini API Error: ${response.status} ${response.statusText}`, errorBody);
      throw new Error(`Gemini API Error: ${response.statusText} (${errorBody})`);
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    
    // Parse JSON safely
    const parsedResult = JSON.parse(resultText);
    return parsedResult as AnalysisResult;

  } catch (error: any) {
    console.error("API Call failed", error);
    
    // If API Key exists but call failed, return error message
    if (apiKey) {
      return {
        neutral_summary: {
          userA_claim: "Error: API Call Failed",
          userB_claim: "Please check your API Key or Quota.",
          issues: [error.message || "Unknown Error"]
        },
        misunderstanding_points: [],
        next_sentences: { soft: "Error", firm: "Error", short: "Error" },
        rehearsal: {
          scenarioA: { partner_reply: "Error", recommended_answer: "Error" },
          scenarioB: { partner_reply: "Error", recommended_answer: "Error" }
        }
      };
    }

    return getMockResult(request.mode, request.language);
  }
}
