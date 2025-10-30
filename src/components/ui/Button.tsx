/**
 * Componente Button reutilizável
 * Padroniza botões com variantes, tamanhos e loading state
 */

import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { COLORS } from "../../constants/app.constants";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  /** Texto do botão */
  children: React.ReactNode;
  /** Callback ao pressionar */
  onPress: () => void;
  /** Variante visual do botão */
  variant?: ButtonVariant;
  /** Tamanho do botão */
  size?: ButtonSize;
  /** Estado de carregamento */
  loading?: boolean;
  /** Botão desabilitado */
  disabled?: boolean;
  /** Classes Tailwind adicionais */
  className?: string;
}

export function Button({
  children,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
}: ButtonProps) {
  // Estilos de variantes
  const variantStyles = {
    primary: "bg-[#2f855a] active:bg-[#276749]",
    secondary: "bg-gray-500 active:bg-gray-600",
    danger: "bg-red-600 active:bg-red-700",
    outline: "bg-transparent border-2 border-[#2f855a] active:bg-gray-50",
  };

  // Estilos de tamanho
  const sizeStyles = {
    sm: "py-2 px-4",
    md: "py-4 px-6",
    lg: "py-5 px-8",
  };

  // Estilos de texto
  const textVariantStyles = {
    primary: "text-white",
    secondary: "text-white",
    danger: "text-white",
    outline: "text-[#2f855a]",
  };

  const textSizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      testID="button-touchable"
      className={`
        rounded-lg items-center justify-center
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${isDisabled ? "opacity-50" : ""}
        ${className}
      `}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          testID="loading-indicator"
          color={variant === "outline" ? COLORS.PRIMARY : "white"}
        />
      ) : (
        <Text
          className={`
            font-semibold
            ${textVariantStyles[variant]}
            ${textSizeStyles[size]}
          `}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}
