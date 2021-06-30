// export const BASE_URL = 'https://api.khrompus.nomoredomains.club'

export const BASE_URL = 'http://localhost:3001'

function parseResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
}


export const register = (data) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: data.password,
            email: data.email
        }),
    })
        .then(res => parseResponse(res));
};
export const authorize = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    }).then(res => parseResponse(res))

}
export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
    })
        .then(res => parseResponse(res))
        .then((data) => data);
};

