import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import tailwind from "twrnc";
import { router } from "expo-router";
import logo from "../../../assets/logo.png";

export default function WelcomePage() {
  return (
    <View style={tailwind`h-full flex items-center justify-around`}>
      <View style={tailwind`flex items-center justify-center`}>
        <Image source={logo} style={tailwind`w-40 h-40`} />
        <Text style={tailwind`text-3xl font-bold`}>Bem vindo ao Muscle AI</Text>
        <Text style={tailwind`text-sm font-bold`}>
          Seu parceiro para geração de treinos
        </Text>
      </View>
      <Pressable
        style={tailwind`bg-green-900 h-16 w-2/4 `}
        onPress={() => {
          router.navigate("/signin");
        }}
      >
        <Text>Começe os treinos</Text>
      </Pressable>
    </View>
  );
}
