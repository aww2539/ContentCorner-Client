import React, { useEffect, useState } from "react";
import { Redirect } from "react-router"
import { Route } from "react-router-dom"
import { Login } from "./auth/login";
import { ApplicationViews } from "./ApplicationViews";
import "./ContentCorner.css"
import { Register } from "./auth/register";


export const ContentCorner = () => {

    return (
        <>

            <Route
                render={() => {
                    if (localStorage.getItem("contentCorner_token")) {
                        return (
                            <>

                                <ApplicationViews />

                            </>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                } } />
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>

        </>
    )
}
