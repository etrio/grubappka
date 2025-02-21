import { User } from "@/types/User";
import { supabase } from "./supabase";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export async function loadUser() {
  try {
    const id = await SecureStore.getItemAsync("user_id");

    if (!id) return null;

    const { data, error } = await supabase
      .from("users")
      .select(`user_id, name, age, weight, height, activity, gender`)
      .eq("user_id", id)
      .single();

    if (error) throw error;

    return data as User;
  } catch (error) {
    console.log("Error loading user", error);
    return null;
  }
}

export async function deleteUser() {
  try {
    const id = await SecureStore.getItemAsync("user_id");

    const { error } = await supabase.from("users").delete().eq("user_id", id);

    if (error) throw error;

    router.navigate("/(tabs)");

    await SecureStore.deleteItemAsync("user_id");
  } catch (error) {
    console.log("Error deleting user", error);
    return null;
  }
}

export async function editUser(user: User) {
  try {
    const id = await SecureStore.getItemAsync("user_id");

    const { error } = await supabase
      .from("users")
      .update(user)
      .eq("user_id", id);

      if (error) throw error;
  } catch (error) {
    console.log('Error updating user', error);
    return null;
  }
}
