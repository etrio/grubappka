import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
        className={`rounded-3xl ${
          isSelected ? "bg-[#aa0236]" : "bg-[#e1275f]"
        }`}
        style={{ width: size, height: size }}
      >
        <View
          style={{ width: size, height: size }}
          className="justify-center items-center flex-row gap-x-2"
        >
          <Text className="text-2xl text-white">{text}</Text>
          {icon}
        </View>
      </View>
    </TouchableOpacity>
  );
}
