import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useClerk } from "@clerk/clerk-expo";

export default function Home() {
  const { signOut } = useClerk();
  return (
    <View className="p-6">
      <View className="flex-row items-center gap-2">
        <View className="h-12 w-12 rounded-full bg-[#2f855a]" />
        <Text className="text-base font-bold text-[#2f855a]">
          Olá! Gabriel Rodrigues
        </Text>
      </View>

      <Text className="text-lg font-bold text-[#6b7280] py-4">
        Opções de Treino:
      </Text>
      <View className="flex-row flex-wrap gap-4">
        <TouchableOpacity className="bg-[#38a169] rounded-xl h-16 w-full flex items-center justify-center">
          <Text className="font-bold text-white text-base">
            Treino de Mobilidade e Flexibilidade
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#38a169] rounded-xl h-16 w-full flex items-center justify-center">
          <Text className="font-bold text-white text-base">
            Treino de Força Muscular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#38a169] rounded-xl h-16 w-full flex items-center justify-center">
          <Text className="font-bold text-white text-base">
            Treino Funcional
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#38a169] rounded-xl h-16 w-full flex items-center justify-center">
          <Text className="font-bold text-white text-base">
            Treino de Cardio Leve
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-lg font-bold text-[#6b7280] py-4">
        Alunos Recentes:
      </Text>
      <View className="flex-row flex-wrap justify-between gap-4">
        <View className="flex-col flex justify-center items-center basis-1/5">
          <View className="h-12 w-12 rounded-full bg-[#1e5f3f]"></View>
          <Text className="font-bold text-[#35383f] text-base text-center leading-5">
            Gabriel de Oliveira
          </Text>
        </View>
        <View className="flex-col flex justify-center items-center basis-1/5">
          <View className="h-12 w-12 rounded-full bg-[#1e5f3f]"></View>
          <Text className="font-bold text-[#35383f] text-base text-center leading-5">
            Erik Schenairder
          </Text>
        </View>
        <View className="flex-col flex justify-center items-center basis-1/5">
          <View className="h-12 w-12 rounded-full bg-[#1e5f3f]"></View>
          <Text className="font-bold text-[#35383f] text-base text-center leading-5">
            Gabriel William
          </Text>
        </View>
        <View className="flex-col flex justify-center items-center basis-1/5">
          <View className="h-12 w-12 rounded-full bg-[#1e5f3f]"></View>
          <Text className="font-bold text-[#35383f] text-base text-center leading-5">
            Raul Castro
          </Text>
        </View>
      </View>
    </View>
  );
}
