import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getGroupById } from "../../groups/GroupManager"
import { PostSearchInput } from "./PostSearchInput"
import { PostSearchOutput } from "./PostSearchOutput"


export const PostSearch = () => {
    const [searchTerm, updateSearchTerm] = useState("")
    const [group, setGroup] = useState({})
    const [members, setMembers] = useState([])
    const { groupId } = useParams()

    useEffect(() => {
        getGroupById(groupId)
        .then((data) => {
            setGroup(data)
            setMembers(data.members)
        })
    }, [])


    return (
        <>
            <div className="group_title">

                <div>
                    <h2>Welcome to {group.title}</h2>
                    <h4>{group.description}</h4>
                    <h4>Members: {members.length}</h4>
                </div>

                <div>
                    <Link to={`/group/${groupId}/category/1`}> <button> Back </button> </Link>
                </div>

            </div>
            
            <section className="group_posts">
                <PostSearchInput updateSearchState={updateSearchTerm}/>
                <PostSearchOutput searchState={searchTerm}/>
            </section>
        </>
    )
}