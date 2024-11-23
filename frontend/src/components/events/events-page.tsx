"use client";

import { useGetEvents } from "@/hooks/events";
import EventCard from "@/components/events/event-card";
import { useState } from "react";

const EventsPage = () => {
  const { data, isLoading, isError } = useGetEvents();
  const [event, setEvent] = useState(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  function chooseEvent(event) {
    console.log(event);
    setEvent(event);
  }

  return (
    <div>
    <div className="flex flex-col mt-4 min-w-[65vw]">
      <div className="flex justify-end">
        <button className="btn btn-primary">Create Event</button>
      </div>
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
            <tr key={event.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{event.title}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex flex-col">
                  <div>
                    On {event.date}
                  </div>
                  <div>
                    At {event.time}
                  </div>
                </div>
              </td>
              <td>
                <div className="flex align-middle">
                  {event.members!.length}/{event.num_members}
                </div>
              </td>
              <td>
                <button className="btn btn-primary" onClick={()=>document.getElementById('detailModal')!.showModal()}>See more</button>
                <dialog id="detailModal" className="modal">
                  <form method="dialog" className="modal-box">
                    <div className="card glass w-96">
                        <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="car!" />
                        </figure>
                        <div className="card-body">
                        <h2 className="card-title">{event.title}</h2>
                        <p>{event.description}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Join</button>
                        </div>
                        </div>
                    </div>          
                    <div className="modal-action">
                        <button className="btn">Close</button>
                    </div>
                  </form>
                </dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
     
    </div>
  );
};

export default EventsPage;
