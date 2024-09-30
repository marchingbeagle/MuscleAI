import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function SignUpPage() {
  const { signUp } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleSignUp = async () => {
    try {
      if (signUp) {
        await signUp.create({
          emailAddress: email,
          password,
        });
        alert("Sign-up successful!");
        navigation.navigate("Login");
      } else {
        alert("Sign-up service is not available.");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("Sign-up failed.");
    }
  };

  const handleNavigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button
        title="Already have an account? Login"
        onPress={handleNavigateToLogin}
      />
    </View>
  );
}
