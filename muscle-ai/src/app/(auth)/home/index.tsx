import { View, Text } from "react-native";
import React from "react";
import { Button } from "src/components/Button";
import { router } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";

export default function HomePage() {
  const { signOut } = useClerk();
  return (
    <View className="flex items-center justify-center h-full">
      <Text>HomePage</Text>
      <Button
        label="Sign out"
        onPress={async () => {
          await signOut();
          router.navigate("/welcome");
        }}
      />
    </View>
  );
}
