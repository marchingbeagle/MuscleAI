import React, { useState } from "react";
import tailwind from "twrnc";
import { View, Text, TouchableOpacity, TextInput, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button as ButtonAtom } from "@/components/button";
import Icon from "react-native-vector-icons/Ionicons";

export default function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // navigation.navigate("Home");
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
              /* Handle forgot password */
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
