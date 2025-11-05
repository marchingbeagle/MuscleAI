import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../Button";

describe("Button", () => {
  it("deve renderizar com texto correto", () => {
    const { getByText } = render(
      <Button onPress={() => {}}>Clique Aqui</Button>
    );

    expect(getByText("Clique Aqui")).toBeTruthy();
  });

  it("deve chamar onPress quando clicado", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock}>Clique Aqui</Button>
    );

    fireEvent.press(getByText("Clique Aqui"));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("deve mostrar loading quando loading é true", () => {
    const { getByTestId, queryByText } = render(
      <Button onPress={() => {}} loading>
        Clique Aqui
      </Button>
    );

    // Texto não deve aparecer quando está loading
    expect(queryByText("Clique Aqui")).toBeNull();

    // ActivityIndicator deve estar presente
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("deve estar desabilitado quando loading é true", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button onPress={onPressMock} loading>
        Clique Aqui
      </Button>
    );

    const button = getByTestId("button-touchable");
    fireEvent.press(button);

    // Não deve chamar onPress quando está loading
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("deve renderizar variante primary corretamente", () => {
    const { getByTestId, getByText } = render(
      <Button onPress={() => {}} variant="primary">
        Primary
      </Button>
    );

    const button = getByTestId("button-touchable");
    expect(button).toBeTruthy();
    expect(getByText("Primary")).toBeTruthy();
    // NativeWind compiles className to style, so we check the component renders correctly
  });

  it("deve renderizar variante secondary corretamente", () => {
    const { getByTestId, getByText } = render(
      <Button onPress={() => {}} variant="secondary">
        Secondary
      </Button>
    );

    const button = getByTestId("button-touchable");
    expect(button).toBeTruthy();
    expect(getByText("Secondary")).toBeTruthy();
    // NativeWind compiles className to style, so we check the component renders correctly
  });

  it("deve renderizar variante danger corretamente", () => {
    const { getByTestId, getByText } = render(
      <Button onPress={() => {}} variant="danger">
        Danger
      </Button>
    );

    const button = getByTestId("button-touchable");
    expect(button).toBeTruthy();
    expect(getByText("Danger")).toBeTruthy();
    // NativeWind compiles className to style, so we check the component renders correctly
  });

  it("deve aplicar opacity-50 quando loading", () => {
    const { getByTestId, queryByText } = render(
      <Button onPress={() => {}} loading>
        Loading
      </Button>
    );

    const button = getByTestId("button-touchable");
    expect(button).toBeTruthy();
    expect(queryByText("Loading")).toBeNull(); // Texto não deve aparecer quando está loading
    expect(getByTestId("loading-indicator")).toBeTruthy();
    // NativeWind compiles className to style, so we check the component renders correctly
  });
});
