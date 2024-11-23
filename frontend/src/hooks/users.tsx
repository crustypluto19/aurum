import { Database } from "@/app/database.types";
import useSupabase from "./useSupabase";
import { useMutation, useQuery } from "@tanstack/react-query";

type User = Database["public"]["Tables"]["User"]["Row"];

export function useGetUserByAccountAddress(accountAddress: string) {
  const client = useSupabase();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getUserByAccountAddress", accountAddress],
    queryFn: async () => {
      const { data, error } = await client
        .from("User")
        .select("*")
        .eq("account_address", accountAddress)
        .limit(1);
      console.log(error);

      return data ? (data[0] as User) : null;
    },
  });

  return { data, isLoading, isError };
}

export function useEditUser() {
  const client = useSupabase();

  const editUser = async (user: User) => {
    const { data, error } = await client
      .from("User")
      .update(user)
      .match({ id: user.id });
    console.log(error);
    return data;
  };

  return useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      console.log("User edited");
    },
  });
}
