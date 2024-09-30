import { View, Text } from "react-native";
import React from "react";
import RNBcrypt from "react-native-bcrypt";
import { prismaClient } from "@/services/db";

export default function SignupPage() {
  async function registerUser(email: string, password: string, name: string) {
    try {
      const saltRounds = 10;

      RNBcrypt.hash(
        password,
        saltRounds,
        async (error: Error, hashedPassword?: string) => {
          if (error) {
            console.error("Error hashing password:", error);
            return;
          }

          try {
            await prismaClient.user.create({
              data: {
                name: name,
                email: email,
                password: hashedPassword || "",
              },
            });
            console.log("User registered successfully");
          } catch (dbError) {
            console.error("Error storing user in database:", dbError);
          }
        }
      );
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  }
  return (
    <View>
      <Text>SignupPage</Text>
    </View>
  );
}
