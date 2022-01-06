import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPostsInGroup } from "../../posts/PostManager"

export const PostSearchOutput = ({searchState}) => {
    const [searchResults, updateSearchResults] = useState([])
    const [posts, updatePosts] = useState([])
    const { groupId } = useParams()

    const fetchPosts = () => {
        getPostsInGroup(groupId)
        .then((data) => {updatePosts(data)})
    }

    useEffect( () => { 
        fetchPosts() 
    },[] 
    )

    useEffect(
        () => {
            if (searchState !== "") {
                const foundPosts = posts.filter(group => group.title.toLowerCase().startsWith(searchState.toLowerCase()))
                if (foundPosts !== undefined) {
                    updateSearchResults(foundPosts)
                } 
            } else {
                updateSearchResults({})
            }
        },
        [searchState]
    )

    return (
        <>

                { 
                    searchResults.length > 0 ?
                        searchResults.map(result => {
                            return <div className="post_cards">
                                        <Link to={`/group/${result.group.id}/category/${result.category.id}/post/${result.id}`}> <h3>{result.title}</h3> </Link>
                                        <p>{result.body}</p>
                                    </div>
                            
                        })
                        : ""
                }

        </>
    )
}