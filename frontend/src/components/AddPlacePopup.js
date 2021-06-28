import PopupWithForm from "./PopupWithForm";
import React, {useRef} from "react";
export default function AddPlacePopup(props) {
    const placeNameRef = useRef('')
    const linkRef = useRef('')
    function handleSubmit(e) {
    e.preventDefault()
        props.onAddPlace({
            name: placeNameRef.current.value,
            link: linkRef.current.value
        })
    }
return(
    <PopupWithForm onSubmit={handleSubmit} buttonText='Создать' name="popupAddCard" onClosePopup={props.onClose} isOpen={props.isOpen}
                   id="popupAddCard" title="Новое Место" idForm="addCardForm">
        <input placeholder="Новое место"
               ref={placeNameRef}
               className="popup__input popup__input_add-card popup__input_type_image-name"
               type="text" name="name" id="newMesto" required minLength="2" maxLength="30"/>
        <span className="popup__input-error newMesto-error"/>
        <input ref={linkRef} placeholder="Ссылка на картинку" className="popup__input popup__input_type_link"
               id="urlLink" type="url"
               name="link" pattern="https://.*" required/>
        <span className="popup__input-error urlLink-error"/>

    </PopupWithForm>
)
}
