import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { initializeDb } from "../services/db";
import tailwind from "twrnc";
import "../../gesture-handler";
import WelcomePage from "./(public)/welcome";
import { useAuth } from "@clerk/clerk-expo";
import HomePage from "./(auth)/home";

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const setup = async () => {
      await initializeDb();
      setIsInitialized(true);
    };
    setup();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"light-content"} />
      {isInitialized ? (
        isSignedIn ? (
          <HomePage />
        ) : (
          <WelcomePage />
        )
      ) : (
        <SafeAreaView style={tailwind`flex items-center justify-center`}>
          <Text>Loading...</Text>
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}