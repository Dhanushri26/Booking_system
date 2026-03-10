import { supabase } from "../config/supabaseClient.js"

export async function getResources() {

  const { data, error } =
    await supabase
      .from("resources")
      .select("*")

  if (error) throw new Error(error.message)

  return data

}