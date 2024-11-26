import WelcomeScreen from "@/app";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const isRegistered = false;

  return (
    <SafeAreaView className="flex-1 bg-[#04041D]">
      <Text className="text-4xl">Witaj grubasku</Text>
    </SafeAreaView>
  );
}
