import {
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import React, { useCallback, useState } from "react";
import * as SecureStore from "expo-secure-store";
import WelcomeScreen from "@/components/WelcomeScreen";
import { Link, router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { User } from "@/types/User";
import { View } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function HomeScreen() {
  const [hasAccount, setHasAccount] = useState(false);
  const [user, setUser] = useState<User>();

  const getData = async () => {
    let result = await SecureStore.getItemAsync("user");
    if (result != null) {
      console.log(JSON.parse(result!));

      setHasAccount(true);

      setUser(JSON.parse(result));
    } else {
      setHasAccount(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData().catch((error) => {
        console.log(error);
      });
    }, [])
  );

  return (
    <SafeAreaView edges={["top"]} className="flex-1 dark:bg-[#1b1b1b] bg-[#f8f4f4]">
      {!hasAccount ? (
        <WelcomeScreen visible={true} />
      ) : (
        <View className="flex-1 dark:bg-[#0c0c0c] bg-white">
          <View className="dark:bg-[#1b1b1b] dark:border-b-0 bg-[#f8f4f4] border-b-2 border-b-[#ebe7e7]">
            <Text
              style={{ fontFamily: "fantasy" }}
              className="dark:text-white text-4xl font-semibold text-center my-3 italic"
            >
              Witaj, {user?.name} !
            </Text>
          </View>
          <ScrollView className="flex-1">
            <View className="flex w-full overflow-auto">
              <Text
                style={{ fontFamily: "fantasy" }}
                className="dark:text-white text-4xl text-center font-bold my-5"
              >
                Rozpoczęte programy treningowe
              </Text>
              <View className="flex mx-5">
                <View className="dark:bg-slate-900 bg-slate-700 h-min w-full rounded-xl border-solid border-black dark:border-gray-800 border gap-y-6 p-3">
                  <TouchableOpacity
                    onPress={() => router.navigate("/(tabs)/exercises")}
                  >
                    <View className="rounded-xl bg-gray-800 p-4 justify-between flex-row items-center">
                      <Text className="text-white text-md font-medium">
                        Klatka
                      </Text>
                      <IconSymbol
                        name="arrow.forward.circle"
                        size={22}
                        color="white"
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.navigate("/(tabs)/exercises")}
                  >
                    <View className="rounded-xl  bg-gray-800 p-4 justify-between flex-row items-center">
                      <Text className="text-white text-md font-medium">
                        Plecy
                      </Text>
                      <IconSymbol
                        name="arrow.forward.circle"
                        size={22}
                        color="white"
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.navigate("/(tabs)/exercises")}
                  >
                    <View className="rounded-xl bg-gray-800 p-4 justify-between flex-row items-center">
                      <Text className="text-white text-md font-medium">
                        Nogi
                      </Text>
                      <IconSymbol
                        name="arrow.forward.circle"
                        size={22}
                        color="white"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="items-center mx-8 my-2">
              <Link href={"/(tabs)/exercises"} asChild>
                <TouchableOpacity className="dark:bg-slate-900 bg-slate-700 w-full py-3 my-6 rounded-3xl">
                  <Text className="text-center font-semibold text-gray-200">
                    Przejdź do treningów
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>

            <View className="flex-row w-full overflow-auto justify-center gap-x-6">
              <View className="dark:bg-slate-900 bg-slate-700 w-1/3 p-2 rounded-3xl gap-y-2 dark:border-gray-800 border-gray-800 border-2">
                <Text className="dark:text-gray-300 text-2xl text-center font-bold text-gray-200">
                  Finished workouts:{" "}
                </Text>
                <View className="flex-row items-center justify-center gap-x-2">
                  <MaterialCommunityIcons
                    name="arm-flex"
                    size={40}
                    color="white"
                  />
                  <Text className="text-4xl text-center dark:text-gray-300 text-gray-200">21</Text>
                </View>
              </View>

              <View className="dark:bg-slate-900 bg-slate-700 gap-y-2 dark:border-gray-800 border-gray-800 border-2 rounded-3xl p-4 border-solid border-black-900">
                <Text className="dark:text-white text-gray-300 text-4xl text-center font-bold">
                  Time Spent:
                </Text>
                <View className="flex-row items-center justify-center gap-x-2">
                  <Text className="text-5xl text-gray-300">21</Text>
                  <Text className="text-2xl text-gray-300">minutes</Text>
                  <Entypo
                    name="clock"
                    size={29}
                    color="white"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
      <StatusBar />
    </SafeAreaView>
  );
}
