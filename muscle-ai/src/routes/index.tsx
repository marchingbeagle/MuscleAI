import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import WelcomePage from "../pages/welcome";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import HomePage from "@/pages/home";

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomePage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginPage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupPage}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomePage}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default function Routes() {
  return (
    <>
      <SignedIn>
        <AppStack />
      </SignedIn>
      <SignedOut>
        <AuthStack />
      </SignedOut>
    </>
  );
}
