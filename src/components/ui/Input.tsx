/**
 * Componente Input reutilizável
 * Input com label, validação visual e mensagem de erro
 */

import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";

interface InputProps extends Omit<TextInputProps, "onChange" | "value"> {
  /** Label do input */
  label: string;
  /** Valor atual */
  value: string;
  /** Callback de mudança */
  onChange: (value: string) => void;
  /** Mensagem de erro */
  error?: string;
  /** Placeholder */
  placeholder?: string;
  /** Tipo de input */
  type?: "text" | "email" | "password" | "numeric";
  /** Classes adicionais */
  className?: string;
  /** Campo obrigatório */
  required?: boolean;
  /** Validação ao perder foco */
  onBlur?: () => void;
}

export function Input({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  className = "",
  required = false,
  onBlur,
  ...rest
}: InputProps) {
  // Configurações por tipo
  const typeConfig = {
    text: {},
    email: {
      keyboardType: "email-address" as const,
      autoCapitalize: "none" as const,
    },
    password: { secureTextEntry: true },
    numeric: { keyboardType: "numeric" as const },
  };

  return (
    <View className={`mb-4 ${className}`}>
      {/* Label */}
      <Text className="text-gray-700 font-semibold mb-2 text-base">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>

      {/* Input */}
      <TextInput
        testID="input-field"
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`
          border rounded-lg p-4 text-base bg-white
          ${error ? "border-red-500" : "border-gray-300"}
        `}
        placeholderTextColor="#9ca3af"
        {...typeConfig[type]}
        {...rest}
      />

      {/* Mensagem de erro */}
      {error && (
        <Text testID="input-error" className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}
