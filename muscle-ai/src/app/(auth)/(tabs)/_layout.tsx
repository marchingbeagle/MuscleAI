import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: true, tabBarActiveTintColor: "green" }}>
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
          tabBarIcon: ({ color }) => (
            <FontAwesome size={22} name="users" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="treinos"
        options={{
          title: "Treino",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={22} name="dumbbell" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracoes"
        options={{
          title: "Configurações",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={22} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
