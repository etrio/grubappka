import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  useColorScheme,
} from "react-native";

import { useCallback, useState } from "react";
import { User } from "@/types/User";
import { useFocusEffect } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { deleteUser, editUser, loadUser } from "@/lib/user";
import { IconSymbol } from "@/components/ui/IconSymbol";

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
    const user = await loadUser();
    if (user) {
      setUser(user);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const editProfile = async () => {
    if (user) {
      const editedUser: User = {
        user_id: user.user_id,
        name: name == null ? user.name : name,
        height: height == null ? user.height : height,
        weight: weight == null ? user.weight : weight,
        age: age == null ? user.age : age,
        gender: selectedGender == null ? user.gender : selectedGender,
        activity: selectedActivity == null ? user.activity : selectedActivity,
      };

      console.log("full send", editedUser);
      await editUser(editedUser);
      getData();
      setIsEditing(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 dark:bg-[#000000] bg-[#ffffff]">
      <View className="dark:bg-[#000000] bg-[#ffffff]">
        <View className="flex-row justify-between mx-5 items-center">
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            {isEditing ? (
              <Feather name="x" size={24} color="#e1275f" />
            ) : (
              <Feather name="edit-2" size={24} color="#e1275f" />
            )}
          </TouchableOpacity>
          <Text className="dark:text-white text-4xl my-3 font-semibold">
            Profile
          </Text>
          {isEditing ? (
            <TouchableOpacity onPress={() => editProfile()}>
              <Feather name="check" size={24} color="#e1275f" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => deleteUser()}>
              <Feather name="trash-2" size={24} color="#e1275f" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View className="items-center gap-y-4">
        <View className="bg-[#7e7c7c] rounded-full mt-8 w-24 h-24 items-center justify-center">
          <Text className="text-gray-200 text-5xl">
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
      </View>
      {/* stats */}
      {isEditing ? (
        <View className="m-5 gap-y-5">
          {/* age */}
          <View className="gap-y-2">
            <Text className="dark:text-white text-xl font-semibold">Age</Text>
            <TextInput
              defaultValue={user?.age}
              inputMode="numeric"
              onChangeText={(text) => setAge(text)}
              className="border-2 p-2 border-[#e1275f] rounded-sm text-xl font-bold dark:text-white"
              style={{
                textAlignVertical: "center",
                height: 50,
                paddingVertical: 0,
              }}
            />
          </View>
          {/* height */}
          <View className="gap-y-2">
            <Text className="dark:text-white text-xl font-semibold">
              Height
            </Text>
            <TextInput
              defaultValue={user?.height}
              inputMode="numeric"
              onChangeText={(text) => setHeight(text)}
              className="border-2 p-2 border-[#e1275f] rounded-sm text-xl font-bold dark:text-white"
              style={{
                textAlignVertical: "center",
                height: 50,
                paddingVertical: 0,
              }}
            />
          </View>
          {/* weight */}
          <View className="gap-y-2">
            <Text className="dark:text-white text-xl font-semibold">
              Weight
            </Text>
            <TextInput
              defaultValue={user?.weight}
              inputMode="numeric"
              onChangeText={(text) => setWeight(text)}
              className="border-2 p-2 border-[#e1275f] rounded-sm text-xl font-bold dark:text-white"
              style={{
                textAlignVertical: "center",
                height: 50,
                paddingVertical: 0,
              }}
            />
          </View>
          {/* activity */}
          <View className="gap-y-2">
            <Text className="dark:text-white text-xl font-semibold">
              Activity
            </Text>
            <View className="mx-5 flex-row items-center justify-center gap-x-4">
              <Text className="dark:text-white text-2xl font-semibold">1</Text>
              <Slider
                style={{ width: "100%", height: 20 }}
                minimumValue={1}
                maximumValue={3}
                step={1}
                onValueChange={(value) => setSelectedActivity(value.toString())}
                minimumTrackTintColor={theme === "dark" ? "#ffffff" : "#000000"}
                maximumTrackTintColor={theme === "dark" ? "#ffffff" : "#000000"}
              />
              <Text className="dark:text-white text-2xl font-semibold">3</Text>
            </View>
          </View>
        </View>
      ) : (
        <ScrollView className="flex-1 mt-5">
          <View className="gap-y-3">
            {/* height */}
            <View className="w-full mt-5 shadow-md">
              <View className="h-32 mx-5 rounded-lg bg-white dark:bg-zinc-900">
                <View className="flex-col justify-between h-full">
                  <View className="flex-row justify-between m-3">
                    <View className="flex-row items-center gap-x-1">
                      <IconSymbol name="figure" color="violet" size={22} />
                      <Text className="font-semibold text-[#ee82ee]">
                        Height
                      </Text>
                    </View>
                    <View className="flex-row gap-x-2 items-center">
                      <Text className="text-gray-400 font-medium">
                        Feb 2025
                      </Text>
                      <IconSymbol name="chevron.right" color="gray" size={15} />
                    </View>
                  </View>
                  <View className="flex-row gap-x-1 m-3 items-baseline">
                    <Text className="font-semibold dark:text-white text-3xl">
                      {user?.height}
                    </Text>
                    <Text className="font-semibold text-gray-400">cm</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* weight */}
            <View className="w-full shadow-md">
              <View className="h-32 mx-5 rounded-lg bg-white dark:bg-zinc-900">
                <View className="flex-col justify-between h-full">
                  <View className="flex-row justify-between m-3">
                    <View className="flex-row items-center gap-x-1">
                      <IconSymbol name="figure" color="violet" size={22} />
                      <Text className="font-semibold text-[#ee82ee]">
                        Weight
                      </Text>
                    </View>
                    <View className="flex-row gap-x-2 items-center">
                      <Text className="text-gray-400 font-medium">
                        Feb 2025
                      </Text>
                      <IconSymbol name="chevron.right" color="gray" size={15} />
                    </View>
                  </View>
                  <View className="flex-row gap-x-1 m-3 items-baseline">
                    <Text className="font-semibold dark:text-white text-3xl">
                      {user?.weight}
                    </Text>
                    <Text className="font-semibold text-gray-400">kg</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* age */}
            <View className="w-full shadow-md">
              <View className="h-32 mx-5 rounded-lg bg-white dark:bg-zinc-900">
                <View className="flex-col justify-between h-full">
                  <View className="flex-row justify-between m-3">
                    <View className="flex-row items-center gap-x-1">
                      <IconSymbol name="figure" color="violet" size={22} />
                      <Text className="font-semibold text-[#ee82ee]">Age</Text>
                    </View>
                    <View className="flex-row gap-x-2 items-center">
                      <Text className="text-gray-400 font-medium">
                        Feb 2025
                      </Text>
                      <IconSymbol name="chevron.right" color="gray" size={15} />
                    </View>
                  </View>
                  <View className="flex-row gap-x-1 m-3 items-baseline">
                    <Text className="font-semibold dark:text-white text-3xl">
                      {user?.age}
                    </Text>
                    <Text className="font-semibold text-gray-400">
                      years old
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
