import { GoogleGenAI } from "@google/genai";
import { CHEM_MASTER_SYSTEM_PROMPT } from "../constants";

export const analyzeChemicalQuery = async (query: string): Promise<string> => {
  try {
    // Try to get API key from localStorage first (for offline/exported use), then fallback to environment variable
    const savedKey = localStorage.getItem('gemini_api_key');
    const envKey1 = process.env.API_KEY;
    const envKey2 = process.env.GEMINI_API_KEY;
    
    const cleanKey = (k: string | undefined | null) => {
      if (!k || k === 'undefined' || k === 'null' || k === '""' || k === "''") return '';
      return k.trim();
    };

    const apiKey = cleanKey(savedKey) || cleanKey(envKey1) || cleanKey(envKey2);

    if (!apiKey) {
      throw new Error("API_KEY_MISSING");
    }

    // Initialize Gemini Client dynamically with the available key
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: CHEM_MASTER_SYSTEM_PROMPT,
        temperature: 0.2, // Low temperature for factual scientific data
      },
    });

    return response.text || "خطایی در دریافت پاسخ رخ داد. لطفاً مجدداً تلاش کنید.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message === "API_KEY_MISSING" || error.message?.includes("API key not valid")) {
      throw new Error("کلید API (API Key) یافت نشد یا نامعتبر است. لطفاً کلید خود را در تنظیمات وارد کنید.");
    }
    throw new Error("ارتباط با ChemMaster Pro برقرار نشد. لطفاً اتصال اینترنت و کلید API خود را بررسی کنید.");
  }
};