import ActionButton from "@/components/ActionButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-[#0c0c0c]">
        <Text className="text-center text-5xl mt-6 dark:text-white font-bold">
          Witaj grubasku
        </Text>
        <Text className="dark:text-white text-2xl text-center mt-2 font-semibold">
          Zacznij od stworzenia swojego profilu
        </Text>
        <View className="mt-10 gap-y-6 flex-col">
          <TextInput
            placeholder="Imie"
            className="border-2 mx-5 p-3 border-gray-500 rounded-md dark:text-white"
          />
          <TextInput
            placeholder="Wzrost"
            inputMode="numeric"
            className="border-2 mx-5 p-3 border-gray-500 rounded-md dark:text-white"
          />
          <TextInput
            placeholder="Waga"
            inputMode="numeric"
            className="border-2 mx-5 p-3 border-gray-500 rounded-md dark:text-white"
          />
        </View>
        <Text className="dark:text-white text-center text-2xl font-semibold mt-5 text-wrap">
          Płeć
        </Text>
        <View className="flex-row items-center justify-center mt-5 gap-x-10">
          <ActionButton
            text="M"
            isSelected={selectedGender === "M"}
            onPress={() => setSelectedGender("M")}
          />
          <ActionButton
            text="K"
            isSelected={selectedGender === "K"}
            onPress={() => setSelectedGender("K")}
          />
        </View>
        <Text className="dark:text-white text-center text-2xl font-semibold mt-10 text-wrap">
          Poziom aktywności w tygodniu
        </Text>
        <View className="flex-row items-center justify-center gap-x-7 mt-10">
          <ActionButton
            text="0-2"
            icon={
              <MaterialCommunityIcons
                name={
                  selectedActivity === 1
                    ? "lightning-bolt"
                    : "lightning-bolt-outline"
                }
                size={24}
                color="white"
              />
            }
            isSelected={selectedActivity === 1}
            onPress={() => setSelectedActivity(1)}
          />
          <ActionButton
            text="3-4"
            icon={
              <MaterialCommunityIcons
                name={
                  selectedActivity === 2
                    ? "lightning-bolt"
                    : "lightning-bolt-outline"
                }
                size={24}
                color="white"
              />
            }
            isSelected={selectedActivity === 2}
            onPress={() => setSelectedActivity(2)}
          />
          <ActionButton
            text="5-7"
            icon={
              <MaterialCommunityIcons
                name={
                  selectedActivity === 3
                    ? "lightning-bolt"
                    : "lightning-bolt-outline"
                }
                size={24}
                color="white"
              />
            }
            isSelected={selectedActivity === 3}
            onPress={() => setSelectedActivity(3)}
          />
        </View>
        <TouchableOpacity className={`justify-center items-center mt-10 p-3 ${selectedActivity != null && selectedGender != null ? "bg-indigo-700" : "bg-indigo-900"} rounded-full mx-5`} onPress={() => router.push("/(tabs)")}>
          <Text className="dark:text-white text-2xl font-semibold">ZAGITUJ MI TO</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
