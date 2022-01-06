
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getGroupById } from "../../groups/GroupManager"


export const PostSearchInput = ({updateSearchState}) => {
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

            <section>
                
                <form className="form--search" onSubmit={(event) => {event.preventDefault()}}>
                    <fieldset className="searchField">
                        <input onChange = {
                            (evt) => {
                                const search = evt.target.value
                                updateSearchState(search)
                            }
                        }
                            type="text"
                            className="search"
                            placeholder="Search here"
                            required autoFocus />
                    </fieldset>
                </form>

            </section>

            
        </>
    )
}