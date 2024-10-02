import React from "react";
import { Input } from "../Input";

interface InputGreenProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
}

export default function InputGreen({
  value,
  setValue,
  placeholder,
}: InputGreenProps) {
  const [focusInput, setFocusInput] = React.useState(false);
  return (
    <Input
      autoCapitalize="none"
      value={value}
      placeholder={placeholder}
      onChangeText={(value) => setValue(value)}
      className={`bg-gray-100 border-2 ${
        focusInput ? "border-green-500" : "border-gray-300"
      } rounded-lg`}
      onFocus={() => setFocusInput(true)}
      onEndEditing={() => setFocusInput(false)}
    />
  );
}
