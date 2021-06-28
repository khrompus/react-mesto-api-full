import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from 'react'
import {useContext} from 'react'

export default function Card(props) {
    const currentUser = useContext(CurrentUserContext)
    const isOwn = props.card.owner._id === currentUser._id
    const cardDeleteButtonClassName = (
        `${isOwn ? 'grid__delete-btn' : 'grid__delete-btn_disable'}`
    );
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`${isLiked ? 'grid__like_active' : 'grid__like'}`);

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteCard() {
        props.onDeleteCard(props.card)
    }

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <div className="grid__items">
            <img src={props.card.link} alt={props.card.name} onClick={handleClick} className="grid__image"/>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteCard} type="button"/>
            <div className="grid__text-group">
                <h2 className="grid__text">{props.card.name}</h2>
                <div className="grid__element-group">
                    <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}/>
                    <p className="grid__number-like">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}
