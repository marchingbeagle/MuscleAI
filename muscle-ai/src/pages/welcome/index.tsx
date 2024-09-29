import { View, Text, Image } from "react-native";
import React from "react";
import { Button as ButtonAtom } from "@/components/button";
import tailwind from "twrnc";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigationTypes";
import logo from "@/assets/logo.png";

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;
export default function WelcomePage() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const onPressStartTraining = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={tailwind`h-full flex items-center justify-around`}>
      <View style={tailwind`flex items-center justify-center`}>
        <Image source={logo} style={tailwind`w-40 h-40`} />
        <Text style={tailwind`text-3xl font-bold`}>Bem vindo ao Muscle AI</Text>
        <Text style={tailwind`text-sm font-bold`}>
          Seu parceiro para geração de treinos
        </Text>
      </View>
      <ButtonAtom
        text="Começe os treinos"
        onPress={onPressStartTraining}
        style={tailwind`bg-green-900 h-16 w-2/4 `}
      />
    </View>
  );
}
