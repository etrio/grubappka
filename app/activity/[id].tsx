import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { updateExercise } from "@/lib/exercise";

interface Exercise {
  id: string;
  name: string;
  category: string;
  equipment: string;
  muscles: string[];
  done: boolean;
  primaryMuscle: string;
  secondaryMuscle: string;
  description: string;
  videoPath: string;
}

export default function Activity() {
  const { name } = useLocalSearchParams<{
    name: string;
  }>();

  const theme = useColorScheme();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchExercises = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("exercises")
        .select(
          "id, name, category, equipment, muscles, done, videoPath, primaryMuscle, secondaryMuscle, description"
        )
        .order("id", { ascending: true })
        .eq("category", name);

      if (error) {
        console.log("Error fetching exercises", error);
        setLoading(false);
        return;
      }

      if (data) {
        setExercises(data);
      }
    } catch (err) {
      console.log("Error fetching exercises [id]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <SafeAreaView className="flex-1 mx-5">
      <View className="mb-5 flex-row justify-between items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol
            size={18}
            name="chevron.backward"
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
        <Text className="dark:text-white font-bold text-3xl text-center">
          {name}
        </Text>
        <IconSymbol
          size={18}
          name="chevron.backward"
          color={theme === "dark" ? "black" : "white"}
        />
      </View>
      <View className="mb-10">
        {loading ? (
          <Text className="dark:text-white text-center">Loading...</Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {exercises
              .filter(
                (exercise) =>
                  exercise.category.toLowerCase() === name.toLowerCase()
              )
              .map((exercise) => (
                <View key={exercise.id} className="mb-6">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="dark:text-white text-2xl font-semibold">
                      {exercise.name}
                    </Text>
                  </View>
                  <Image
                    source={exercise.videoPath}
                    className="w-full rounded-md"
                    style={{ borderRadius: 2, height: 400 }}
                  />
                  <View className="flex-row justify-between mt-2 items-center">
                    <TouchableOpacity
                      onPress={async () => {
                        const updatedExercises = exercises.map((ex) =>
                          ex.id === exercise.id ? { ...ex, done: !ex.done } : ex
                        );
                        setExercises(updatedExercises);
                        console.log(exercise.videoPath);
                        await updateExercise(exercise.id);
                      }}
                    >
                      {exercise.done ? (
                        <IconSymbol
                          name="checkmark"
                          size={24}
                          color={theme === "dark" ? "gray" : "black"}
                        />
                      ) : (
                        <IconSymbol
                          name="plus"
                          size={24}
                          color={theme === "dark" ? "gray" : "black"}
                        />
                      )}
                    </TouchableOpacity>
                    <Link
                      href={{
                        pathname: "/(modals)/infotab",
                        params: {
                          equipment: exercise.equipment,
                          muscles: exercise.muscles,
                          primaryMuscle: exercise.primaryMuscle,
                          secondaryMuscle: exercise.secondaryMuscle,
                          description: exercise.description,
                        },
                      }}
                      asChild
                    >
                      <TouchableOpacity>
                        <IconSymbol
                          name="info.circle"
                          size={24}
                          color={theme === "dark" ? "gray" : "black"}
                        />
                      </TouchableOpacity>
                    </Link>
                  </View>
                </View>
              ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
