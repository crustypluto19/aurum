"use client";

import { Event, useGetEvents } from "@/hooks/events";
import { useState } from "react";
import EventDialog from "./event-dialog";
import EventCreationModal from "./event-creation-modal";

const EventsPage = () => {
  const { data, isLoading, isError } = useGetEvents();
  const [event, setEvent] = useState<Event>();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  function chooseEvent(event: Event) {
    setEvent(event);
  }

  return (
    <div className="flex flex-col mt-4 min-w-[95vw]">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold ">Events</h2>
        <button
          className="btn btn-primary"
          onClick={(event) => {
            console.log("Create Event");
            (
              document.getElementById(`createEvent`) as HTMLDialogElement
            )?.showModal();
          }}
        >
          Create Event
        </button>
        <EventCreationModal />
      </div>
      <div className="divider" />
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Time</th>
              <th>Members</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((event) => (
              <tr
                key={event.id}
                className="bg-neutral hover:bg-base-200 transition-colors duration-500 hover:cursor-pointer"
                onClick={() =>
                  (
                    document.getElementById(`${event.id}`) as HTMLDialogElement
                  )?.showModal()
                }
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{event.title}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    <div>On {event.date}</div>
                    <div>At {event.time}</div>
                  </div>
                </td>
                <td>
                  <div className="flex align-middle">
                    {event.members?.length}/{event.num_members}
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-neutral btn-sm"
                    onClick={() =>
                      (
                        document.getElementById(
                          `${event.id}`
                        ) as HTMLDialogElement
                      )?.showModal()
                    }
                  >
                    …
                  </button>
                  <EventDialog event={event} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsPage;
