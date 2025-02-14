import { Link, router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

type ActivityType = {
  id: string;
  name: string;
  displayedName: string;
  color: string;
};

export function Activity({ id, name, displayedName, color }: ActivityType) {
  return (
    <Link href={{ pathname: "/activity/[id]", params: {id: id, name: name, displayedName: displayedName}}} asChild >
      <TouchableOpacity className={`rounded-2xl w-full py-24 my-4 ${color}`}>
        <Text className="text-white text-4xl text-center font-bold">
          {displayedName}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
