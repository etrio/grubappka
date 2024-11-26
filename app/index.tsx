import WeightButton from "@/components/WeightButton";
import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function WelcomeScreen() {
  const [selectedWeight, setSelectedWeight] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-[#0c0c0c]">
      <Text className="text-center text-5xl mt-6 dark:text-white font-bold">
        Witaj grubasku
      </Text>
      <Text className="dark:text-white text-2xl text-center mt-2 font-semibold">
        Zacznij od wybrania poziomu
      </Text>
      <View className="flex-row items-center justify-center gap-x-7 mt-20">
        <WeightButton
          text="Początkujący"
          weight="100"
          isSelected={selectedWeight === "100"}
          onPress={() => setSelectedWeight("100")}
        />
        <WeightButton
          text="Średnio zaawansowany"
          weight="130"
          isSelected={selectedWeight === "130"}
          onPress={() => setSelectedWeight("130")}
        />
        <WeightButton
          text="Zaawansowany"
          weight="150+"
          isSelected={selectedWeight === "150+"}
          onPress={() => setSelectedWeight("150+")}
        />
      </View>
    </SafeAreaView>
  );
}
