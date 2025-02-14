import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, Text, View } from "react-native";

export default function InfoTab() {
  const { description, equipment, muscles, primaryMuscle, secondaryMuscle } =
    useLocalSearchParams<{
      description: string;
      equipment: string;
      muscles: string;
      primaryMuscle: string;
      secondaryMuscle: string;
    }>();
  return (
    <View className="mx-5 my-5">
      <Text className="dark:text-gray-100 text-3xl text-center font-semibold mb-6">
        {description}
      </Text>
      <View className="gap-y-6">
        <View className="gap-x-2">
          <Text className="dark:text-gray-300 text-3xl font-medium">
            Sprzęt •
          </Text>
          <Text className="dark:text-gray-400 text-gray-800 text-2xl font-bold">
            {equipment}
          </Text>
        </View>
        <View className="gap-x-2">
          <Text className="dark:text-gray-300 text-3xl font-medium">
            Grupa Mięśniowa •
          </Text>
          <Text className="dark:text-gray-400 text-gray-800 text-2xl font-bold">
            {muscles}
          </Text>
        </View>
        <View className="gap-x-2">
          <Text className="dark:text-gray-300 text-3xl font-medium">
            Mięśnie pierwszorzędne •
          </Text>
          <Text className="dark:text-gray-400 text-gray-800 text-2xl font-bold">
            {primaryMuscle}
          </Text>
        </View>
        {secondaryMuscle != "" && (
          <View className="gap-x-2">
            <Text className="dark:text-gray-300 text-3xl font-medium">
              Mięśnie drugorzędne •
            </Text>
            <Text className="dark:text-gray-400 text-gray-800 text-2xl font-bold">
              {secondaryMuscle}
            </Text>
          </View>
        )}
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
