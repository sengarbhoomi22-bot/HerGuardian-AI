import api from "./api";

/**
 * Get AI response from the backend (Gemini API proxy)
 * @param {string} message - The user message
 * @returns {Promise<string>} The AI response
 */
export const getAIResponse = async (message) => {
  try {
    const response = await api.post("/ai/chat", { message });
    return response.data.message;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};
