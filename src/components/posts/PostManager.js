export const getAllPosts = () => {
    return fetch("https://creator-corner.herokuapp.com/posts", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`
        }
    })
        .then(response => response.json())
}

export const getPostsInGroup = (groupId) => {
    return fetch(`https://creator-corner.herokuapp.com/posts?group=${groupId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`
        }
    })
        .then(response => response.json())
}

export const getPostsInGroupByCategory = (groupId, categoryId) => {
    return fetch(`https://creator-corner.herokuapp.com/posts?group=${groupId}&category=${categoryId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`
        }
    })
        .then(response => response.json())
}

export const getPostById = (postId) => {
    return fetch(`https://creator-corner.herokuapp.com/posts/${postId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`
        }
    })
        .then(response => response.json())
}

export const createPost = (post) => {
    return fetch("https://creator-corner.herokuapp.com/posts", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}
export const deletePost = (postId) => {
    return fetch(`https://creator-corner.herokuapp.com/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`,
            "Content-Type": "application/json"
        },
    })
}

export const updatePost = (post, postId) => {
    return fetch(`https://creator-corner.herokuapp.com/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("contentCorner_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}
