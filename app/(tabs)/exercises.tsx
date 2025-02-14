import {
  Text,
  View,
  useColorScheme,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Activity } from "@/components/Activity";

export default function TabTwoScreen() {

  const activities = [
    {
      id: "1",
      name: "chest",
      displayedName: "Klatka",
      color: "bg-orange-500",
    },
    {
      id: "2",
      name: "back",
      displayedName: "Plecy",
      color: "bg-blue-500",
    },
    {
      id: "3",
      name: "arms",
      displayedName: "Ramiona",
      color: "bg-yellow-500",
    },
    {
      id: "4",
      name: "legs",
      displayedName: "Nogi",
      color: "bg-purple-500",
    },
  ];

  return (
    <SafeAreaView edges={["top"]} className="flex-1 dark:bg-[#1b1b1b] bg-[#f8f4f4]">
      <View className="flex-1 dark:bg-[#0c0c0c] h-full">
        <View className="dark:bg-[#1b1b1b] bg-[#f8f4f4] dark:border-b-0 border-b-2 border-b-[#ebe7e7]">
          <Text className="text-center text-4xl font-semibold dark:text-white my-3">
            Ćwiczenia
          </Text>
        </View>
        <ScrollView className="mx-5 flex-1 h-full mb-24" showsVerticalScrollIndicator={false}>
          {activities.map((activity) => (
            <Activity id={activity.id} name={activity.name} displayedName={activity.displayedName} color={activity.color} key={activity.name} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
