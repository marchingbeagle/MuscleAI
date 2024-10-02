import React from "react";
import { View, Text, Image } from "react-native";
import { router } from "expo-router";
import { Button } from "src/components/Button";
import logo from "../../../assets/logo.png";

export default function WelcomePage() {
  return (
    <View className="flex items-center justify-around h-full">
      <View className="flex items-center justify-center">
        <Image source={logo} className="w-40 h-40" />
        <Text className="text-3xl font-bold">Bem vindo ao Muscle AI</Text>
        <Text className="text-sm font-bold">
          Seu parceiro para geração de treinos
        </Text>
      </View>
      <Button
        label="Começe os treinos"
        onPress={() => {
          router.navigate("/signin");
        }}
      />
    </View>
  );
}
