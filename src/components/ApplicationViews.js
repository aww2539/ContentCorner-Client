import React from "react";
import { Route } from "react-router-dom"
import { CreateComment } from "./comments/CreateComment";
import { EditComment } from "./comments/EditComment";
import { Group } from "./groups/Group";
import { GroupForm } from "./groups/GroupForm"
import { Home } from "./home/Home";
import { CreatePost } from "./posts/CreatePost";
import { EditPost } from "./posts/EditPost";
import { Post } from "./posts/Post";
import { Search } from "./search/Search";



export const ApplicationViews = () => {
    

    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/search">
                <Search />
            </Route>

            <Route exact path="/group/:groupId(\d+)/category/:categoryId(\d+)">
                <Group />
            </Route>
                <Route exact path="/group/:groupId(\d+)/category/:categoryId(\d+)/post/:postId(\d+)">
                    <Post />
                </Route>
                    <Route exact path="/group/:groupId(\d+)/category/:categoryId(\d+)/createPost">
                        <CreatePost />
                    </Route>
                    <Route exact path="/group/:groupId(\d+)/category/:categoryId(\d+)/post/:postId(\d+)/edit">
                        <EditPost />
                    </Route>

                <Route exact path="/group/:groupId(\d+)/category/:categoryId(\d+)/post/:postId(\d+)/createComment">
                    <CreateComment />
                </Route>
                    <Route exact path="/group/:groupId(\d+)/category/:categoryId(\d+)/post/:postId(\d+)/comment/:commentId(\d+)">
                        <EditComment />
                    </Route>

                <Route exact path="/GroupForm">
                    <GroupForm />
                </Route>

        </>
    )
}