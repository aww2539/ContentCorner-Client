import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getGroups } from "../groups/GroupManager"


export const SearchOutput = ({searchState}) => {
    const [searchResults, updateSearchResults] = useState([])
    const [groups, updateGroups] = useState([])

    const fetchGroups = () => {
        getGroups()
        .then((data) => {updateGroups(data)})
    }

    useEffect( () => { 
        fetchGroups() 
    },[] 
    )

    useEffect(
        () => {
            if (searchState !== "") {
                const foundGroups = groups.filter(group => group.title.toLowerCase().startsWith(searchState.toLowerCase()))
                if (foundGroups !== undefined) {
                    updateSearchResults(foundGroups)
                } 
            } else {
                updateSearchResults({})
            }
        },
        [searchState]
    )

    return (
        <>
            <section className="groups">
                { 
                    searchResults.length > 0 ?
                        searchResults.map(result => {
                            return <div className="group_cards">
                                        <Link to={`group/${result.id}/category/1`}> <h3>{result.title}</h3> </Link>
                                        <p>{result.description}</p>
                                    </div>
                            
                        })
                        : ""
                }
            </section>
        </>
    )
}