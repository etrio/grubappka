import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  useColorScheme,
} from "react-native";

import * as SecureStore from "expo-secure-store";
import { useCallback, useState } from "react";
import { User } from "@/types/User";
import { router, useFocusEffect } from "expo-router";
import { Feather } from "@expo/vector-icons";
import ActionButton from "@/components/ActionButton";
import { colorScheme } from "nativewind";

export default function TabThreeScreen() {
  const [user, setUser] = useState<User>();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState<string>();
  const [age, setAge] = useState<string>();
  const [weight, setWeight] = useState<string>();
  const [height, setHeight] = useState<string>();
  const [selectedActivity, setSelectedActivity] = useState<string>();
  const [selectedGender, setSelectedGender] = useState<string>();
  const theme = useColorScheme();

  const getData = async () => {
    const result = await SecureStore.getItemAsync("user");
    if (result) {
      setUser(JSON.parse(result));
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData().catch((error) => {
        console.log(error);
      });
    }, [])
  );

  const deleteUser = async () => {
    await SecureStore.deleteItemAsync("user");
    router.navigate("/(tabs)");
  };

  const saveUser = async () => {
    const data = await SecureStore.getItemAsync("user");
    const user: User = JSON.parse(data!);

    const editedUser: User = {
      name: name == null ? user.name : name,
      height: height == null ? user.height : height,
      weight: weight == null ? user.weight : weight,
      age: age == null ? user.age : age,
      gender: selectedGender == null ? user.gender : selectedGender,
      activity: selectedActivity == null ? user.activity : selectedActivity,
    };

    console.log("full send", JSON.stringify(editedUser));
    await SecureStore.deleteItemAsync("user");
    await SecureStore.setItemAsync("user", JSON.stringify(editedUser));
    getData();
    setIsEditing(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between mx-5">
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          {isEditing ? (
            <Feather
              name="x"
              size={24}
              color={theme == "dark" ? "orange" : "black"}
            />
          ) : (
            <Feather
              name="edit-2"
              size={24}
              color={theme == "dark" ? "orange" : "black"}
            />
          )}
        </TouchableOpacity>
        <Text className="dark:text-white text-3xl font-bold">Profile</Text>
        {isEditing ? (
          <TouchableOpacity onPress={() => saveUser()}>
            <Feather
              name="check"
              size={24}
              color={theme == "dark" ? "orange" : "black"}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => deleteUser()}>
            <Feather
              name="trash-2"
              size={24}
              color={theme == "dark" ? "orange" : "black"}
            />
          </TouchableOpacity>
        )}
      </View>
      <View className="items-center justify-center mt-5 gap-y-4">
        <View className="bg-[#7e7c7c] rounded-full w-24 h-24 justify-center items-center">
          <Text className="text-gray-200 text-4xl">
            {user?.name.slice(0, 1)}
          </Text>
        </View>
        <Text className="dark:text-white text-3xl font-semibold">
          {isEditing ? (
            <TextInput
              defaultValue={user?.name}
              onChangeText={(text) => setName(text)}
              className="border-2 w-full py-4 text-center text-3xl rounded-md dark:text-white"
            />
          ) : (
            <Text className="dark:text-gray-300 font-bold text-3xl">
              {user?.name}
            </Text>
          )}
        </Text>
        {/* stats */}
        <View className="w-full px-3 gap-y-4">
          <View className="flex-row justify-between items-center">
            <Text className="dark:text-gray-300 font-bold text-2xl">AGE:</Text>
            {isEditing ? (
              <TextInput
                defaultValue={user?.age}
                inputMode="numeric"
                onChangeText={(text) => setAge(text)}
                className="border-2 w-10 h-10 text-center border-b-orange-500 rounded-md dark:text-white"
              />
            ) : (
              <Text className="dark:text-gray-300 font-bold text-2xl">
                {user?.age}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="dark:text-gray-300 font-bold text-2xl">WEIGHT:</Text>
            {isEditing ? (
              <TextInput
                defaultValue={user?.weight}
                inputMode="numeric"
                onChangeText={(text) => setWeight(text)}
                className="border-2 w-10 h-10 text-center border-b-orange-500 rounded-md dark:text-white flex"
              />
            ) : (
              <Text className="dark:text-gray-300 font-bold text-2xl">
                {user?.weight}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="dark:text-gray-300 font-bold text-2xl">
              HEIGHT:
            </Text>
            {isEditing ? (
              <TextInput
                defaultValue={user?.height}
                inputMode="numeric"
                onChangeText={(text) => setHeight(text)}
                className="border-2 w-10 h-10 text-center border-b-orange-500 rounded-md dark:text-white"
              />
            ) : (
              <Text className="dark:text-gray-300 font-bold text-2xl">
                {user?.height}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="dark:text-gray-300 font-bold text-2xl">GENDER:</Text>
            {isEditing ? (
              <View className="flex-row items-center justify-center gap-x-5">
                <TouchableOpacity onPress={() => setSelectedGender("M")}>
                  <View
                    className={`rounded-md ${
                      selectedGender === "M"
                        ? "bg-orange-600 "
                        : "bg-orange-800"
                    }`}
                  >
                    <Text className="text-white text-2xl px-2">M</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedGender("K")}>
                  <View
                    className={`rounded-md ${
                      selectedGender === "K"
                        ? "bg-orange-600 "
                        : "bg-orange-800"
                    }`}
                  >
                    <Text className="text-white text-2xl px-2">K</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <Text className="dark:text-gray-300 font-bold text-2xl">
                {user?.gender}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="dark:text-gray-300 font-bold text-2xl">
              ACTIVITY:
            </Text>
            {isEditing ? (
              <View className="flex-row items-center justify-center gap-x-4">
                <TouchableOpacity onPress={() => setSelectedActivity("low")}>
                  <View
                    className={`rounded-md ${
                      selectedActivity === "low"
                        ? "bg-orange-600 "
                        : "bg-orange-800"
                    }`}
                  >
                    <Text className="text-white text-2xl px-3">1</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedActivity("medium")}>
                  <View
                    className={`rounded-md ${
                      selectedActivity === "medium"
                        ? "bg-orange-600 "
                        : "bg-orange-800"
                    }`}
                  >
                    <Text className="text-white text-2xl px-3">2</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedActivity("high")}>
                  <View
                    className={`rounded-md ${
                      selectedActivity === "high"
                        ? "bg-orange-600 "
                        : "bg-orange-800"
                    }`}
                  >
                    <Text className="text-white text-2xl px-3">3</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <Text className="dark:text-gray-300 font-bold text-2xl">
                {user?.activity}
              </Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
