import axios from "axios";
import { generateWorkout } from "../gemini";
import { ENV } from "../../constants/environment";
import Logger from "../../lib/logger";

// Mocks
jest.mock("axios");
jest.mock("../../constants/environment", () => ({
  ENV: {
    GEMINI_API_URL: "https://api.gemini.com/v1",
    GEMINI_API_KEY: "test-api-key",
  },
}));
jest.mock("../../lib/logger");

describe("generateWorkout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve gerar treino com sucesso", async () => {
    const mockResponse = {
      data: {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: "Treino gerado com sucesso",
                },
              ],
            },
          },
        ],
      },
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const prompt = "Gere um treino de peito";
    const result = await generateWorkout(prompt);

    expect(result).toBe("Treino gerado com sucesso");
    expect(axios.post).toHaveBeenCalledWith(
      `${ENV.GEMINI_API_URL}?key=${ENV.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(Logger.debug).toHaveBeenCalled();
  });

  it("deve retornar mensagem padrão quando não há resposta", async () => {
    const mockResponse = {
      data: {
        candidates: [],
      },
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await generateWorkout("Teste");

    expect(result).toBe("Nenhuma resposta gerada.");
  });

  it("deve retornar mensagem padrão quando estrutura de resposta está incompleta", async () => {
    const mockResponse = {
      data: {},
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await generateWorkout("Teste");

    expect(result).toBe("Nenhuma resposta gerada.");
  });

  it("deve tratar erro ao gerar treino", async () => {
    const error = {
      response: {
        data: {
          error: "Erro na API",
        },
      },
    };

    (axios.post as jest.Mock).mockRejectedValue(error);

    await expect(generateWorkout("Teste")).rejects.toThrow(
      "Não foi possível gerar o treino."
    );

    expect(Logger.error).toHaveBeenCalled();
  });

  it("deve tratar erro sem response", async () => {
    const error = new Error("Erro de rede");

    (axios.post as jest.Mock).mockRejectedValue(error);

    await expect(generateWorkout("Teste")).rejects.toThrow(
      "Não foi possível gerar o treino."
    );

    expect(Logger.error).toHaveBeenCalled();
  });

  it("deve logar debug antes e depois da requisição", async () => {
    const mockResponse = {
      data: {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: "Treino gerado",
                },
              ],
            },
          },
        ],
      },
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    await generateWorkout("Teste");

    expect(Logger.debug).toHaveBeenCalledTimes(2);
    expect(Logger.debug).toHaveBeenNthCalledWith(
      1,
      "Enviando prompt para a API do Gemini",
      { prompt: "Teste" }
    );
    expect(Logger.debug).toHaveBeenNthCalledWith(
      2,
      "Resposta da API do Gemini recebida",
      { hasResponse: true }
    );
  });
});

