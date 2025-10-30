/**
 * Componente LoadingState
 * Estado de carregamento padronizado
 */

import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { COLORS } from "../../constants/app.constants";

interface LoadingStateProps {
  /** Mensagem opcional */
  message?: string;
  /** Tamanho do indicador */
  size?: "small" | "large";
  /** Cor do indicador */
  color?: string;
}

export function LoadingState({
  message = "Carregando...",
  size = "large",
  color = COLORS.PRIMARY,
}: LoadingStateProps) {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-4">
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text className="text-gray-600 mt-4 text-base">{message}</Text>
      )}
    </View>
  );
}
