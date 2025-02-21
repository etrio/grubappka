import ActionButton from "@/components/ActionButton";
import { User } from "@/types/User";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
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
import { supabase } from "@/lib/supabase";

interface WelcomeScreenProps {
  visible: boolean;
}

export default function WelcomeScreen({ visible }: WelcomeScreenProps) {
  const [selectedActivity, setSelectedActivity] = useState<string>();
  const [selectedGender, setSelectedGender] = useState<string>();
  const [name, setName] = useState<string>();
  const [height, setHeight] = useState<string>();
  const [weight, setWeight] = useState<string>();
  const [age, setAge] = useState<string>();
  const [isVisible, setIsVisible] = useState<boolean>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setIsVisible(visible);
    }, [])
  );

  async function createUser() {
    try {
      setLoading(true);
      if (
        !weight ||
        !name ||
        !age ||
        !height ||
        !selectedGender ||
        !selectedActivity
      ) {
        console.log("zle dane");
        return null;
      }

      const user: User = {
        user_id: uuidv4(),
        weight: weight,
        name: name,
        age: age,
        height: height,
        gender: selectedGender,
        activity: selectedActivity,
      };

      const { error } = await supabase.from("users").insert(user);
      await SecureStore.setItemAsync("user_id", user.user_id);

      if (error) {
        throw error;
      }
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      setIsVisible(false);
      setLoading(false);
      router.navigate("/(tabs)/profile");
    }
  }

  return (
    <Modal animationType="slide" visible={isVisible}>
      <SafeAreaView className="flex-1 dark:bg-[#0c0c0c]">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView>
            <Text className="text-center text-5xl mt-5 dark:text-white font-bold">
              Witaj grubasku
            </Text>
            <Text className="dark:text-white text-2xl text-center mt-2 font-semibold">
              Zacznij od stworzenia swojego profilu
            </Text>
            <View className="mt-10 gap-y-6 flex-col mx-5">
              <TextInput
                placeholder="Imie"
                onChangeText={(text) => setName(text)}
                placeholderTextColor="gray"
                className="border-2 p-2 border-[#e1275f] rounded-md text-xl font-bold dark:text-white"
                style={{
                  textAlignVertical: "center",
                  height: 40,
                  paddingVertical: 0,
                }}
              />
              <TextInput
                placeholder="Wiek"
                inputMode="numeric"
                placeholderTextColor="gray"
                placeholderClassName="text-sm"
                onChangeText={(text) => setAge(text)}
                className="border-2 p-2 border-[#e1275f] rounded-md text-xl font-bold dark:text-white"
                style={{
                  textAlignVertical: "center",
                  height: 40,
                  paddingVertical: 0,
                }}
              />
              <TextInput
                placeholder="Wzrost"
                inputMode="numeric"
                placeholderTextColor="gray"
                onChangeText={(text) => setHeight(text)}
                className="border-2 p-2 border-[#e1275f] rounded-md text-xl font-bold dark:text-white"
                style={{
                  textAlignVertical: "center",
                  height: 40,
                  paddingVertical: 0,
                }}
              />
              <TextInput
                placeholder="Waga"
                inputMode="numeric"
                onChangeText={(text) => setWeight(text)}
                placeholderTextColor="gray"
                className="border-2 p-2 border-[#e1275f] rounded-md text-xl font-bold dark:text-white"
                style={{
                  textAlignVertical: "center",
                  height: 40,
                  paddingVertical: 0,
                }}
              />
            </View>
            <Text className="dark:text-white text-center text-2xl font-semibold mt-5 text-wrap">
              Płeć
            </Text>
            <View className="flex-row items-center justify-center mt-2 gap-x-10">
              <ActionButton
                size={100}
                text="M"
                isSelected={selectedGender === "M"}
                onPress={() => setSelectedGender("M")}
              />
              <ActionButton
                size={100}
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
                size={100}
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
                size={100}
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
                size={100}
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
            <View className="justify-center my-8">
              <TouchableOpacity
                className={`p-3 ${
                  selectedActivity != null && selectedGender != null
                    ? "bg-[#aa0236]"
                    : "bg-[#e1275f]"
                } rounded-2xl mx-5`}
                onPress={() => createUser()}
              >
                <Text className="text-white text-xl font-semibold text-center">
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
