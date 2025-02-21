import { Category } from "@/types/Category";
import { supabase } from "./supabase";

export async function updateExercise(id: string) {
  try {
    const { data, error } = await supabase
      .from("exercises")
      .select("done")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error fetching exercise", error);
      return;
    }

    if (data) {
      const currentState = data.done;
      const state = !currentState;

      await supabase.from("exercises").update({ done: state }).eq("id", id);
    }
  } catch (error) {
    console.log("Error updating exercise", error);
  }
}

export async function getActiveExercises() {
  try {
    // Fetch all exercises with their category and done status
    const { data, error } = await supabase
      .from("exercises")
      .select("category, done");

    if (error) {
      console.error("Error fetching exercises:", error);
      return [];
    }

    // Aggregate the data by category
    const categoryStats = data.reduce((acc, exercise) => {
      if (!acc[exercise.category]) {
        acc[exercise.category] = { total: 0, completed: 0 };
      }

      acc[exercise.category].total += 1; // Increment total exercises
      if (exercise.done) acc[exercise.category].completed += 1; // Increment completed exercises

      return acc;
    }, {} as Record<string, { total: number; completed: number }>);

    // Filter out categories that have no completed exercises and map to desired format
    return Object.entries(categoryStats)
      .filter(([_, stats]) => stats.completed > 0) // Only include categories with completed exercises
      .map(([category, stats]) => ({
        category,
        total: stats.total,
        completed: stats.completed,
      }));
  } catch (error) {
    console.error("Error in getExercisesStatsPerCategory:", error);
    return [];
  }
}

export async function getCategories() {
  try {
    const { data, error } = await supabase.from('categories').select("*");

    if (error) throw error;

    if (data) {
      return data as Category[];
    }
  } catch (error) {
    console.log("Error fetching categories", error);
  }
}