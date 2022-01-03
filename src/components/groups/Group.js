import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPostsInGroupByCategory } from "../posts/PostManager"
import { getGroupById, joinGroup, leaveGroup } from "./GroupManager"
import "./Group.css"
import { getAllCategories, getCurrentUser } from "../ApiManager"


export const Group = () => {
    const [posts, setPosts] = useState([])
    const [group, setGroup] = useState({})
    const [categories, setCategories] = useState([])
    const [members, setMembers] = useState([])
    const [memberCheck, setMemberCheck] = useState({})
    const { groupId, categoryId } = useParams()
    const [currentUser, setCurrentUser] = useState({})


    const fetchGroup = () => {
        getGroupById(groupId)
        .then((data) => {
            setGroup(data)
            setMembers(data.members)
        })
    }

    const fetchPosts = () => {
        getPostsInGroupByCategory(groupId, categoryId)
        .then((data) => setPosts(data))
    }

    useEffect(() => {
        fetchGroup()
    }, [groupId])

    useEffect(() => {
        const foundMember = members.find(m => m.id === currentUser.user?.id)
        setMemberCheck(foundMember)
    }, [members])

    useEffect(() => {
        fetchPosts()
    }, [categoryId])

    useEffect(() => {
        getAllCategories()
        .then((data) => setCategories(data))
    }, [])

    useEffect(() => {
        getCurrentUser()
        .then((data) => setCurrentUser(data))
    }, [])

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

                <section className="group_posts">
                        {
                            posts?.map(post => {
                                return <div className="post_cards">
                                            <Link to={`/group/${groupId}/category/${categoryId}/post/${post.id}`}> <h5>{post.title}</h5> </Link>
                                            <p>{post.body}</p>
                                            <p>{post.timestamp}</p>
                                        </div>
                            }).sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
                        }
                </section>

            </article>
        </>

    )
}