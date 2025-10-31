import axios from 'axios';
import { ENV } from '../constants/environment';
import Logger from '../lib/logger';

export const generateWorkout = async (prompt: string): Promise<string> => {
  try {
    Logger.debug('Enviando prompt para a API do Gemini', { prompt });
    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    // Enviando a requisição para a API do Gemini
    const response = await axios.post(`${ENV.GEMINI_API_URL}?key=${ENV.GEMINI_API_KEY}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    Logger.debug('Resposta da API do Gemini recebida', {
      hasResponse: !!response.data,
    });

    // Extraindo o texto gerado
    const generatedText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Nenhuma resposta gerada.';
    return generatedText;
  } catch (error: any) {
    Logger.error('Erro ao gerar treino na API do Gemini', error.response?.data || error);
    throw new Error('Não foi possível gerar o treino.');
  }
};
