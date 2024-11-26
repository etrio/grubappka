import WelcomeScreen from "@/app";
import { User } from "@/types/User";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const { user: userString} = useLocalSearchParams<{
    user: string;
  }>();

  if (!userString) {
    return;
  }

  const user = JSON.parse(userString) as User;

  const isRegistered = false;

  return (
    <SafeAreaView className="flex-1 bg-[#04041D]">
      <Text className="dark:text-white text-2xl">Witaj grubasku {user.name}</Text>
      <Text className="dark:text-white text-2xl">
        Twoje statystyki: waga - {user.weight}, płeć - {user.gender}, wzrost - {user.height}
      </Text>
    </SafeAreaView>
  );
}
