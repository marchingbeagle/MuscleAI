import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="signin/index"
        options={{ title: "Entrar com sua conta" }}
      />
      <Stack.Screen name="signup/index" options={{ title: "Criar conta" }} />
      <Stack.Screen
        name="welcome/index"
        options={{ title: "Welcome", headerShown: false }}
      />
    </Stack>
  );
}
