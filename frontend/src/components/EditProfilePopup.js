import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useState} from 'react'
import React from "react";

export default function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);


    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser , props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            description,
        });
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} buttonText='Сохранить' name="popupEdit" onClosePopup={props.onClose}
                       isOpen={props.isOpen}
                       id="popupEdit"
                       title="Редактировать профиль" idForm="editForm">
            <input placeholder="Имя" onChange={handleChangeName} value={name || ''}
                   className="popup__input popup__input_type_first-name" id="firstName"
                   type="text"
                   name="name" required minLength="2" maxLength="40"/>
            <span className="popup__input-error firstName-error"/>
            <input placeholder="О себе" onChange={handleChangeDescription} value={description || ''}
                   className="popup__input popup__input_type_about-me" type="text"
                   id="aboutMe"
                   name="description" required minLength="2" maxLength="200"/>
            <span className="popup__input-error aboutMe-error"/>
        </PopupWithForm>

    )

}
