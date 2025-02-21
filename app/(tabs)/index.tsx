import { Text, ScrollView, TouchableOpacity } from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import { Link, router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { User } from "@/types/User";
import { View } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { loadUser } from "@/lib/user";
import { getActiveExercises, getCategories } from "@/lib/exercise";
import { Category } from "@/types/Category";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";

interface Activity {
  category: string;
  total: number;
  completed: number;
}

export default function HomeScreen() {
  const [hasAccount, setHasAccount] = useState(false);
  const [user, setUser] = useState<User>();
  const [activeExercises, setActiveExercises] = useState<Activity[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [totalWorkouts, SetTotalWorkout] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // count total active ex.
  useEffect(() => {
    if (activeExercises) {
      const total = activeExercises.reduce(
        (sum, exercise) => sum + exercise.completed,
        0
      );
      SetTotalWorkout(total);
    }
  }, [activeExercises]);

  const getData = async () => {
    setIsLoading(true);
    try {

      const user = await loadUser();
      const data = await getActiveExercises();
      const categoriesData = await getCategories();

      if (data) {
        setActiveExercises(data);
      }

      if (categoriesData) {
        setCategories(categoriesData);
      }

      if (user != null) {
        setHasAccount(true);
        setUser(user);
      } else {
        setHasAccount(false);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
      console.log('index screen');
    }, [])
  );

  if (isLoading) {
    return (
      <SafeAreaView
        edges={["top"]}
        className="flex-1 dark:bg-[#000000] bg-[#ffffff]"
      >
        <View className="h-full w-full justify-center items-center">
          <Text className="dark:text-white text-3xl">Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 dark:bg-[#000000] bg-[#ffffff]"
    >
      {!hasAccount ? (
        <WelcomeScreen visible={true} />
      ) : (
        <View className="flex-1 dark:bg-[#000000] bg-white pb-10">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="mx-5 mt-8">
              <Text className="dark:text-white text-4xl font-bold">
                Hi, {user?.name}
              </Text>
            </View>
            <Text className="dark:text-white text-2xl font-bold mt-2 mb-5 mx-5">
              STARTED PROGRAMS
            </Text>
            <View className="flex mx-5 mb-5">
              <LinearGradient
                colors={["rgba(191,26,93,255)", "rgba(243,63,94,255)"]}
                start={{ x: 0.4, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ borderRadius: 10 }}
              >
                <View className="h-min w-full rounded-xl gap-y-6 p-3">
                  {activeExercises?.map((exercise) => {
                    const categoryId = categories?.find(
                      (category) => category.name === exercise.category
                    )?.id;

                    return (
                      <Link
                        href={{
                          pathname: "/activity/[id]",
                          params: {
                            id: exercise.category,
                            name: exercise.category,
                          },
                        }}
                        key={exercise.category}
                        asChild
                      >
                        <TouchableOpacity>
                          <View className="rounded-xl bg-white/25 dark:bg-black/60 backdrop-blur-3xl p-4 justify-between flex-row items-center">
                            <Text className="text-white text-md font-medium">
                              {exercise.category}
                            </Text>
                            <View className="flex-row items-center gap-x-3">
                              <Text className="text-white">
                                {exercise.completed}/{exercise.total}
                              </Text>
                              <IconSymbol
                                name="arrow.forward.circle"
                                size={22}
                                color="white"
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </Link>
                    );
                  })}
                </View>
              </LinearGradient>
            </View>
            <View className="mx-5 mb-5">
              <View className="">
                <LinearGradient
                  colors={["rgba(191,26,93,1)", "rgba(243,63,94,1)"]}
                  start={{ x: 0.4, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ borderRadius: 10 }}
                >
                  <View className="flex-row h-36 w-full">
                    <View className="flex-col mx-3 my-2 justify-between">
                      <View className="flex-row justify-between w-full items-center">
                        <View className="flex-row items-center gap-x-1">
                          <IconSymbol name="flame.fill" color="#ff8d01" />
                          <Text className="text-[#ff8d01] text-2xl text-center font-bold">
                            Activity
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-x-2">
                          <Text className="text-white font-semibold">
                            {new Date().toLocaleTimeString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Text>
                          <IconSymbol
                            name="chevron.right"
                            color="white"
                            size={15}
                          />
                        </View>
                      </View>
                      <View className="flex-row justify-between items-baseline">
                        <View className="flex-row items-baseline gap-x-1">
                          <Text className="text-3xl text-center dark:text-gray-300 font-bold text-gray-200">
                            {totalWorkouts ?? 0}
                          </Text>
                          <Text className="text-gray-300 font-medium">
                            workouts
                          </Text>
                        </View>
                        <Image
                          source={require("../../assets/charts/graphImage2.png")}
                          style={{ width: 50, height: 50 }}
                          contentFit="cover"
                        />
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
            <View className="mx-5 mb-5 bg-zinc-800 rounded-xl">
              <View className="flex-row h-36 w-full">
                <View className="flex-col mx-3 my-2 justify-between">
                  <View className="flex-row justify-between w-full items-center">
                    <View className="flex-row items-center gap-x-1">
                      <IconSymbol name="clock.fill" color="#cfcfcf" />
                      <Text className="text-[#cfcfcf] text-2xl text-center font-bold">
                        Time Spent
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-x-2">
                      <Text className="text-white font-semibold">Thursday</Text>
                      <IconSymbol
                        name="chevron.right"
                        color="white"
                        size={15}
                      />
                    </View>
                  </View>
                  <View className="flex-row justify-between items-baseline">
                    <View className="flex-row items-baseline gap-x-1">
                      <Text className="text-3xl text-center dark:text-gray-300 font-bold text-gray-200">
                        {Math.round(totalWorkouts! * 6.73)}
                      </Text>
                      <Text className="text-gray-300 font-medium">minutes</Text>
                    </View>
                    <Image
                      source={require("../../assets/charts/graphImage.png")}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="absolute bottom-2 right-3 left-3 z-50 shadow-md">
            <Link href={"/(tabs)/exercises"} asChild>
              <TouchableOpacity className="dark:bg-zinc-900 active:bg-zinc-700 bg-white rounded-md w-full py-4">
                <Text className="text-center font-semibold dark:text-gray-200">
                  Continue to exercises
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      )}

      <StatusBar />
    </SafeAreaView>
  );
}
