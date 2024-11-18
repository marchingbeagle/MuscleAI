import axios from "axios";
import { API_GEMINI } from "@env"; // Importa a variável do .env

// Endpoint correto baseado no exemplo cURL
const GEMINI_API_URL =
"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

/**
 * Gera um plano de treino personalizado utilizando a API do Gemini.
 * @param prompt O texto que será enviado para a IA.
 * @returns O treino gerado pela IA.
 */
export const generateWorkout = async (prompt: string): Promise<string> => {
  try {
    console.log("Enviando prompt para a API do Gemini:", prompt);
    // Payload baseado no exemplo cURL
    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt, // Texto enviado para a IA
            },
          ],
        },
      ],
    };

    // Enviando a requisição para a API do Gemini
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${API_GEMINI}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Resposta da API do Gemini:", response.data);

    // Extraindo o texto gerado
    const generatedText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Nenhuma resposta gerada.";
    return generatedText;
  } catch (error: any) {
    console.error(
      "Erro ao gerar treino na API do Gemini:",
      error.response?.data || error.message
    );
    throw new Error("Não foi possível gerar o treino.");
  }
};