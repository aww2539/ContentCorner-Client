export const getVoteById = (voteId) => {
    return fetch(`https://creator-corner.herokuapp.com/votes/${voteId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`
        }
    })
        .then(response => response.json())
}

export const getVotesByPostId = (postId) => {
    return fetch(`https://creator-corner.herokuapp.com/votes?post=${postId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`
        }
    })
        .then(response => response.json())
}

export const getVotesByPostAndUser = (postId, userId) => {
    return fetch(`https://creator-corner.herokuapp.com/votes?post=${postId}&creator=${userId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`
        }
    })
        .then(response => response.json())
}

export const createVote = (vote) => {
    return fetch("https://creator-corner.herokuapp.com/votes", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vote)
    })
}

export const updateVote = (vote, voteId) => {
    return fetch(`https://creator-corner.herokuapp.com/votes/${voteId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vote)
    })
}
