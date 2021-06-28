import React from 'react'
import Header from "./Header.js";
import Footer from "./Footer";
import Main from "./Main";
import {useState, useEffect} from 'react'
import ImagePopup from "./ImagePopup";
import {Switch, Route, useHistory} from 'react-router-dom'
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTipPopup from "./InfoToolTipPopup";
import * as auth from '../utils/auth'

function App() {

    const [cards, setCards] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false)
    const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [isRegistered, setIsRegistered] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({});
    const closeAllPopups = () => {
        setEditProfilePopup(false);
        setEditAvatarPopup(false);
        setAddPlacePopup(false);
        setSelectedCard(null);
        setIsInfoToolTipPopupOpen(false)
    }
    useEffect(() => {
        handleTokenCheck()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleTokenCheck = () => {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt')
            if (jwt) {
                auth.getContent(jwt).then((res) => {
                    if (res) {
                        setIsLoggedIn(true)
                        history.push('/')
                    }
                    const email = res.data.email
                    setUserInfo({email})

                }).catch((err) => {
                    console.log('Ошибка при проверки токена', err)
                })
            }
            }

    }
    const history = useHistory()

    function handleSignIn(loginData) {
        auth.authorize(loginData).then((res) => {
            setIsLoggedIn(true)
            history.push('/')
            localStorage.setItem('jwt', res.token);
            console.log(localStorage)
            setUserInfo({
                email: loginData.email
            })
        }).catch((err) => {
            console.log('Произошла ошибка при авторизации', err)
        })
    }

    function handleRegister(data) {
        return auth.register(data).then((res) => {
            if (res) {
                history.push('/sign-in')
                setIsRegistered(true)
                setIsInfoToolTipPopupOpen(true)
            }
        }).catch((err) => {
            console.log('Ошибка при регистрации', err)
            setIsInfoToolTipPopupOpen(true)
            setIsRegistered(false)
        })
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleEditAvatarClick() {
        setEditAvatarPopup(!isEditAvatarPopupOpen)
    }

    function handleEditProfileClick() {
        setEditProfilePopup(!isEditProfilePopupOpen)
    }

    function handleAddPlaceClick() {
        setAddPlacePopup(!isAddPlacePopupOpen)
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (!isLiked) {
            api.likeCard(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }).catch((err) => {
                console.log('Ошибка при загрузки данных', err)
            });
        } else {
            api.likeCardDelete(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }).catch((err) => {
                console.log('Ошибка при загрузки данных', err)
            });
        }

    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards
                    .filter(item => item._id !== card._id))
            }).catch((err) => {
            console.log('Ошибка при удаление карточки', err)
        })
    }

    useEffect(() => {
        api.getUser()
            .then((res) => {
                setCurrentUser(res)

            })
            .catch(err => {
                console.log('Ошибка при получении данных', err)
            })
    }, [])
    useEffect(() => {
        api.getCards()
            .then((res) => {
                setCards(res)
            })
            .catch(err => {
                console.log('Ошибка при получении данных', err)
            })
    }, [])

    function handleUpdateUser(e) {
        api.sendProfile(e)
            .then((userData) => {
                setCurrentUser(userData)
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка при загрузки данных', err)
            })
    }

    function handleUpdateUserAvatar(data) {
        api.changeAvatar(data).then((res) => {
            setCurrentUser(res)
            closeAllPopups()
        }).catch((err) => {
            console.log('Ошибка при загрузки данных', err)
        })


    }

    function handleAddPlaceSubmit(cardData) {
        api.sendCard(cardData).then((res) => {
            setCards([res, ...cards])
            closeAllPopups()
        }).catch((err) => {
            console.log('Ошибка при загрузки карточки', err)
        })
    }

    function handleSignOut() {
        localStorage.removeItem('jwt')
        setIsLoggedIn(false)
    }
    return (
        <div className="app">
            <CurrentUserContext.Provider value={currentUser}>

                <Switch>

                    <Route path="/sign-in">
                        <Header redirect="/sign-up"
                                isLoggedIn={isLoggedIn}
                                text="Регистрация"/>
                        <Login onLogin={handleSignIn}/>
                    </Route>
                    <Route path="/sign-up">
                        <Header redirect="/sign-in"
                                isLoggedIn={isLoggedIn}
                                text="Войти"/>
                        <Register onRegister={handleRegister}/>
                    </Route>
                    <ProtectedRoute
                                    isLoggedIn={isLoggedIn}
                                    path="/">
                        <Header redirect="/"
                                isLoggedIn={isLoggedIn}
                                text="Выйти"
                                onRedirect={handleSignOut}
                                userInfo={userInfo}
                        />
                        <Main onDeleteCard={handleCardDelete}
                              onCardLike={handleCardLike}
                              cards={cards}
                              onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick}
                              onEditProfile={handleEditProfileClick}
                              onAddPlace={handleAddPlaceClick}/>
                    </ProtectedRoute>
                </Switch>
                <Footer/>


                <EditProfilePopup onUpdateUser={handleUpdateUser} onClose={closeAllPopups}
                                  isOpen={isEditProfilePopupOpen}/>
                <EditAvatarPopup onUpdateAvatar={handleUpdateUserAvatar} onClose={closeAllPopups}
                                 isOpen={isEditAvatarPopupOpen}/>
                <AddPlacePopup onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}/>


                <ImagePopup card={selectedCard} close={closeAllPopups}/>
                <InfoToolTipPopup onClose={closeAllPopups} isRegistered={isRegistered} isOpen={isInfoToolTipPopupOpen}/>
            </CurrentUserContext.Provider>
        </div>

    );

}

export default App;
