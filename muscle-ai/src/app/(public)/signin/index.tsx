import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import React from "react";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";
import logo from "src/assets/logo_sem_nome.png";
import InputGreen from "src/components/mycomponents/InputGreen.";

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
    <View className="flex flex-col justify-between h-full p-8 bg-gray-50">
      <View className="flex flex-col gap-4">
        <View className="flex items-center justify-center ">
          <Image source={logo} className="w-28 h-28 mt-9" />
        </View>
        <Text className="mb-8 text-5xl font-bold text-center">Muscle AI</Text>
        <View>
          <InputGreen
            value={emailAddress}
            setValue={setEmailAddress}
            placeholder="johndoe@example.com"
          />
        </View>
        <View>
          <InputGreen
            value={password}
            setValue={setPassword}
            placeholder="**********"
          />
        </View>
      </View>
      <View className="flex gap-4 ">
        <Button
          label="Entrar"
          variant={"secondary"}
          onPress={onSignInPress}
          className="text-white bg-green-800 rounded-full h-14 color-white"
        />
        <View>
          <Button
            label="Criar conta"
            variant={"secondary"}
            onPress={() => router.push("/signup")}
            className="bg-green-200 rounded-full h-14 color-white"
          />
        </View>
      </View>
    </View>
  );
}
