/**
 * Componente EmptyState
 * Estado vazio padronizado com ícone e mensagem
 */

import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/app.constants";

interface EmptyStateProps {
  /** Mensagem principal */
  message: string;
  /** Mensagem secundária (opcional) */
  description?: string;
  /** Nome do ícone do Ionicons */
  icon?: keyof typeof Ionicons.glyphMap;
}

export function EmptyState({
  message,
  description,
  icon = "alert-circle-outline",
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-8">
      <Ionicons name={icon} size={64} color={COLORS.GRAY} />

      <Text className="text-gray-700 font-semibold text-lg mt-4 text-center">
        {message}
      </Text>

      {description && (
        <Text className="text-gray-500 text-base mt-2 text-center">
          {description}
        </Text>
      )}
    </View>
  );
}
