const express = require('express');
// eslint-disable-next-line import/no-unresolved
const { celebrate, Joi } = require('celebrate');
const cors = require('cors');
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-unresolved
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routesUser = require('./routes/users');
const routerCard = require('./routes/cards');
const Auth = require('./middlewares/Auth');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/Logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// подключение бд к проетку

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const validateUserSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(
      // eslint-disable-next-line comma-dangle
      /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/
    ),
  }),
});
const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
const settingCors = {
  origin: [
    'http://localhost:3000',
    'http://api.khrompus.nomoredomains.club',
    'http://api.khrompus.nomoredomains.club/users/me',
    'http://khrompus.nomoredomains.monster',
    'https://localhost:3000',
    'https://api.khrompus.nomoredomains.club',
    'https://api.khrompus.nomoredomains.club/users/me',
    'https://khrompus.nomoredomains.monster',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
app.use('*', cors(settingCors));
app.use(cookieParser());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', validateSignIn, login);
app.post('/signup', validateUserSignUp, createUser);
app.use(Auth);
app.use(routesUser);
app.use(routerCard);

app.use((req, res) => {
  res.status(404).send({ message: 'Такой страницы не существует' });
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен');
});
