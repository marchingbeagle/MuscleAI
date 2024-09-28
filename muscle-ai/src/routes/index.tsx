import { createStackNavigator } from "@react-navigation/stack";
import WelcomePage from "../pages/welcome";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import React from "react";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome Page"
        component={WelcomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login Page"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup Page"
        component={SignupPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
