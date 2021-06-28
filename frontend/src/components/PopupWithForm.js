import React from "react";


function PopupWithForm(props) {
    let activePopup = '';
    if (props.isOpen){
        activePopup = 'popup_active'
    }
    else {
        activePopup = ''
    }
return(
    <section className={`popup ${activePopup}`} id={props.id}>
        <div className="popup__container">
            <button className="popup__exit-btn" onClick={props.onClosePopup} type="button"/>
            <h2 className="popup__title">{props.title}</h2>
            <form className="popup__form" onSubmit={props.onSubmit} name={props.name} id={props.idForm} noValidate>
                {props.children}
                <button className="popup__submit-btn" type="submit" name="firstNameInfo">{props.buttonText}</button>

            </form>
        </div>
    </section>
)
}
export default PopupWithForm