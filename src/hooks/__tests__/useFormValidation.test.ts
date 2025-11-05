import { renderHook, waitFor } from "@testing-library/react-native";
import { useFormValidation } from "../useFormValidation";
import * as yup from "yup";
import Logger from "../../lib/logger";

// Mock do Logger
jest.mock("../../lib/logger");

describe("useFormValidation", () => {
  const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    age: yup.number().required("Idade é obrigatória").min(18, "Idade mínima é 18"),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve inicializar sem erros", () => {
    const { result } = renderHook(() => useFormValidation(schema));

    expect(result.current.errors).toEqual({});
  });

  it("deve validar campo com sucesso", async () => {
    const { result } = renderHook(() => useFormValidation(schema));

    const isValid = await result.current.validateField("name", "João");

    expect(isValid).toBe(true);
    expect(result.current.errors).toEqual({});
  });

  it("deve adicionar erro quando validação falha", async () => {
    const { result } = renderHook(() => useFormValidation(schema));

    // validateAt precisa de um objeto completo com o campo
    const isValid = await result.current.validateField("name", "");

    expect(isValid).toBe(false);
    // Aguarda a atualização do estado
    await waitFor(() => {
      expect(result.current.errors.name).toBeDefined();
    });
    expect(result.current.errors.name).toBe("Nome é obrigatório");
  });

  it("deve remover erro quando campo é validado com sucesso após erro", async () => {
    const { result } = renderHook(() => useFormValidation(schema));

    // Primeiro falha
    await result.current.validateField("name", "");
    await waitFor(() => {
      expect(result.current.errors.name).toBe("Nome é obrigatório");
    });

    // Depois passa
    await result.current.validateField("name", "João");
    await waitFor(() => {
      expect(result.current.errors.name).toBeUndefined();
    });
  });

  it("deve validar formulário completo com sucesso", async () => {
    const { result } = renderHook(() => useFormValidation(schema));

    const data = {
      name: "João",
      email: "joao@example.com",
      age: 25,
    };

    const isValid = await result.current.validateForm(data);

    expect(isValid).toBe(true);
    expect(result.current.errors).toEqual({});
  });

  it("deve adicionar múltiplos erros quando validação falha", async () => {
    const { result } = renderHook(() => useFormValidation(schema));

    const data = {
      name: "",
      email: "invalid-email",
      age: 15,
    };

    const isValid = await result.current.validateForm(data);

    expect(isValid).toBe(false);
    // Aguarda a atualização dos erros
    await waitFor(() => {
      expect(result.current.errors.name).toBe("Nome é obrigatório");
      expect(result.current.errors.email).toBe("Email inválido");
      expect(result.current.errors.age).toBe("Idade mínima é 18");
    });
  });

  it("deve limpar todos os erros", async () => {
    const { result } = renderHook(() => useFormValidation(schema));

    // Adiciona erros através da validação
    await result.current.validateField("name", "");
    await waitFor(() => {
      expect(result.current.errors.name).toBeDefined();
    });

    result.current.clearErrors();
    // Aguarda a limpeza dos erros
    await waitFor(() => {
      expect(result.current.errors).toEqual({});
    });
  });

  it("deve limpar erro de campo específico", async () => {
    const { result } = renderHook(() => useFormValidation(schema));

    // Adiciona erros
    await result.current.validateField("name", "");
    await result.current.validateField("email", "");

    await waitFor(() => {
      expect(result.current.errors.name).toBeDefined();
      expect(result.current.errors.email).toBeDefined();
    });

    // Limpa apenas um campo
    result.current.clearError("name");

    // Aguarda a atualização do estado
    await waitFor(() => {
      expect(result.current.errors.name).toBeUndefined();
    });
    expect(result.current.errors.email).toBeDefined();
  });

  it("deve logar erro de validação", async () => {
    const { result } = renderHook(() => useFormValidation(schema));

    await result.current.validateField("name", "");

    expect(Logger.debug).toHaveBeenCalled();
  });
});

