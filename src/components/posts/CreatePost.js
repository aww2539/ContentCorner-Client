import { useHistory } from "react-router"
import { useState } from "react/cjs/react.development"
import { useParams } from "react-router-dom"
import { createPost } from "./PostManager"
import "./Post.css"


export const CreatePost = () => {
    const [newPost, updateNewPost] = useState({
        title: "",
        body: ""
    })
    const { groupId, categoryId } = useParams()
    const history = useHistory()

    const saveNewPost = (event) => {
        event.preventDefault()

        const PostData = {
            title: newPost.title,
            body: newPost.body,
            timestamp: Date.now(),
            groupId: parseInt(groupId),
            categoryId: parseInt(categoryId)
        }

        createPost(PostData)
        .then(() => {
            history.push(`/group/${groupId}/category/${categoryId}`)
        })
    }


    return (
        <>
            <section className="newPost__form">
                <button className="newPost" onClick={() => {history.push(`/group/${groupId}/category/${categoryId}`)}}>Cancel</button>
                <h2>New Post?</h2>
                <div>
                    <form className="newPost">
                        <fieldset className="newPost">
                            <div className="form-Post">
                                <h3>What would you like name your Post?</h3>
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...newPost}
                                            copy.title = evt.target.value
                                            updateNewPost(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    placeholder="Post name..."
                                />
                            </div>
                        </fieldset>
                        <fieldset className="newPost">
                            <div className="form-Post">
                                <h3>Provide some details about your new post!</h3>
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...newPost}
                                            copy.body = evt.target.value
                                            updateNewPost(copy)
                                        }
                                    }
                                    type="textarea"
                                    className="form-control"
                                    placeholder="Post body..."
                                />
                            </div>
                        </fieldset>
                        <button className="newPost" onClick={saveNewPost}>
                            Create Post!
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}