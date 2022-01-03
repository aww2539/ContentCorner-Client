
import { Link } from "react-router-dom"
import { NavBar } from "../nav/NavBar"
import "./Search.css"


export const SearchInput = ({updateSearchState}) => {

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
                        
                        <Link  to="/GroupForm"><button>Create Group</button></Link>
                    </div>

                    
                </article>
            </main>
        </>
    )
}