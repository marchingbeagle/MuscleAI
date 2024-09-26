import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
      <View>
        <Text className="bg-red-500">dasding on your app!</Text>
        <StatusBar style="auto" />
      </View>
  );
}