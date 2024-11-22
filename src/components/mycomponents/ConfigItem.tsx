import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ConfigItemProps {
  text: string;
  label: string;
  onPress: () => void;
}

export default function ConfigItem({ text, label, onPress }: ConfigItemProps) {
  return (
    <View className="flex flex-row items-center justify-between mb-5">
      <Text className="w-1/2 text-base">{text}</Text>
      <TouchableOpacity
        onPress={onPress}
        className="px-4 py-2 bg-green-500 rounded-full "
      >
        <Text className="text-base font-medium text-white">{label}</Text>
      </TouchableOpacity>
    </View>
  );
}
