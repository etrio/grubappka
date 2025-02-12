import { Link, router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

type ActivityType = {
  id: string;
  name: string;
  color: string;
};

export function Activity({ id, name, color }: ActivityType) {
  return (
    <Link href={{ pathname: "/activity/[id]", params: {id: id, name: name, color: color}}} asChild >
      <TouchableOpacity className={`rounded-2xl w-full py-24 my-4 ${color}`}>
        <Text className="text-white text-4xl text-center font-bold">
          {name}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
