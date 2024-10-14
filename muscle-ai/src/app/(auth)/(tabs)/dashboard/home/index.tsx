import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useClerk } from "@clerk/clerk-expo";

export default function Home() {
  const { signOut } = useClerk();
  return (
    <View className="p-6">
      <View className="flex-row items-center gap-2">
        <View className="h-12 w-12 rounded-full bg-[#2f855a]"/>
        <Text className="text-base font-bold text-[#2f855a]">
          Olá! Gabriel Rodrigues
        </Text>
      </View>

      <Text className="text-lg font-bold text-[#6b7280] py-4">
        Opções de Treino
      </Text>

      <View className="flex-row flex-wrap gap-4">
        <TouchableOpacity className="bg-[#38a169] rounded-xl h-16 w-full" />
        <TouchableOpacity className="bg-[#38a169] rounded-xl h-16 w-full" />
        <TouchableOpacity className="bg-[#38a169] rounded-xl h-16 w-full" />
        <TouchableOpacity className="bg-[#38a169] rounded-xl h-16 w-full" />
      </View>
    </View>
  );
}