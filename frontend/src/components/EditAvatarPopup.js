import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from "react";
export default function EditAvatarPopup(props) {
    const avatarRef = React.useRef('')
    function handleSubmit(e) {
    e.preventDefault()
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
return(
    <PopupWithForm onSubmit={handleSubmit} buttonText='Сохранить' name="newImage" onClosePopup={props.onClose} isOpen={props.isOpen} id="newImage"
                   title="Обновить аватар" idForm="newAvatar">
        <input ref={avatarRef} placeholder="Ссылка на фото" className="popup__input"
               id="newNameInput" type="url" name="link" pattern="https://.*" required/>
        <span className="popup__input-error newNameInput-error"/>
    </PopupWithForm>
)
}
