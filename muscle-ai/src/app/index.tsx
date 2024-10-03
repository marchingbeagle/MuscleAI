import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { initializeDb } from "../services/db";
import Welcome from "./(public)/welcome";
import { useAuth } from "@clerk/clerk-expo";
import Home from "./(auth)/(tabs)/dashboard/home";

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
      <StatusBar barStyle={"dark-content"} />
      {isInitialized ? (
        isSignedIn ? (
          <Home />
        ) : (
          <Welcome />
        )
      ) : (
        <SafeAreaView className="flex items-center justify-center">
          <Text>Loading...</Text>
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}
