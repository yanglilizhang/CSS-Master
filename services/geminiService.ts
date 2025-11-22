import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const explainCSSConcept = async (property: string, value: string, context: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Explain the CSS property "${property}" with value "${value}" in the context of ${context}. 
      Keep the explanation concise (under 100 words). 
      Explain it simply for a beginner. 
      Output in Chinese (中文).`,
    });
    return response.text || "无法获取解释，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 服务暂时不可用。";
  }
};
