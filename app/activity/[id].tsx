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
  const { id, name, color } = useLocalSearchParams<{
    id: string;
    name: string;
    color: string;
  }>();
  const theme = useColorScheme();

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

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
          {name}
        </Text>
        {/* only to center text */}
        <IconSymbol
          size={18}
          name="chevron.backward"
          color={theme === "dark" ? "black" : "white"}
        />
      </View>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {activities
            .filter((activity) => activity.category === name.toLowerCase())
            .map((activity) => (
              <View key={activity.id} className="mb-6">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="dark:text-white text-2xl font-semibold">
                    {activity.name}
                  </Text>
                  <Link href="/(modals)/infotab" asChild>
                    <TouchableOpacity>
                      <IconSymbol name="info.circle" size={28} color="gray" />
                    </TouchableOpacity>
                  </Link>
                </View>
                <Image
                  source={activity.videoPath}
                  className="w-full rounded-md"
                />
              </View>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
