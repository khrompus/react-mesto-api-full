import React from 'react'
import success from '../images/success.svg'
import failed from '../images/failed.svg'

export default function InfoToolTipPopup(props) {
    let activePopup = '';
    if (props.isOpen) {
        activePopup = 'popup_active'
    } else {
        activePopup = ''
    }
    return (
        <section className={`popup ${activePopup}`}>
            <div className="popup__container">
                <button className="popup__exit-btn" onClick={props.onClose} type="button"/>
                <img src={props.isRegistered ? success : failed} className="popup__status-icon"
                     alt="Статус регистрации"/>
                <h2 className="popup__status-title">{props.isRegistered ?
                    "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
            </div>
        </section>
    )
}