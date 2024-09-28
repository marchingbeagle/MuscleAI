import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex items-center justify-center h-screen">
      <Text className="p-4 bg-red-400">Muscle AI</Text>
      <StatusBar style="auto" />
    </View>
  );
}
