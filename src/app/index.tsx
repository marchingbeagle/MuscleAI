import React, { useEffect, useState } from "react";
import { StatusBar, View, ActivityIndicator, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { initializeDb } from "../services/db";
import Welcome from "./(public)/welcome";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router/build/exports";

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const setup = async () => {
      try {
        await initializeDb();
        setIsInitialized(true);
      } catch (err) {
        console.error("Database initialization error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to initialize database"
        );
        setIsInitialized(true); // Allow app to continue even if DB init fails
      }
    };
    setup();
  }, []);

  if (!isInitialized) {
    return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 10 }}>Initializing...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  if (error) {
    console.warn("App running with DB error:", error);
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"dark-content"} />
      {isSignedIn ? <Redirect href="/(auth)/(tabs)/home" /> : <Welcome />}
    </SafeAreaProvider>
  );
}
