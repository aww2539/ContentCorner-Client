import { useHistory } from "react-router"
import { useState } from "react/cjs/react.development"
import { createGroup } from "./GroupManager"
import "./Group.css"


export const GroupForm = () => {
    const [newGroup, updateNewGroup] = useState({
        title: "",
        description: ""
    })

    const history = useHistory()

    const saveNewGroup = (event) => {
        event.preventDefault()

        const groupData = {
            title: newGroup.title,
            description: newGroup.description,
            timestamp: Date.now(),
        }

        createGroup(groupData)
        .then(() => {
            history.push("/")
        })
    }


    return (
        <>
            <section className="newGroup__form">
                <button className="newGroup" onClick={() => {history.push("/")}}>Cancel</button>
                <h2>New Group?</h2>
                <div>
                    <form className="newGroup">
                        <fieldset className="newGroup">
                            <div className="form-group">
                                <h3>What would you like name your Group?</h3>
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...newGroup}
                                            copy.title = evt.target.value
                                            updateNewGroup(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    placeholder="Group name..."
                                />
                            </div>
                        </fieldset>
                        <fieldset className="newGroup">
                            <div className="form-group">
                                <h3>Provide some details about your new group!</h3>
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...newGroup}
                                            copy.description = evt.target.value
                                            updateNewGroup(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    placeholder="Group description..."
                                />
                            </div>
                        </fieldset>
                        <button className="newGroup" onClick={saveNewGroup}>
                            Create Group!
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}