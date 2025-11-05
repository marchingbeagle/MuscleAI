import { ErrorHandler, DatabaseError, ValidationError, NetworkError } from "../errorHandler";
import { Alert } from "react-native";
import Logger from "../logger";

// Mocks
jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

jest.mock("../logger");

describe("ErrorHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getErrorMessage", () => {
    it("deve retornar mensagem para DatabaseError", () => {
      const error = new DatabaseError("Erro no banco");
      const message = ErrorHandler.getErrorMessage(error);

      expect(message).toBe("Erro ao acessar o banco de dados. Tente novamente.");
    });

    it("deve retornar mensagem para ValidationError", () => {
      const error = new ValidationError("Dados inválidos");
      const message = ErrorHandler.getErrorMessage(error);

      expect(message).toBe("Dados inválidos");
    });

    it("deve retornar mensagem para NetworkError", () => {
      const error = new NetworkError("Erro de rede");
      const message = ErrorHandler.getErrorMessage(error);

      expect(message).toBe("Erro de conexão. Verifique sua internet.");
    });

    it("deve retornar mensagem de Error genérico", () => {
      const error = new Error("Erro genérico");
      const message = ErrorHandler.getErrorMessage(error);

      expect(message).toBe("Erro genérico");
    });

    it("deve retornar mensagem padrão para erro desconhecido", () => {
      const error = "string error";
      const message = ErrorHandler.getErrorMessage(error);

      expect(message).toBe("Ocorreu um erro inesperado. Tente novamente.");
    });

    it("deve retornar mensagem padrão para null", () => {
      const message = ErrorHandler.getErrorMessage(null);

      expect(message).toBe("Ocorreu um erro inesperado. Tente novamente.");
    });
  });

  describe("handle", () => {
    it("deve mostrar alerta e logar erro", () => {
      const error = new Error("Erro de teste");
      ErrorHandler.handle(error);

      expect(Logger.error).toHaveBeenCalledWith(
        "Erro capturado pelo ErrorHandler",
        error
      );
      expect(Alert.alert).toHaveBeenCalledWith("Erro", error.message);
    });

    it("deve usar mensagem customizada quando fornecida", () => {
      const error = new Error("Erro de teste");
      const customMessage = "Mensagem customizada";
      ErrorHandler.handle(error, customMessage);

      expect(Alert.alert).toHaveBeenCalledWith("Erro", customMessage);
    });

    it("deve tratar diferentes tipos de erro", () => {
      const dbError = new DatabaseError("Erro no banco");
      ErrorHandler.handle(dbError);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Erro",
        "Erro ao acessar o banco de dados. Tente novamente."
      );

      const validationError = new ValidationError("Dados inválidos");
      ErrorHandler.handle(validationError);

      expect(Alert.alert).toHaveBeenCalledWith("Erro", "Dados inválidos");
    });
  });

  describe("Custom Error Classes", () => {
    it("DatabaseError deve ter nome correto", () => {
      const error = new DatabaseError("Teste");
      expect(error.name).toBe("DatabaseError");
      expect(error.message).toBe("Teste");
    });

    it("ValidationError deve ter nome correto", () => {
      const error = new ValidationError("Teste");
      expect(error.name).toBe("ValidationError");
      expect(error.message).toBe("Teste");
    });

    it("NetworkError deve ter nome correto", () => {
      const error = new NetworkError("Teste");
      expect(error.name).toBe("NetworkError");
      expect(error.message).toBe("Teste");
    });
  });
});

