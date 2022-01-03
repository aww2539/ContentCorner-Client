import { useHistory } from "react-router"
import { useState } from "react/cjs/react.development"
import { useParams } from "react-router-dom"
import { getCommentById, updateComment } from "./CommentManager"
import "./Comment.css"
import { useEffect } from "react"


export const EditComment = () => {
    const [comment, setComment] = useState({
        body: ""
    })
    const { groupId, postId, commentId, categoryId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getCommentById(commentId)
        .then((data) => {setComment(data)})
    }, [])

    const saveComment = (event) => {
        event.preventDefault()

        const CommentData = {
            body: comment.body,
            postId: postId,
            timestamp: Date.now(),
        }

        updateComment(CommentData, commentId)
        .then(() => {
            history.push(`/group/${groupId}/category/${categoryId}/post/${postId}`)
        })
    }


    return (
        <>
            <section className="editComment__form">
                <button className="editComment" onClick={() => {history.push(`/group/${groupId}/category/${categoryId}/post/${postId}`)}}>Cancel</button>
                <h2>Edit Comment</h2>
                <div>
                    <form className="editComment">
                        <fieldset className="editComment">
                            <div className="form-Comment">
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...comment}
                                            copy.body = evt.target.value
                                            setComment(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    defaultValue={comment.body}
                                />
                            </div>
                        </fieldset>
                        <button className="editComment" onClick={(e) => saveComment(e)}>
                            Update Comment!
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}