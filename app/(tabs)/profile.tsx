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
import Slider from "@react-native-community/slider";

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
    <SafeAreaView className="flex-1 dark:bg-[#1b1b1b] bg-[#f8f4f4]">
      <View className="dark:bg-[#1b1b1b] bg-[#f8f4f4] dark:border-b-0 border-b-2 border-b-[#ebe7e7]">
        <View className="flex-row justify-between mx-5 items-center">
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
          <Text className="dark:text-white text-4xl my-3 font-semibold">
            Profil
          </Text>
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
      </View>
      <View className="items-center gap-y-4 h-full dark:bg-[#0c0c0c]">
        <View className="bg-[#7e7c7c] rounded-full mt-8 w-24 h-24 justify-center items-center">
          <Text className="text-gray-200 text-4xl">
            {user?.name.slice(0, 1)}
          </Text>
        </View>
        <Text className="dark:text-white text-3xl font-semibold">
          {isEditing ? (
            <TextInput
              defaultValue={user?.name}
              onChangeText={(text) => setName(text)}
              className="w-full font-bold text-center text-3xl dark:text-gray-300"
            />
          ) : (
            <Text className="dark:text-gray-300 font-bold text-3xl">
              {user?.name}
            </Text>
          )}
        </Text>
        {/* stats */}
        <View className="w-full gap-y-4 py-6">
          <View className="mx-5 gap-y-4 p-6 border-gray-600 dark:border-gray-800 rounded-md border">
            <View className="flex-row justify-between items-center">
              <Text className="dark:text-gray-300 font-bold text-2xl">
                WIEK:
              </Text>
              {isEditing ? (
                <TextInput
                  defaultValue={user?.age}
                  inputMode="numeric"
                  onChangeText={(text) => setAge(text)}
                  className="border-b-2 w-min h-10 text-center border-b-orange-500 rounded-md text-2xl font-bold dark:text-white"
                />
              ) : (
                <Text className="dark:text-gray-300 font-bold text-2xl">
                  {user?.age}
                </Text>
              )}
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="dark:text-gray-300 font-bold text-2xl">
                WAGA:
              </Text>
              {isEditing ? (
                <TextInput
                  defaultValue={user?.weight}
                  inputMode="numeric"
                  onChangeText={(text) => setWeight(text)}
                  className="border-b-2 w-min h-10 text-center text-2xl font-bold border-b-orange-500 rounded-md dark:text-white flex"
                />
              ) : (
                <Text className="dark:text-gray-300 font-bold text-2xl">
                  {user?.weight}
                </Text>
              )}
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="dark:text-gray-300 font-bold text-2xl">
                WZROST:
              </Text>
              {isEditing ? (
                <TextInput
                  defaultValue={user?.height}
                  inputMode="numeric"
                  onChangeText={(text) => setHeight(text)}
                  className="border-b-2 w-min h-10 text-2xl font-bold text-center border-b-orange-500 rounded-md dark:text-white"
                />
              ) : (
                <Text className="dark:text-gray-300 font-bold text-2xl">
                  {user?.height}
                </Text>
              )}
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="dark:text-gray-300 font-bold text-2xl">
                PŁEĆ:
              </Text>
              {isEditing ? (
                <View className="flex-row items-center justify-center gap-x-5">
                  <Text className="dark:text-white text-2xl font-semibold">
                    M
                  </Text>
                  <Slider
                    style={{ width: 100, height: 20 }}
                    minimumValue={1}
                    maximumValue={2}
                    step={1}
                    onValueChange={(value) =>
                      setSelectedGender(value.toString() == '1' ? "M" : "K")
                    }
                    minimumTrackTintColor={
                      theme === "dark" ? "#ffffff" : "#000000"
                    }
                    maximumTrackTintColor={
                      theme === "dark" ? "#ffffff" : "#000000"
                    }
                  />
                  <Text className="dark:text-white text-2xl font-semibold">
                    K
                  </Text>
                </View>
              ) : (
                <Text className="dark:text-gray-300 font-bold text-2xl">
                  {user?.gender}
                </Text>
              )}
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="dark:text-gray-300 font-bold text-2xl">
                AKTYWNOŚĆ:
              </Text>
              {isEditing ? (
                <View className="flex-row items-center gap-x-4">
                  <Text className="dark:text-white text-2xl font-semibold">
                    1
                  </Text>
                  <Slider
                    style={{ width: 100, height: 20 }}
                    minimumValue={1}
                    maximumValue={3}
                    step={1}
                    onValueChange={(value) =>
                      setSelectedActivity(value.toString())
                    }
                    minimumTrackTintColor={
                      theme === "dark" ? "#ffffff" : "#000000"
                    }
                    maximumTrackTintColor={
                      theme === "dark" ? "#ffffff" : "#000000"
                    }
                  />
                  <Text className="dark:text-white text-2xl font-semibold">
                    3
                  </Text>
                </View>
              ) : (
                <Text className="dark:text-gray-300 font-bold text-2xl">
                  {user?.activity === "1"
                    ? "NISKA"
                    : user?.activity === "2"
                    ? "ŚREDNIA"
                    : "WYSOKA"}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
