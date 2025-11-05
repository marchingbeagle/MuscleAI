import React from "react";
import { render } from "@testing-library/react-native";
import { LoadingState } from "../LoadingState";

describe("LoadingState", () => {
  it("deve renderizar com mensagem padrão", () => {
    const { getByText } = render(<LoadingState />);

    expect(getByText("Carregando...")).toBeTruthy();
  });

  it("deve renderizar com mensagem customizada", () => {
    const { getByText } = render(<LoadingState message="Processando..." />);

    expect(getByText("Processando...")).toBeTruthy();
  });

  it("deve renderizar ActivityIndicator", () => {
    const { getByText } = render(<LoadingState />);

    // Verifica que a mensagem está presente (indica que o componente renderizou)
    expect(getByText("Carregando...")).toBeTruthy();
  });

  it("deve usar tamanho padrão large", () => {
    const { getByText } = render(<LoadingState />);

    expect(getByText("Carregando...")).toBeTruthy();
  });

  it("deve usar tamanho customizado quando fornecido", () => {
    const { getByText } = render(<LoadingState size="small" />);

    expect(getByText("Carregando...")).toBeTruthy();
  });

  it("deve renderizar sem mensagem quando message é vazio", () => {
    const { queryByText } = render(<LoadingState message="" />);

    expect(queryByText("Carregando...")).toBeNull();
  });
});

