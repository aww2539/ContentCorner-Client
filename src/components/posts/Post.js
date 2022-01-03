import { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getGroupById, joinGroup, leaveGroup } from "../groups/GroupManager"
import { getPostById, deletePost } from "./PostManager"
import "./Post.css"
import { getCommentsByPost, deleteComment } from "../comments/CommentManager"
import { getAllCategories, getCurrentUser } from "../ApiManager"
import { createVote, getVotesByPostAndUser, getVotesByPostId, updateVote } from "../votes/VoteManager"


export const Post = () => {
    const [post, setPost] = useState({})
    const [group, setGroup] = useState({})
    const [categories, setCategories] = useState([])
    const [comments, setComments] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [members, setMembers] = useState([])
    const [memberCheck, setMemberCheck] = useState({})
    const [votes, setVotes] = useState([])
    const [upvotes, setUpvotes] = useState([])
    const [downvotes, setDownvotes] = useState([])
    const [voteCheck, setVoteCheck] = useState({})
    const { groupId, postId, categoryId } = useParams()
    const history = useHistory()

    const fetchComments = () => {
        return getCommentsByPost(postId)
        .then((data) => setComments(data))
    }
    
    const fetchGroup = () => {
        getGroupById(groupId)
        .then((data) => {
            setGroup(data)
            setMembers(data.members)
        })
    }

    useEffect(() => {
        fetchGroup()
    }, [groupId])

    useEffect(() => {
        const foundMember = members.find(m => m.id === currentUser.user?.id)
        setMemberCheck(foundMember)
    }, [members])

    const fetchVotes = () => {
        getVotesByPostId(postId)
        .then((data) => setVotes(data))
    }

    useEffect(() => {
        getPostById(postId)
        .then((data) => setPost(data))
    }, [])

    useEffect(() => {
        fetchComments()
    }, [])

    useEffect(() => {
        getAllCategories()
        .then((data) => setCategories(data))
    }, [])

    useEffect(() => {
        getCurrentUser()
        .then((data) => setCurrentUser(data))
    }, [])

    useEffect(() => {
        fetchVotes()
    }, [post])

    useEffect(() => {
        getVotesByPostAndUser(postId, currentUser.user?.id)
        .then((data) => setVoteCheck(data))
    }, [post, votes])

    useEffect(() => {
        const filteredUpvotes = votes?.filter(v => v.upvote === true)
        setUpvotes(filteredUpvotes)
    }, [votes])

    useEffect(() => {
        const filteredDownvotes = votes?.filter(v => v.downvote === true)
        setDownvotes(filteredDownvotes)
    }, [votes])

    const doUpvote = (postId) => {

        const voteData = {
            creator: currentUser.user.id,
            postId: parseInt(postId),
            upvote: true,
            downvote: false
        }
        if ( voteCheck.length === 0 ) {
            createVote(voteData)
            .then(() => fetchVotes())
        } else {
            updateVote(voteData, voteCheck[0]?.id)
            .then(() => fetchVotes())
        }
    }

    const doDownvote = (postId) => {

        const voteData = {
            creator: currentUser.user.id,
            postId: parseInt(postId),
            upvote: false,
            downvote: true
        }
        if ( voteCheck.length === 0 ) {
            createVote(voteData)
            .then(() => fetchVotes())
        } else {
            updateVote(voteData, voteCheck[0]?.id)
            .then(() => fetchVotes())
        }
    }

    const undoVote = (postId) => {

        const voteData = {
            creator: currentUser.user.id,
            postId: parseInt(postId),
            upvote: false,
            downvote: false
        }
        updateVote(voteData, voteCheck[0]?.id)
        .then(() => fetchVotes())
    }


    return (
        
        <>
            <div className="group_title">
                <div>
                    <h2>Welcome to {group.title}</h2>
                    <h4>{group.description}</h4>
                    <h5>Members: {members.length}</h5>
                </div>

                <div>
                    <Link to={`/`}> <button> Home </button> </Link>

                    {
                        memberCheck === undefined ?
                        
                        <button onClick={() => {
                            joinGroup(groupId)
                            .then(fetchGroup)
                        }}> Join Group! </button> :
                        
                        <button onClick={() => {
                            leaveGroup(groupId)
                            .then(fetchGroup)
                        }}> Leave Group </button> 
                    }

                </div>
            </div>

            <article className="group_home">


                <section className="group_menu">

                    {
                        memberCheck === undefined ?
                        "" :
                        <Link to={`/group/${groupId}/category/${categoryId}/createPost`}><div className="groupMenu_cards"> Create Post! </div></Link>
                    }
                    {
                        categories.map(category => {
                            return <Link to={`/group/${groupId}/category/${category.id}`}> 
                                        <div className="groupMenu_cards"> {category.label} </div> 
                                    </Link>
                        })
                    }

                </section>

                <section className="post">

                    <section className="post_details">
                        <div>{post.title}</div>
                        <div>{post.body}</div>
                        <div>{post.timestamp}</div>
                        <div className="user_buttons">
                            {
                                currentUser.user?.id === post.creator?.user.id ? 
                                <Link to={`/group/${group.id}/category/${post.category?.id}/post/${post.id}/edit`}><button>Edit</button></Link> : ""
                            }
                            {
                                currentUser.user?.id === post.creator?.user.id ? <button onClick={() => {deletePost(postId).then(history.push(`/group/${groupId}/category/1`))}}>Delete</button> : ""
                            }
                        </div>
                    </section>
                    
                    {
                        memberCheck === undefined ?
                        <div className="votes">
                            <p>Upvotes: {upvotes.length}</p>

                            <p>Downvotes: {downvotes.length}</p>
                        </div> 
                        :
                        <div className="votes">
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    if (voteCheck[0]?.upvote === true) {
                                        undoVote(postId)
                                    } else {
                                    doUpvote(postId)
                                    }
                                }}>Upvote</button><p>{upvotes.length}</p>

                                <button onClick={(e) => {
                                    e.preventDefault()
                                    if (voteCheck[0]?.downvote === true) {
                                        undoVote(postId)
                                    } else {
                                        doDownvote(postId)
                                    }
                                }}>Downvote</button><p>{downvotes.length}</p>
                        </div>
                    }

                    <section className="post_comments">
                    {
                        memberCheck === undefined ?

                        "" :
                        <Link to={`/group/${groupId}/category/${categoryId}/post/${postId}/createComment`}><button> Create Comment </button></Link>
                    }

                        {
                            comments.map(comment => {
                                return <div className="comment_details">
                                            <p>{comment.body}</p>
                                            <p>By {comment.creator.user.username} at {comment.timestamp}</p>
                                            {
                                                currentUser.user?.id === post.creator?.user.id ? <Link to={`/group/${groupId}/category/${categoryId}/post/${postId}/comment/${comment.id}`}>
                                                <button>Edit</button></Link> 
                                                : ""
                                            }
                                            {
                                                currentUser.user?.id === post.creator?.user.id ? <button onClick={() => {
                                                deleteComment(comment.id)
                                                .then(()=> {fetchComments()})}}
                                                >Delete</button> : ""
                                            }
                                        </div>
                            }).sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
                        }

                    </section>

                </section>

            </article>
        </>

    )
}