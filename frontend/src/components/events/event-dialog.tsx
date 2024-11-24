import { Event } from "@/hooks/events";

type EventDialogProps = {
  event: Event;
};

const EventDialog = ({ event }: EventDialogProps) => {
  return (
    <dialog id={`${event.id}`} className="modal">
      <form method="dialog" className="modal-box">
        <div className="card glass w-full">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="car!"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{event?.title}</h2>
            <p>How to park your car at your garage?</p>
            <div className="card-actions justify-end"></div>
            <div className="modal-action justify-between">
              <button className="btn">Close</button>
              <button className="btn btn-secondary">Learn now!</button>
            </div>
          </div>
        </div>
      </form>
    </dialog>
  );
};
export default EventDialog;
