import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigationTypes";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function LoginPage() {
  const { signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      if (signIn) {
        await signIn.create({
          identifier: email,
          password,
        });
        alert("Login successful!");
        navigation.navigate("Home");
      } else {
        alert("SignIn service is not available.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed.");
    }
  };

  const handleNavigateToSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={handleNavigateToSignup}
      />
    </View>
  );
}
