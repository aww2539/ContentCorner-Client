import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
    const history = useHistory();

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link to="/">
                    Home
                </Link>
            </li>
            <li className="navbar__item">
                <Link to="/search">
                    Search
                </Link>
            </li>
            <li className="navbar__item">
                <Link to="/login" onClick={() => {
                    localStorage.removeItem("contentCorner_token");
                    }}>
                    Logout
                </Link>
            </li>
        </ul>
    )
}