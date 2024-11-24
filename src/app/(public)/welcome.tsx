import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../assets/logo.png";

export default function Welcome() {
  return (
    <View className="flex-1 bg-white">
      <View className="items-center justify-between flex-1 px-6 py-12">
        <View className="items-center mt-12">
          <Image source={logo} className="w-48 h-48 mb-8" />
          <Text className="text-3xl font-bold text-[#2f855a] text-center mb-2">
            Bem vindo ao Muscle AI
          </Text>
          <Text className="text-lg text-center text-gray-600">
            Seu parceiro para geração de treinos
          </Text>
        </View>

        <View className="w-full space-y-4">
          <View className="flex-row items-center p-4 bg-gray-50 rounded-xl">
            <View className="w-10 h-10 items-center justify-center bg-[#2f855a] rounded-full">
              <Ionicons name="fitness" size={24} color="white" />
            </View>
            <Text className="flex-1 ml-4 font-medium text-gray-800">
              Treinos Personalizados com IA
            </Text>
          </View>

          <View className="flex-row items-center p-4 bg-gray-50 rounded-xl">
            <View className="w-10 h-10 items-center justify-center bg-[#2f855a] rounded-full">
              <Ionicons name="people" size={24} color="white" />
            </View>
            <Text className="flex-1 ml-4 font-medium text-gray-800">
              Gerencie seus alunos
            </Text>
          </View>
        </View>

        <View className="w-full px-6">
          <TouchableOpacity
            onPress={() => router.navigate("/signin")}
            className="w-full bg-[#2f855a] py-4 rounded-xl"
          >
            <Text className="text-lg font-bold text-center text-white">
              Começar os treinos
            </Text>
          </TouchableOpacity>

          <Text className="mt-4 text-center text-gray-500">
            Faça login para continuar
          </Text>
        </View>
      </View>
    </View>
  );
}
