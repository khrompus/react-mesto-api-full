import React, {useState} from 'react'

export default function Login({onLogin}) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const {name, value} = e.target
        setLoginData({
            ...loginData,
            [name]: value
        })

    }

    function handleSubmit(e) {
        e.preventDefault()
        onLogin(loginData)
    }

    return (
        <section className="login">
            <h1 className="login__title">Вход</h1>
            <div className="login__container">
                <form name="login" onSubmit={handleSubmit} className="login__form">
                    <input id="email" name="email" onChange={handleChange} value={loginData.email} placeholder="Email"
                           type="email" className="login__input"/>
                    <input id="password" name="password" onChange={handleChange} value={loginData.password}
                           placeholder="Пароль" type="password" className="login__input"/>
                    <button type="submit" className="login__submit">Войти</button>
                </form>
            </div>
        </section>
    )
}