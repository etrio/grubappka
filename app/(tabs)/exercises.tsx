import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  useColorScheme,
  ScrollView,
  FlatList,
} from "react-native";

import * as SecureStore from "expo-secure-store";
import { act, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Activity } from "@/components/Activity";

export default function TabTwoScreen() {
  const theme = useColorScheme();

  const getData = async () => {
    const result = await SecureStore.getItemAsync("user");
    if (result) {
      // setUser(JSON.parse(result));
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData().catch((error) => {
        console.log(error);
      });
    }, [])
  );

  const activities = [
    {
      id: "1",
      name: "Chest",
      color: "bg-orange-500",
    },
    {
      id: "2",
      name: "Back",
      color: "bg-blue-500",
    },
    {
      id: "3",
      name: "Legs",
      color: "bg-purple-500",
    },
    {
      id: "4",
      name: "Arms",
      color: "bg-yellow-500",
    },
    {
      id: "5",
      name: "Cardio",
      color: "bg-green-500",
    },
  ];

  return (
    <SafeAreaView edges={["top"]} className="flex-1 dark:bg-[#1b1b1b]">
      <View className="flex-1 dark:bg-[#0c0c0c] h-full">
        <View className="dark:bg-[#1b1b1b]">
          <Text className="text-center text-4xl font-semibold dark:text-white my-3">
            Ćwiczenia
          </Text>
        </View>
        <ScrollView className="mx-5 flex-1 h-full mb-24" showsVerticalScrollIndicator={false}>
          {activities.map((activity) => (
            <Activity id={activity.id} name={activity.name} color={activity.color} key={activity.name} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
