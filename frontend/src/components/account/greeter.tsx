import { useEditUser, useGetUserByAccountAddress } from "@/hooks/users";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type GreeterProps = {
  address: string;
};

const Greeter = (props: GreeterProps) => {
  const { address, ...rest } = props;
  const { data: user, isLoading } = useGetUserByAccountAddress(
    address.toString()
  );
  const { mutateAsync: editUser } = useEditUser();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (isLoading) {
    return <div className="skeleton"></div>;
  }

  const onSubmit = async (data: any) => {
    console.log({ ...user, ...data });
    await editUser({ ...user, ...data }).then(() => {
      toast.success("User updated");
      // invalidate query to refetch user
      queryClient.invalidateQueries({
        queryKey: ["getUserByAccountAddress", address],
      });
      reset();
    });
  };

  return (
    <div className="py-4">
      {user && user.name ? (
        <div>
          <h1 className="hero text-5xl font-bold">
            Welcome back, {user.name}!
          </h1>
        </div>
      ) : (
        <div className="space-y-2">
          <h1 className="text-5xl font-bold">Hello stranger!</h1>
          <p>Would you like to introduce yourself?</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-x-2 space-y-2"
          >
            <input
              type="text"
              placeholder="Your name here..."
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary" type="submit">
              Call me by my name!
            </button>
            <p className="text-red-500">
              {errors.name && typeof errors.name.message === "string" && (
                <span>{errors.name.message}</span>
              )}
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Greeter;
