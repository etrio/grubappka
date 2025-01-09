import ActionButton from "@/components/ActionButton";
import { User } from "@/types/User";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router, useRouter } from "expo-router";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  Keyboard,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const [selectedActivity, setSelectedActivity] = useState<string>();
  const [selectedGender, setSelectedGender] = useState<string>();
  const [name, setName] = useState<string>();
  const [height, setHeight] = useState<string>();
  const [weight, setWeight] = useState<string>();
  const [age, setAge] = useState<string>();
  const [isVisible, setIsVisible] = useState(true);

  const router = useRouter();

  const saveUser = async () => {
    if (!weight || !name || !age || !height || !selectedGender || !selectedActivity) {
      console.log('zle dane');
      return null;
    }

    const user: User = {
      weight: weight,
      name: name,
      age: age,
      height: height,
      gender: selectedGender,
      activity: selectedActivity,
    };

    await SecureStore.setItemAsync("user", JSON.stringify(user));
    console.log(user);
    router.navigate("/(tabs)/profile");
    setIsVisible(false);
  };

  return (
    <Modal animationType="slide" visible={isVisible}>
      <SafeAreaView className="flex-1 bg-[#0c0c0c]">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView>
            <Text className="text-center text-5xl mt-5 dark:text-white font-bold">
              Witaj grubasku
            </Text>
            <Text className="dark:text-white text-2xl text-center mt-2 font-semibold">
              Zacznij od stworzenia swojego profilu
            </Text>
            <View className="mt-10 gap-y-6 flex-col">
              <TextInput
                placeholder="Imie"
                onChangeText={(text) => setName(text)}
                className="border-2 mx-5 p-3 border-indigo-900 rounded-md dark:text-white"
              />
              <TextInput
                placeholder="Wiek"
                inputMode="numeric"
                onChangeText={(text) => setAge(text)}
                className="border-2 mx-5 p-3 border-indigo-900 rounded-md dark:text-white"
              />
              <TextInput
                placeholder="Wzrost"
                inputMode="numeric"
                onChangeText={(text) => setHeight(text)}
                className="border-2 mx-5 p-3 border-indigo-900 rounded-md dark:text-white"
              />
              <TextInput
                placeholder="Waga"
                inputMode="numeric"
                onChangeText={(text) => setWeight(text)}
                className="border-2 mx-5 p-3 border-indigo-900 rounded-md dark:text-white"
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
            <Text className="dark:text-white text-center text-2xl font-semibold mt-5 text-wrap">
              Poziom aktywności w tygodniu
            </Text>
            <View className="flex-row items-center justify-center gap-x-7 mt-5">
              <ActionButton
                text="0-2"
                icon={
                  <MaterialCommunityIcons
                    name={
                      selectedActivity === "low"
                        ? "lightning-bolt"
                        : "lightning-bolt-outline"
                    }
                    size={24}
                    color="white"
                  />
                }
                isSelected={selectedActivity === "low"}
                onPress={() => setSelectedActivity("low")}
              />
              <ActionButton
                text="3-4"
                icon={
                  <MaterialCommunityIcons
                    name={
                      selectedActivity === "medium"
                        ? "lightning-bolt"
                        : "lightning-bolt-outline"
                    }
                    size={24}
                    color="white"
                  />
                }
                isSelected={selectedActivity === "medium"}
                onPress={() => setSelectedActivity("medium")}
              />
              <ActionButton
                text="5-7"
                icon={
                  <MaterialCommunityIcons
                    name={
                      selectedActivity === "high"
                        ? "lightning-bolt"
                        : "lightning-bolt-outline"
                    }
                    size={24}
                    color="white"
                  />
                }
                isSelected={selectedActivity === "high"}
                onPress={() => setSelectedActivity("high")}
              />
            </View>
            <View className="justify-center mt-8">
              <TouchableOpacity
                className={`p-3 ${
                  selectedActivity != null && selectedGender != null
                    ? "bg-indigo-700"
                    : "bg-indigo-900"
                } rounded-full mx-5`}
                onPress={() => saveUser()}
              >
                <Text className="dark:text-white text-xl font-semibold text-center">
                  PRZEJDŹ DALEJ
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  );
}
