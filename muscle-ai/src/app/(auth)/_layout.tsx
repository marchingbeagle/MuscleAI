import React from "react";
import { Slot } from "expo-router/build/exports";
import Stack from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="cadastro" options={{ title: "Cadastro" }} />
    </Stack>
  );
}
