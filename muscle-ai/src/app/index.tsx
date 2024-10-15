import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { initializeDb } from "../services/db";
import Welcome from "./(public)/welcome";
import { useAuth } from "@clerk/clerk-expo";
import Home from "./(auth)/(tabs)/dashboard/home";
import TabLayout from "./(auth)/(tabs)/dashboard/_layout";

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { isSignedIn } = useAuth();

  // Inicia o Banco de Dados
  useEffect(() => {
    const setup = async () => {
      await initializeDb();
      setIsInitialized(true);
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
          <TabLayout />
        ) : (
          <Welcome />
        )
      ) : (
        // Caso não inicie ele irá exibir uma tela de Loading
        <SafeAreaView className="flex items-center justify-center">
          <Text>Loading...</Text>
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}
