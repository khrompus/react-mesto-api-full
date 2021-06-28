import React from "react";
import logo from "../images/logo.svg"
import NavBar from "./NavBar";
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <Link to="/">
                <img src={logo} alt="Место" className="header__logo"/>
            </Link>

            <NavBar redirect={props.redirect}
                    isLoggedIn={props.isLoggedIn}
                    userInfo={props.userInfo}
                    onRedirect={props.onRedirect}
                    text={props.text}/>
        </header>
    )
}

export default Header