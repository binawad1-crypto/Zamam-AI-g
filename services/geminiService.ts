
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  // Store chat history to maintain context across calls since we recreate the AI instance
  private chatHistory: any[] = [];

  // Helper to get a fresh instance of GoogleGenAI
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  /**
   * Generates text content using the Gemini model.
   * @param prompt The user's input prompt.
   */
  async generateText(prompt: string): Promise<string> {
    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      // Extract text output from GenerateContentResponse
      return response.text || "No response received";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while communicating with the AI.";
    }
  }

  /**
   * Sends a message in a chat session and returns the response.
   * History is maintained manually to support recreating the AI instance for each call.
   * @param message The user's message.
   */
  async sendMessage(message: string): Promise<string> {
    try {
      const ai = this.getAI();
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: "You are a helpful AI assistant for a business platform called Zamam.",
        },
        history: this.chatHistory,
      });

      const result = await chat.sendMessage({ message: message });
      const responseText = result.text || "";

      // Update local history for the next call
      this.chatHistory.push({ role: 'user', parts: [{ text: message }] });
      this.chatHistory.push({ role: 'model', parts: [{ text: responseText }] });

      return responseText;
    } catch (error) {
      console.error("Chat Error:", error);
      return "Sorry, I couldn't process that message.";
    }
  }
}

export const gemini = new GeminiService();
