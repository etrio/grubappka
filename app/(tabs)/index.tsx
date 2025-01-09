import { Text, SafeAreaView } from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import WelcomeScreen from "@/components/WelcomeScreen";
import { useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { User } from "@/types/User";

export default function HomeScreen() {
  const [hasAccount, setHasAccount] = useState(false);
  const [user, setUser] = useState<User>();

  const getData = async () => {
    let result = await SecureStore.getItemAsync("user");
    if (result != null) {
      setHasAccount(true);
      setUser(JSON.parse(result));
    } else {
      setHasAccount(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData().catch((error) => {
        console.log(error);
      });
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0c0c0c]">
      {!hasAccount ? (
        <WelcomeScreen />
      ) : (
        <Text className="dark:text-white text-4xl font-bold">Witaj, {user?.name}</Text>
      )}
      <StatusBar />
    </SafeAreaView>
  );
}
