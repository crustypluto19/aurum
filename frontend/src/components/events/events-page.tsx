"use client";

import { useGetEvents } from "@/hooks/events";

const EventsPage = () => {
  const { data, isLoading, isError } = useGetEvents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      {data?.map((event) => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
};

export default EventsPage;
