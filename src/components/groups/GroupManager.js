export const getGroups = () => {
    return fetch("https://creator-corner.herokuapp.com/groups", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`
        }
    })
        .then(response => response.json())
}

export const getGroupById = (groupId) => {
    return fetch(`https://creator-corner.herokuapp.com/groups/${groupId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`
        }
    })
        .then(response => response.json())
}

export const createGroup = (group) => {
    return fetch("https://creator-corner.herokuapp.com/groups", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(group)
    })
}

export const joinGroup = (groupId) => {
    return fetch(`https://creator-corner.herokuapp.com/groups/${groupId}/join`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify()
    })
}

export const leaveGroup = (groupId) => {
    return fetch(`https://creator-corner.herokuapp.com/groups/${groupId}/join`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify()
    })
}