import { useState } from "react"
import { SearchInput } from "./SearchInput"
import { SearchOutput } from "./SearchOutput"


export const Search = () => {
    const [searchTerm, updateSearchTerm] = useState("")


    return (
        <>
            <SearchInput updateSearchState={updateSearchTerm}/>
            <SearchOutput searchState={searchTerm}/>
        </>
    )
}