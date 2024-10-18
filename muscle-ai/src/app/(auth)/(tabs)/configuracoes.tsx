import { View, Text } from "react-native";
import React from "react";
import { Button } from "src/components/Button";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function configuracoes() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/welcome");
  };

  return (
    <View>
      <Text>configuracoes</Text>
      <Button label="Sair da conta" onPress={handleSignOut} />
    </View>
  );
}
