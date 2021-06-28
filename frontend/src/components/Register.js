import React from 'react'
import {useState} from 'react'
import {Link} from "react-router-dom";


export default function Register({onRegister}) {

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onRegister(data);
    };

    return (
        <section className="register">
            <h1 className="register__title">Регистрация</h1>
            <div className="register__container">
                <form className="register__form" onSubmit={handleSubmit} name="register-form">
                    <input className="register__input" value={data.email} id="email" onChange={handleChange}
                           name="email" placeholder="Email" type="email"/>
                    <input className="register__input" id="password" value={data.password} onChange={handleChange}
                           name="password" placeholder="Пароль" type="password"/>
                    <button className="register__submit" type="submit">Зарегистрироваться</button>
                </form>
                <h2 className="register__subtitle">Уже зарегистрированы? <Link to='/sign-in'
                    className="register__subtitle_underline">Войти</Link></h2>
            </div>
        </section>
    )
}
