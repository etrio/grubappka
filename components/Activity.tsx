import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";

type ActivityType = {
  id: string;
  name: string;
};

export function Activity({ id, name }: ActivityType) {
  useEffect(() => {
    console.log("id", id, "name", name);
  }, []);
  return (
    <Link
      href={{ pathname: "/activity/[id]", params: { id: id, name: name } }}
      asChild
    >
      <TouchableOpacity
        className={`rounded-2xl w-full py-24 my-4 bg-[#e1275f]`}
      >
        <Text className="text-white text-4xl text-center font-bold">
          {name}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
