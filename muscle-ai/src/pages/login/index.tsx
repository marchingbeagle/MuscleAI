import React, { useState } from "react";
import tailwind from "twrnc";
import { View, Text, TouchableOpacity, TextInput, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button as ButtonAtom } from "@/components/button";
import { prismaClient } from "@/services/db";
import Icon from "react-native-vector-icons/Ionicons";
import RNBcrypt from "react-native-bcrypt";
import { RootStackParamList } from "@/types/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function LoginPage() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        alert("Usuário não encontrado.");
        return;
      }

      RNBcrypt.compare(password, user.password, (error, isPasswordValid) => {
        if (error) {
          console.error("Bcrypt error:", error);
          alert("Ocorreu um erro ao verificar a senha.");
          return;
        }

        if (!isPasswordValid) {
          alert("Senha incorreta.");
          return;
        }

        navigation.navigate("Home");
      });
    } catch (error) {
      console.error("Login error:", error);
      alert("Ocorreu um erro ao efetuar o login.");
    }
  };

  return (
    <View style={tailwind`flex-1`}>
      <View
        style={tailwind`flex-row items-center justify-between p-4 bg-gray-100`}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={tailwind`text-lg font-bold`}>Login Page</Text>
        <View style={tailwind`w-6`} />
      </View>
      <View style={tailwind`items-center justify-center flex-1 p-4`}>
        <TextInput
          style={tailwind`border p-2 w-full mb-4`}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={tailwind`border p-2 w-full mb-4`}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View
          style={tailwind`flex flex-row justify-between items-center w-full`}
        >
          <View style={tailwind`flex-row items-center mb-4`}>
            <Switch value={rememberMe} onValueChange={setRememberMe} />
            <Text style={tailwind`ml-2`}>Lembrar de mim</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              alert("Funcionalidade ainda não implementada");
            }}
          >
            <Text style={tailwind`text-blue-500 mb-4`}>
              Esqueceu sua senha?
            </Text>
          </TouchableOpacity>
        </View>
        <ButtonAtom
          text="Entrar"
          onPress={handleLogin}
          style={tailwind`bg-green-900 rounded-full h-12 w-full `}
        />
      </View>
    </View>
  );
}
