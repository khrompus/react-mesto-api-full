import React from 'react'
import {Link} from "react-router-dom";
export default function NavBar(props) {
    return (
        <div className="navigate">
            <p className={props.isLoggedIn ? 'navigate__title' : "navigate__title_hidden"}>
                {props.userInfo ? props.userInfo.email : ''}
            </p>
            <Link to={props.redirect}
                  className="navigate__link"
                  onClick={props.onRedirect}>
                {props.text}
            </Link>

        </div>
    )
}