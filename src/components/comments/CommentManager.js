export const getAllComments = () => {
    return fetch("https://creator-corner.herokuapp.com/comments", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`
        }
    })
        .then(response => response.json())
}

export const getCommentsByPost = (postId) => {
    return fetch(`https://creator-corner.herokuapp.com/comments?post=${postId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`
        }
    })
        .then(response => response.json())
}

export const getCommentById = (commentId) => {
    return fetch(`https://creator-corner.herokuapp.com/comments/${commentId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`
        }
    })
        .then(response => response.json())
}

export const createComment = (comment) => {
    return fetch("https://creator-corner.herokuapp.com/comments", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
}

export const deleteComment = (commentId) => {
    return fetch(`https://creator-corner.herokuapp.com/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`,
            "Content-Type": "application/json"
        },
    })
}

export const updateComment = (comment, commentId) => {
    return fetch(`https://creator-corner.herokuapp.com/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
}
