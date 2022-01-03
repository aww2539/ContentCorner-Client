export const getAllCategories = () => {
    return fetch("https://creator-corner.herokuapp.com/categories", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`
        }
    })
        .then(response => response.json())
}

export const getCurrentUser = () => {
    return fetch("https://creator-corner.herokuapp.com/creators/currentuser", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`
        }
    })
        .then(response => response.json())
}