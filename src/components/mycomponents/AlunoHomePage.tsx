import { View, Text } from "react-native";
import React from "react";

interface Aluno {
  nm_aluno: string;
}

export default function AlunoHomePage({ item }: { item: Aluno }) {
  return (
    <View className="flex flex-col items-center justify-center basis-1/5">
      <View className="h-12 w-12 rounded-full bg-[#1e5f3f]"></View>
      <Text className="font-bold text-[#6b7280] text-base text-center leading-5">
        {item.nm_aluno}
      </Text>
    </View>
  );
}
