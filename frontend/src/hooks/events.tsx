import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useSupabase from "./useSupabase";
import { Database } from "@/app/database.types";

export type Event = Database["public"]["Tables"]["Event"]["Row"];

export function useGetEvents() {
  const client = useSupabase();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getEvents"],
    queryFn: async () => {
      const { data, error } = await client.from("Event").select("*");
      console.log(error);
      return data as Event[];
    },
  });

  return { data, isLoading, isError };
}

export function usePostEvent() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const postEvent = async (event: Event) => {
    const { data, error } = await client.from("Event").insert(event);
    console.log(error);
    return data;
  };

  return useMutation({
    mutationFn: postEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEvents"] });
    },
  });
}

export function useEditEvent() {
  const client = useSupabase();

  const editEvent = async (event: Event) => {
    const { data, error } = await client
      .from("Event")
      .update(event)
      .match({ id: event.id });
    console.log(error);
    return data;
  };

  return useMutation({
    mutationFn: editEvent,
    onSuccess: () => {
      console.log("Event edited");
    },
  });
}
