import { GoogleGenAI } from "@google/genai";
import { CHEM_MASTER_SYSTEM_PROMPT } from "../constants";

export const analyzeChemicalQuery = async (query: string): Promise<string> => {
  // Use a timeout to prevent hanging indefinitely
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("TIMEOUT")), 90000); // Increased to 90 seconds
  });

  try {
    // Priority: 1. LocalStorage (User provided) 2. Process Env (Platform provided) 3. Import Meta Env (Vite fallback)
    const savedKey = typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') : null;
    const apiKey = savedKey || process.env.GEMINI_API_KEY || ((import.meta as any).env && (import.meta as any).env.VITE_GEMINI_API_KEY);

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing. Please check your environment variables or settings.");
      throw new Error("GEMINI_API_KEY_MISSING");
    }

    // Initialize Gemini Client
    const ai = new GoogleGenAI({ apiKey: apiKey });

    console.log("Initiating Gemini analysis (PhD Level) for query:", query.substring(0, 50) + "...");

    const apiCall = ai.models.generateContent({
      model: 'gemini-3.1-pro-preview', // Using a more powerful model for PhD-level reasoning
      contents: [{ role: 'user', parts: [{ text: query }] }],
      config: {
        systemInstruction: CHEM_MASTER_SYSTEM_PROMPT,
        temperature: 0.1, // Lower temperature for more precise scientific output
      },
    });

    // Race the API call against the timeout
    const response = await Promise.race([apiCall, timeoutPromise]);

    if (!response || !response.text) {
      console.warn("Gemini returned an empty or invalid response:", response);
      return "متأسفانه پاسخی از موتور ChemMaster دریافت نشد. لطفاً مجدداً تلاش کنید.";
    }

    console.log("Analysis completed successfully.");
    return response.text;
  } catch (error: any) {
    console.error("Detailed Gemini Error:", error);
    
    if (error.message === "TIMEOUT") {
      throw new Error("زمان پاسخگویی ChemMaster به پایان رسید. ممکن است ترافیک سرور بالا باشد. لطفاً لحظاتی دیگر مجدداً تلاش کنید.");
    }

    if (error.message === "GEMINI_API_KEY_MISSING") {
      throw new Error("کلید API یافت نشد. لطفاً از بخش تنظیمات در بالای صفحه، کلید معتبر خود را وارد کنید یا با پشتیبانی تماس بگیرید.");
    }
    
    // Handle specific API errors
    const errorMessage = error.message || "";
    if (errorMessage.includes("API key not valid") || error.status === 403) {
      throw new Error("کلید API وارد شده معتبر نیست. لطفاً تنظیمات خود را بررسی کنید.");
    }

    if (errorMessage.includes("fetch failed") || errorMessage.includes("network")) {
      throw new Error("خطا در برقراری ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.");
    }

    if (errorMessage.includes("quota") || error.status === 429) {
      throw new Error("سهمیه استفاده از API به پایان رسیده است. لطفاً کمی صبر کنید و دوباره امتحان کنید.");
    }

    throw new Error("ارتباط با ChemMaster Pro برقرار نشد. لطفاً مجدداً تلاش کنید.");
  }
};
