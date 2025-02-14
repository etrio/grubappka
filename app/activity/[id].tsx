import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { activitiesData } from "@/data/activities";

export default function Activity() {
  const { id, name, displayedName, color } = useLocalSearchParams<{
    id: string;
    name: string;
    displayedName: string;
    color: string;
  }>();
  const theme = useColorScheme();
  const activities = activitiesData;

  return (
    <SafeAreaView className="flex-1 mx-5">
      <View className="mb-5 flex-row justify-between items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol
            size={18}
            name="chevron.backward"
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
        <Text className="dark:text-white font-bold text-3xl text-center">
          {displayedName}
        </Text>
        <IconSymbol
          size={18}
          name="chevron.backward"
          color={theme === "dark" ? "black" : "white"}
        />
      </View>
      <View className="mb-10">
        <ScrollView showsVerticalScrollIndicator={false}>
          {activities
            .filter((activity) => activity.category.toLowerCase() === name.toLowerCase())
            .map((activity) => (
              <View key={activity.id} className="mb-6">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="dark:text-white text-2xl font-semibold">
                    {activity.name}
                  </Text>
                </View>
                <Image source={activity.videoPath} className="w-full rounded-md" />
                <View className="flex-row justify-between mt-2 items-center">
                  <TouchableOpacity>
                    <IconSymbol
                      name="plus"
                      size={24}
                      color={theme === "dark" ? "gray" : "black"}
                    />
                  </TouchableOpacity>
                  <Link
                    href={{
                      pathname: "/(modals)/infotab",
                      params: {
                        equipment: activity.equipment,
                        muscles: activity.muscles,
                        primaryMuscle: activity.primaryMuscle,
                        secondaryMuscle: activity.secondaryMuscle,
                        description: activity.description,
                      },
                    }}
                    asChild
                  >
                    <TouchableOpacity>
                      <IconSymbol
                        name="info.circle"
                        size={24}
                        color={theme === "dark" ? "gray" : "black"}
                      />
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
