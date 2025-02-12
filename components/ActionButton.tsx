import { ReactNode } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

type ActionButtonProps = {
    text: string;
    icon?: ReactNode;
    isSelected: boolean;
    onPress: () => void;
    size: number;
};

export default function ActionButton({
    text,
    isSelected,
    icon,
    onPress,
    size,
}: ActionButtonProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                className={`rounded-3xl ${isSelected ? "bg-indigo-600" : "bg-indigo-900"}`}
                style={{ width: size, height: size }}
            >
                <View
                    style={{ width: size, height: size }}
                    className="justify-center items-center flex-row gap-x-2"
                >
                    <Text className="text-2xl dark:text-white">{text}</Text>
                    {icon}
                </View>
            </View>
        </TouchableOpacity>
    );
}
