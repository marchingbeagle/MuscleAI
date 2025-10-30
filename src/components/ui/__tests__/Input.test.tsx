import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Input } from "../Input";

describe("Input", () => {
  it("deve renderizar com label correto", () => {
    const { getByText } = render(
      <Input label="Nome" value="" onChange={() => {}} />
    );

    expect(getByText("Nome")).toBeTruthy();
  });

  it("deve renderizar com valor correto", () => {
    const { getByDisplayValue } = render(
      <Input label="Nome" value="João Silva" onChange={() => {}} />
    );

    expect(getByDisplayValue("João Silva")).toBeTruthy();
  });

  it("deve chamar onChange quando texto é digitado", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <Input label="Nome" value="" onChange={onChangeMock} />
    );

    const input = getByTestId("input-field");
    fireEvent.changeText(input, "Novo Texto");

    expect(onChangeMock).toHaveBeenCalledWith("Novo Texto");
  });

  it("deve mostrar erro quando error prop é fornecido", () => {
    const { getByText } = render(
      <Input
        label="Email"
        value=""
        onChange={() => {}}
        error="Email inválido"
      />
    );

    expect(getByText("Email inválido")).toBeTruthy();
  });

  it("deve aplicar estilo de erro no input quando há erro", () => {
    const { getByTestId } = render(
      <Input
        label="Email"
        value=""
        onChange={() => {}}
        error="Email inválido"
      />
    );

    const input = getByTestId("input-field");
    expect(input.props.className).toContain("border-red-500");
  });

  it("não deve mostrar erro quando error não é fornecido", () => {
    const { queryByTestId } = render(
      <Input label="Nome" value="" onChange={() => {}} />
    );

    expect(queryByTestId("input-error")).toBeNull();
  });

  it("deve mostrar indicador de obrigatório quando required é true", () => {
    const { getByText } = render(
      <Input label="Nome" value="" onChange={() => {}} required />
    );

    expect(getByText("Nome *")).toBeTruthy();
  });

  it("deve aplicar type numeric corretamente", () => {
    const { getByTestId } = render(
      <Input label="Peso" value="" onChange={() => {}} type="numeric" />
    );

    const input = getByTestId("input-field");
    expect(input.props.keyboardType).toBe("numeric");
  });

  it("deve aplicar type email corretamente", () => {
    const { getByTestId } = render(
      <Input label="Email" value="" onChange={() => {}} type="email" />
    );

    const input = getByTestId("input-field");
    expect(input.props.keyboardType).toBe("email-address");
  });

  it("deve aplicar type password com secureTextEntry", () => {
    const { getByTestId } = render(
      <Input label="Senha" value="" onChange={() => {}} type="password" />
    );

    const input = getByTestId("input-field");
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("deve chamar onBlur quando campo perde foco", () => {
    const onBlurMock = jest.fn();
    const { getByTestId } = render(
      <Input label="Nome" value="" onChange={() => {}} onBlur={onBlurMock} />
    );

    const input = getByTestId("input-field");
    fireEvent(input, "blur");

    expect(onBlurMock).toHaveBeenCalled();
  });

  it("deve renderizar como multiline quando multiline é true", () => {
    const { getByTestId } = render(
      <Input label="Descrição" value="" onChange={() => {}} multiline />
    );

    const input = getByTestId("input-field");
    expect(input.props.multiline).toBe(true);
  });

  it("deve mostrar placeholder correto", () => {
    const { getByPlaceholderText } = render(
      <Input
        label="Nome"
        value=""
        onChange={() => {}}
        placeholder="Digite seu nome"
      />
    );

    expect(getByPlaceholderText("Digite seu nome")).toBeTruthy();
  });
});
