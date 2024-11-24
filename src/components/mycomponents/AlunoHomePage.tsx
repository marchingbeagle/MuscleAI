import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AlunoHomePage({
  nomeAluno,
  metaAluno,
}: {
  nomeAluno: string;
  metaAluno: string;
}) {
  const router = useRouter();

  const getMetaIcon = () => {
    switch (metaAluno) {
      case "Treino de Mobilidade e Flexibilidade":
        return "body-outline";
      case "Treino de Força":
        return "barbell-outline";
      case "Treino de Hipertrofia":
        return "fitness-outline";
      case "Treino de Resistência":
        return "timer-outline";
      case "Treino de Potência":
        return "flash-outline";
      default:
        return "fitness-outline";
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/treinos",
          params: {
            nomeAluno: nomeAluno,
            metaAluno: metaAluno,
          },
        })
      }
      className="p-4 bg-gray-50 rounded-xl"
    >
      <View className="items-center mb-2">
        <View className="items-center justify-center w-16 h-16 mb-2 bg-white rounded-full">
          <Ionicons name="person-outline" size={32} color="#2f855a" />
        </View>
        <Text className="text-base font-medium text-gray-800" numberOfLines={1}>
          {nomeAluno}
        </Text>
      </View>

      {metaAluno ? (
        <View className="flex-row items-center justify-center p-2 mt-2 bg-green-100 rounded-lg">
          <Ionicons name={getMetaIcon() as any} size={16} color="#2f855a" />
          <Text className="ml-1 text-xs text-green-800" numberOfLines={1}>
            {metaAluno.split(" ").slice(1).join(" ")}
          </Text>
        </View>
      ) : (
        <View className="flex-row items-center justify-center p-2 mt-2 bg-gray-100 rounded-lg">
          <Ionicons name="fitness-outline" size={16} color="#9ca3af" />
          <Text className="ml-1 text-xs text-gray-500">Sem meta definida</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
