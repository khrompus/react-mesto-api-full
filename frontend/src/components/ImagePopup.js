import React from "react";

function ImagePopup({card, close}) {

    return(
        <section className={`popup ${card && 'popup_active'}`} id="popupImage">
            <div className="popup__container-image">
                <button className="popup__exit-btn popup__image-exit-btn" type="button" onClick={close} />
                <img className="popup__image" src={card?.link} alt={card?.name}/>
                <p className="popup__image-text">{card?.name} </p>
            </div>
        </section>
    )
}
export default ImagePopup