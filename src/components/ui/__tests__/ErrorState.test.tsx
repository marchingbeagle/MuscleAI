import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ErrorState } from "../ErrorState";

describe("ErrorState", () => {
  it("deve renderizar com mensagem de erro", () => {
    const { getByText } = render(
      <ErrorState message="Erro ao carregar dados" />
    );

    expect(getByText("Ops! Algo deu errado")).toBeTruthy();
    expect(getByText("Erro ao carregar dados")).toBeTruthy();
  });

  it("deve renderizar botão de retry quando onRetry for fornecido", () => {
    const onRetryMock = jest.fn();
    const { getByText } = render(
      <ErrorState message="Erro ao carregar dados" onRetry={onRetryMock} />
    );

    const retryButton = getByText("Tentar novamente");
    expect(retryButton).toBeTruthy();

    fireEvent.press(retryButton);
    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });

  it("não deve renderizar botão de retry quando onRetry não for fornecido", () => {
    const { queryByText } = render(
      <ErrorState message="Erro ao carregar dados" />
    );

    expect(queryByText("Tentar novamente")).toBeNull();
  });

  it("deve usar texto customizado de retry quando fornecido", () => {
    const onRetryMock = jest.fn();
    const { getByText } = render(
      <ErrorState
        message="Erro ao carregar dados"
        onRetry={onRetryMock}
        retryText="Recarregar"
      />
    );

    const retryButton = getByText("Recarregar");
    expect(retryButton).toBeTruthy();

    fireEvent.press(retryButton);
    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });
});

