import {
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/types/User";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabTwoScreen() {
  const [user, setUser] = useState<User>();

  const getData = async () => {
    const result = await SecureStore.getItemAsync("user");
    if (result) {
      setUser(JSON.parse(result));
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData().catch((error) => {
        console.log(error);
      });
    }, [])
  );

  const deleteUser = async () => {
    await SecureStore.deleteItemAsync("user");
    router.navigate('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1">
      <View>
        <Text className="dark:text-white text-3xl font-bold text-center">
          Profil
        </Text>
      </View>
      <View className="items-center justify-center mt-5 gap-y-2">
        <View className="bg-[#c2c2c2] rounded-full w-24 h-24"></View>
        <Text className="dark:text-white text-2xl font-semibold">
          {user?.name}, {user?.age}
        </Text>
      </View>
      <TouchableOpacity
        className="p-2 bg-red-500 rounded-full"
        onPress={() => deleteUser()}
      >
        <Text className="dark:text-white">Delete user</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
