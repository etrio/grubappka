import { Text, View, useColorScheme, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Activity } from "@/components/Activity";
import { getCategories } from "@/lib/exercise";
import { useEffect, useState } from "react";
import { Category } from "@/types/Category";

export default function TabTwoScreen() {
  const [categories, setCategories] = useState<Category[]>();

  const getData = async () => {
    const data = await getCategories();
    setCategories(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 dark:bg-[#000000] bg-[#ffffff]"
    >
      <View className="flex-1 dark:bg-[#000000] h-full">
        <View className="dark:bg-[#000000]">
          <Text className="text-center text-4xl font-semibold dark:text-white my-3">
            Exercises
          </Text>
        </View>
        <ScrollView
          className="mx-5 flex-1 h-full"
          showsVerticalScrollIndicator={false}
        >
          {categories?.map((category) => (
            <Activity
              id={category.name}
              name={category.name}
              key={category.name}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
