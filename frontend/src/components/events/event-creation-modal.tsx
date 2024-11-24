import { usePostEvent } from "@/hooks/events";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRef } from "react";

type FormValues = {
  title: string;
  description: string;
};

const EventCreationModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { mutateAsync } = usePostEvent();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await mutateAsync(data as any);
    dialogRef.current?.close();
  };

  return (
    <dialog id="createEvent" className="modal" ref={dialogRef}>
      <form onSubmit={handleSubmit(onSubmit)} className="modal-box">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Create Event</h2>
          <label className="input input-bordered flex items-center gap-2">
            Title
            <input
              {...register("title", { required: true })}
              type="text"
              className="grow"
              placeholder="Very Fun Event Title"
            />
            {errors.title && (
              <span className="text-red-500">This field is required</span>
            )}
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Description
            <input
              {...register("description", { required: true })}
              type="text"
              className="grow"
              placeholder="Write a meaningful description here…"
            />
            {errors.description && (
              <span className="text-red-500">This field is required</span>
            )}
          </label>
        </div>
        <div className="modal-action justify-between">
          <button
            type="button"
            className="btn"
            onClick={() => dialogRef.current?.close()}
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default EventCreationModal;
