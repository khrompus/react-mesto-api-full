class Api {
    constructor({baseUrl, authorization}) {
        this._baseUrl = baseUrl;
        this._authorization = authorization;
    }
    _parseResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
    }
    sendProfile({name, description}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: description
            })
        })
            .then(res => this._parseResponse(res))
    }
    sendCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            }, body:JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => this._parseResponse(res));
    }
    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._parseResponse(res));
    }
    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._parseResponse(res));
    }
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._parseResponse(res));
    }

    changeAvatar({avatar}) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => this._parseResponse(res));
    }


    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._parseResponse(res));
    }
    likeCardDelete(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._parseResponse(res));
    }
}
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    authorization: 'f0422778-420b-41b4-a52e-ffa4edcaf604'
})
export default api
