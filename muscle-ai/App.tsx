import React, { useEffect, useState } from "react";
import "./gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { initializeDb } from "@/services/db";
import tailwind from "twrnc";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await initializeDb();
      setIsInitialized(true);
    };
    setup();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={"light-content"} />
        {isInitialized ? (
          <Routes />
        ) : (
          <SafeAreaView style={tailwind`flex items-center justify-center`}>
            <Text>Loading...</Text>
          </SafeAreaView>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
