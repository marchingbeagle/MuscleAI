import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";
import React from "react";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";

export default function Signin() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View className="flex flex-col justify-center h-full p-8">
      <View className="flex flex-col gap-4">
        <View>
          <Text className="text-lg">Email</Text>
          <Input
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            className="border-2 border-green-800 rounded-lg"
          />
        </View>
        <View>
          <Text className="text-lg">Senha</Text>
          <Input
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            className="border-2 border-green-800 rounded-lg"
          />
        </View>
      </View>
      <Button
        label="Entrar com sua conta"
        variant={"secondary"}
        onPress={onSignInPress}
        className="my-4 bg-green-800 color-white"
      />
      <View>
        <Button
          label="Não possui uma conta?"
          variant={"link"}
          onPress={() => router.push("/signup")}
        />
      </View>
    </View>
  );
}
