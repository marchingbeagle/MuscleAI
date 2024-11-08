import React from "react";
import {  StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Welcome from "./(public)/welcome";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router/build/exports";
import "../services/firebase/firebaseConfig";

export default function App() {
  const { isSignedIn } = useAuth();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"dark-content"} />
        {isSignedIn ? (
          <Redirect href="/home" /> 
        ) : (
          <Welcome /> 
        )}
    </SafeAreaProvider>
  );
}
