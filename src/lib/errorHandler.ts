/**
 * Sistema centralizado de tratamento de erros
 * Classes de erro customizadas e handler com mensagens amigáveis
 */

import { Alert } from "react-native";
import Logger from "./logger";

/**
 * Erro relacionado ao banco de dados
 */
export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

/**
 * Erro de validação de dados
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Erro de conexão de rede
 */
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

/**
 * Handler centralizado de erros
 */
export class ErrorHandler {
  /**
   * Manipula erro mostrando mensagem ao usuário e registrando log
   */
  static handle(error: unknown, customMessage?: string) {
    Logger.error("Erro capturado pelo ErrorHandler", error);

    const message = customMessage || this.getErrorMessage(error);
    Alert.alert("Erro", message);
  }

  /**
   * Retorna mensagem amigável baseada no tipo de erro
   */
  static getErrorMessage(error: unknown): string {
    if (error instanceof DatabaseError) {
      return "Erro ao acessar o banco de dados. Tente novamente.";
    }

    if (error instanceof ValidationError) {
      return error.message;
    }

    if (error instanceof NetworkError) {
      return "Erro de conexão. Verifique sua internet.";
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Ocorreu um erro inesperado. Tente novamente.";
  }
}
