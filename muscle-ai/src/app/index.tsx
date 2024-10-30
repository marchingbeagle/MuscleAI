import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { initializeDb } from "../services/db";
import Welcome from "./(public)/welcome";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router/build/exports";

export default function App() {
  // Estado para verificar se o aplicativo foi inicializado
  const [isInitialized, setIsInitialized] = useState(false);
  const { isSignedIn } = useAuth();

  // Inicia o Banco de Dados
  useEffect(() => {
    const setup = async () => {
      await initializeDb(); // Inicializa o banco de dados
      setIsInitialized(true); // Atualiza o estado para indicar que a inicialização foi concluída
    };
    setup();
  }, []);

  // Componente que renderiza ao abrir o APP
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"dark-content"} />
      {isInitialized ? (
        // Verifica se está iniciado
        isSignedIn ? (
          <Redirect href="/home" /> // Redireciona para a página inicial se o usuário estiver autenticado
        ) : (
          <Welcome /> // Exibe a tela de boas-vindas se o usuário não estiver autenticado
        )
      ) : (
        // Caso não inicie, exibe uma tela de Loading
        <SafeAreaView className="flex items-center justify-center">
          <Text>Loading...</Text>
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}
