import { useHistory } from "react-router"
import { useState } from "react/cjs/react.development"
import { useParams } from "react-router-dom"
import { getPostById, updatePost } from "./PostManager"
import "./Post.css"
import { useEffect } from "react"
import { getCurrentUser } from "../ApiManager"


export const EditPost = () => {
    const [post, setPost] = useState({
        title: "",
        body: ""
    })
    const [currentUser, setCurrentUser] = useState({})
    const { groupId, postId, categoryId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getPostById(postId)
        .then((data) => {setPost(data)})
    }, [])

    useEffect(() => {
        getCurrentUser()
        .then((data) => {setCurrentUser(data)})
    }, [])

    const savePost = (event) => {
        event.preventDefault()

        const PostData = {
            title: post.title,
            body: post.body,
            timestamp: Date.now(),
            userId: currentUser.user.id,
            groupId: groupId,
            categoryId: categoryId
        }

        updatePost(PostData, postId)
        .then(() => {
            history.push(`/group/${groupId}/category/${categoryId}/post/${postId}`)
        })
    }


    return (
        <>
            <section className="editPost__form">
                <button className="editPost" onClick={() => {history.push(`/group/${groupId}/category/${categoryId}/post/${postId}`)}}>Cancel</button>
                <h2>Edit Post</h2>
                <div>
                    <form className="editPost">
                        <fieldset className="editPost">
                            <div className="form-Post">
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...post}
                                            copy.title = evt.target.value
                                            setPost(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    defaultValue={post.title}
                                />
                            </div>
                        </fieldset>
                        <fieldset className="editPost">
                            <div className="form-Post">
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...post}
                                            copy.body = evt.target.value
                                            setPost(copy)
                                        }
                                    }
                                    type="textarea"
                                    className="form-control"
                                    defaultValue={post.body}
                                />
                            </div>
                        </fieldset>
                        <button className="editPost" onClick={(e) => {savePost(e)}}>
                            Update Post!
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}