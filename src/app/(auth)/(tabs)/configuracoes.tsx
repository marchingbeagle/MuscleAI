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
      <Text className="mb-5 text-xl font-bold">Ajustes</Text>
      <ConfigItem
        text="Perfil"
        onPress={handlePerfil}
        label="Entrar no Perfil"
        icon="person-outline"
      />
      <ConfigItem
        text="Privacidade e Segurança"
        onPress={handlePrivacidadeESeguranca}
        label="Acessar Detalhes"
        icon="shield-checkmark-outline"
      />
      <ConfigItem
        text="Sair"
        onPress={handleSignOut}
        label="Sair da conta"
        icon="log-out-outline"
      />
    </ScrollView>
  );
}
