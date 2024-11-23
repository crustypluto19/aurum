import { TypedSupabaseClient } from "@/utils/types";
const EventCard = ({ event }) => {
    console.log(event);

    return (
        <dialog id="detailModal" className="modal">
        <form method="dialog" className="modal-box">
        <div className="card glass w-96">
            <figure>
            <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="car!" />
            </figure>
            <div className="card-body">
            <h2 className="card-title">{event!.title}</h2>
            <p>How to park your car at your garage?</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Learn now!</button>
            </div>
            </div>
        </div>          
        <div className="modal-action">
            <button className="btn">Close</button>
        </div>
        </form>
    </dialog>
    )
};
export default EventCard;