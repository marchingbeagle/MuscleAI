import { Text, ScrollView } from "react-native";
import React from "react";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import ConfigItem from "src/components/mycomponents/ConfigItem";

export default function Configuracoes() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handlePerfil = () => {
    router.push("/perfil");
  };

  const handlePrivacidadeESeguranca = () => {
    router.push("/privacidadeESeguranca");
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/welcome");
  };

  return (
    <ScrollView className="p-4 pt-12 bg-white ">
      <Text className="mb-5 text-xl font-bold">Configurações</Text>
      <ConfigItem
        text="Perfil"
        onPress={handlePerfil}
        label="Entrar no Perfil"
      />
      <ConfigItem
        text="Privacidade e Segurança"
        onPress={handlePrivacidadeESeguranca}
        label="Acessar Detalhes"
      />
      <ConfigItem text="Sair" onPress={handleSignOut} label="Sair da conta" />
    </ScrollView>
  );
}
