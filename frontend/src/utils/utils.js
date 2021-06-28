import {containerWithCard} from "./constants";

export function isLoading(popupForm, status, textButton) {
    if(status) {
        popupForm.querySelector('.popup__submit-btn').textContent = textButton;
    } else {
        popupForm.querySelector('.popup__submit-btn').textContent = textButton;
    }
}
export function prependCard(card){
    containerWithCard.prepend(card);
}

export function appendCard(card){
    containerWithCard.append(card);
}
