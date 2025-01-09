import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ActionButtonProps = {
    text: string;
    icon?: ReactNode;
    isSelected: boolean;
    onPress: () => void;
};

export default function ActionButton({
    text,
    isSelected,
    icon,
    onPress,
}: ActionButtonProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                className={`rounded-3xl ${isSelected ? "bg-indigo-700" : "bg-indigo-900"
                    }`}
            >
                <View className="w-28 h-28 justify-center items-center flex-row gap-x-2">
                    <Text className="text-2xl dark:text-white">{text}</Text>
                    {icon}
                </View>
            </View>
        </TouchableOpacity>
    );
}