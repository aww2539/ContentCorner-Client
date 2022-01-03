import { useHistory } from "react-router"
import { useState } from "react/cjs/react.development"
import { useParams } from "react-router-dom"
import { createComment } from "./CommentManager"
import "./Comment.css"


export const CreateComment = () => {
    const [newComment, updateNewComment] = useState({
        body: ""
    })
    const { groupId, categoryId, postId } = useParams()
    const history = useHistory()

    const saveNewComment = (event) => {
        event.preventDefault()

        const CommentData = {
            body: newComment.body,
            postId: postId,
            timestamp: Date.now(),
        }

        createComment(CommentData)
        .then(() => {
            history.push(`/group/${groupId}/category/${categoryId}/post/${postId}`)
        })
    }


    return (
        <>
            <section className="newComment__form">
                <button className="newComment" onClick={() => {history.push(`/group/${groupId}/post/${postId}`)}}>Cancel</button>
                <h2>New Comment?</h2>
                <div>
                    <form className="newComment">
                        <fieldset className="newComment">
                            <div className="form-Comment">
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...newComment}
                                            copy.body = evt.target.value
                                            updateNewComment(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    placeholder="New Comment..."
                                />
                            </div>
                        </fieldset>
                        <button className="newComment" onClick={saveNewComment}>
                            Create Comment!
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}