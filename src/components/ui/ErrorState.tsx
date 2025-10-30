/**
 * Componente ErrorState
 * Estado de erro padronizado
 */

import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/app.constants";
import { Button } from "./Button";

interface ErrorStateProps {
  /** Mensagem de erro */
  message: string;
  /** Callback para tentar novamente */
  onRetry?: () => void;
  /** Texto do botão de retry */
  retryText?: string;
}

export function ErrorState({
  message,
  onRetry,
  retryText = "Tentar novamente",
}: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-8">
      <Ionicons name="alert-circle" size={64} color={COLORS.DANGER} />

      <Text className="text-gray-700 font-semibold text-lg mt-4 text-center">
        Ops! Algo deu errado
      </Text>

      <Text className="text-gray-500 text-base mt-2 text-center">
        {message}
      </Text>

      {onRetry && (
        <Button onPress={onRetry} variant="primary" className="mt-6">
          {retryText}
        </Button>
      )}
    </View>
  );
}
