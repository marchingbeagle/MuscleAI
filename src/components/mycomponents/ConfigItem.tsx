import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ConfigItemProps {
  text: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export default function ConfigItem({
  text,
  label,
  onPress,
  icon,
}: ConfigItemProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center p-4 mb-4 bg-gray-50 rounded-xl"
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color="#2f855a" />
      <View className="flex-1 ml-4">
        <Text className="font-medium text-gray-800">{text}</Text>
        <Text className="text-sm text-gray-500">{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#2f855a" />
    </TouchableOpacity>
  );
}
