import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Layout() {
  return <Tabs
  screenOptions={{ headerShown: false, tabBarActiveTintColor: "green" }}
>
  <Tabs.Screen
    name="home"
    options={{
      title: "Home",
      headerShown: false,
      tabBarIcon: ({ color }) => (
        <FontAwesome size={28} name="home" color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="alunos"
    options={{
      title: "Alunos",
      headerShown: false,
      tabBarIcon: ({ color }) => (
        <FontAwesome size={22} name="users" color={color} />
      ),
    }}
  />
  <Tabs.Screen name="treinos" options={{ title: "Treino" }} />
</Tabs>;
}
