import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#2f855a",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="signin/index"
        options={{
          title: "Entrar",
          headerTitle: "Muscle AI",
        }}
      />
      <Stack.Screen
        name="signup/index"
        options={{
          title: "Criar Conta",
          headerTitle: "Muscle AI",
        }}
      />
      <Stack.Screen
        name="welcome/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
