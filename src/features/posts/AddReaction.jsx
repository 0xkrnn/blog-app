import { useDispatch } from "react-redux";
import { addReactions } from "./postSlice";

function AddReaction({ post }) {

    const reactionEmoji = {
        thumpsup: "👍",
        like: "🖤",
        angry: "😠"
    }

    const dispatch = useDispatch()

    const buttons = Object.entries(reactionEmoji).map(([reaction, emoji]) => {
        return <button
            type="button"
            key={reaction}
            onClick={() => {
                dispatch(addReactions({ postid: post.id, reaction }))
            }}
        >
            {emoji} - {post.reactions[reaction]}
        </button>
    })

    return (
        <div>
            <section className="button-sec">
                {buttons}
            </section>
        </div>
    );
}

export default AddReaction;