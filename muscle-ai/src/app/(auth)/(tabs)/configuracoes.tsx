import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Button } from "src/components/Button";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function Configuracoes() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/welcome");
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Text className="mb-5 text-2xl font-bold">Configurações</Text>
      <View className="flex flex-row items-center justify-between gap-5 mb-5">
        <Text className="mb-2 text-lg">Perfil</Text>
        <Button
          label="Editar Perfil"
          onPress={() => router.push("/editarPerfil")}
          className="px-24 text-white bg-green-800 rounded-full h-14 color-white"
        />
      </View>
      <View className="flex flex-row items-center justify-between gap-5 mb-5">
        <Text className="mb-2 text-lg">Notificações</Text>
        <Button
          label="Configurar Notificações"
          onPress={() => router.push("/configurarNotificacoes")}
          className="flex-1 text-white bg-green-800 rounded-full h-14 color-white"
        />
      </View>
      <View className="flex flex-row items-center justify-between gap-8 mb-5">
        <Text className="mb-2 text-lg">Segurança</Text>
        <Button
          label="Alterar Senha"
          onPress={() => router.push("/alterarSenha")}
          className="flex-1 text-white bg-green-800 rounded-full h-14 color-white"
        />
      </View>
      <View className="flex flex-row items-center mb-5">
        <Text className="mb-2 text-lg basis-1/2">Conta</Text>
        <Button
          label="Sair da conta"
          className="flex-1 text-white bg-green-800 rounded-full h-14 color-white"
          onPress={handleSignOut}
        />
      </View>
    </ScrollView>
  );
}
