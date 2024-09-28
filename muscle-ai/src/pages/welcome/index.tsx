import { View, Text } from "react-native";
import React from "react";
import { Button as ButtonAtom } from "@/components/button";
import tailwind from "twrnc";

export default function WelcomePage() {
  const onPressStartTraining = () => {
    alert("Working on the weekend like usual");
  };

  return (
    <View style={tailwind`h-full flex items-center justify-around`}>
      <Text style={tailwind`text-3xl font-bold`}>Bem vindo ao Muscle AI</Text>
      <ButtonAtom
        text="Começe os treinos"
        onPress={onPressStartTraining}
        style={tailwind`bg-green-900`}
      />
    </View>
  );
}
