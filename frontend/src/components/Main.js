import React from "react";
import {useContext} from 'react'
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = useContext(CurrentUserContext)





    return (
        <main>
            <section className="profile">
                <button type="button" className="profile__avatar-btn" onClick={props.onEditAvatar}>
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>
                </button>
                <div className="profile__container">
                    <div className="profile__info">
                        <div className="profile__name">
                            <h1 className="profile__title" id="some">{currentUser.name}</h1>
                            <button className="profile__button-edit" type="button" onClick={props.onEditProfile}/>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                    <button className="profile__button-add" type="button" onClick={props.onAddPlace}/>
                </div>
            </section>
            <section className="grid">
                {/*{props.cards.map(card => (<Card key={card._id} onDeleteCard={props.onDeleteCard} onCardLike={props.onCardLike} onCardClick={props.onCardClick} card={card}/>))}*/}
                {props.cards.map((card) => {
                    return(
                        <Card card={card} onCardClick={props.onCardClick} key={card._id} onCardLike = {props.onCardLike} onDeleteCard={props.onDeleteCard} />
                    )
                } )}
            </section>
        </main>
    )

}

export default Main