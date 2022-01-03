import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { NavBar } from "../nav/NavBar";
import { getGroups } from "../groups/GroupManager";
import "./Home.css"


export const Home = () => {
    const [groups, setGroups] = useState([])
    const [groupSorter, setGroupSorter] = useState("")

    useEffect(() => {
        getGroups()
        .then((data) => setGroups(data))
    }, [])

    return (
        <>
            <main id="mainContainer">

                <header className="header">
                    <h1>Content Corner</h1>
                    <p>nav dropdown</p>
                    <NavBar />
                </header>

                <article>

                    <div className="group_header">
                        <h3>Groups</h3>

                            {/* <select id="sorter" onchange={(evt) => setGroupSorter(evt.target.value)}>

                                <option id="age-asc">Most Recent</option>
                                <option id="age-desc">Oldest</option>
                                <option id="mem-asc">Members: Ascending</option>
                                <option id="mem-desc">Members: Descending</option>

                            </select> */}

                        <Link  to="/GroupForm"><button>Create Group</button></Link>
                    </div>

                    <section className="groups">
                        { 
                            groups?.map(group => {
                                return <div className="group_cards">
                                            <Link to={`group/${group.id}/category/1`}> <h3>{group.title}</h3> </Link>
                                            <p>{group.description}</p>
                                        </div>
                            })
                        }
                    </section>

                </article>

            </main>
        </>
    )
}