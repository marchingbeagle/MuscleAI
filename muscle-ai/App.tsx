import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import tailwind from "twrnc";
import { initializeDb } from "./src/services/db";
import "./gesture-handler";

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
