import * as React from "react";
import { View, Text } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import InputGreen from "src/components/mycomponents/InputGreen.";
import { Button } from "src/components/Button";

export default function SignUp() {
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex flex-col justify-center h-full p-8 bg-gray-50">
      <Text className="mb-8 text-2xl">Preencha seus dados</Text>
      {!pendingVerification && (
        <View className="flex flex-col gap-4">
          <View>
            <Text>Nome</Text>
            <InputGreen value={name} setValue={setName} placeholder="John" />
          </View>
          <View>
            <Text>Sobrenome</Text>
            <InputGreen
              value={surname}
              setValue={setSurname}
              placeholder="Doe"
            />
          </View>
          <View>
            <Text>Email</Text>
            <InputGreen
              value={emailAddress}
              setValue={setEmailAddress}
              placeholder="johndoe@example.com"
            />
          </View>
          <View>
            <Text>Senha</Text>
            <InputGreen
              value={password}
              setValue={setPassword}
              placeholder="**********"
              secureTextEntry
            />
          </View>
          <Button
            className="text-white bg-green-800 rounded-full h-14 color-white"
            label="Cadastrar-se"
            onPress={onSignUpPress}
          />
        </View>
      )}
      {pendingVerification && (
        <>
          <InputGreen value={code} setValue={setCode} placeholder="Code" />
          <Button label="Verify Email" onPress={onPressVerify} />
        </>
      )}
    </View>
  );
}
