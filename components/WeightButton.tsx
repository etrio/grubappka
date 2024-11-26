import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type WeightButtonProps = {
  text: string;
  weight: string;
  isSelected: boolean;
  onPress: () => void;
};

export default function WeightButton({
  text,
  weight,
  isSelected,
  onPress,
}: WeightButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`rounded-3xl ${
          isSelected ? "bg-indigo-700" : "bg-indigo-900"
        }`}
      >
        <View className="w-28 h-28 justify-center items-center flex-row gap-x-2">
          <Text className="text-2xl dark:text-white">{weight}</Text>
          <MaterialCommunityIcons
            name="weight-kilogram"
            size={24}
            color="white"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
