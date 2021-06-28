/* eslint-disable */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getUsers = (req, res, next) => {
  user.find({})
    .then((items) => {
      res.status(200).send({data: items});
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  return user.findById(userId)
    .orFail(new NotFoundError('Пользователь по указанному _id не найден.'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const error = new BadRequestError('Переданы некорректные данные.');
        next(error);
      }
      next(err);
    });
};

module.exports.getUserId = (req, res, next) => {
  const {userId} = req.params;
  return user.findById(userId)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const error = new BadRequestError('Переданы некорректные данные.');
        next(error);
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    user.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then(
        (user) => res.status(200).send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        }),
      )
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Переданы некорректный данные'));
        } else if (err.name === 'MongoError' && err.code === 11000) {
          next(new ConflictError('Пользователь с таким email уже существует!'));
        }
        next(err);
      });
  });
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  return user.findByIdAndUpdate(
    userId,
    {name: req.body.name, about: req.body.about},
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Пользователь по указанному _id не найден.'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new BadRequestError('Переданы некорректные данные при обновлении профиля.');
        next(error);
      }
      next(err);
    });
};
module.exports.updateAvatar = (req, res, next) => {
  const {avatar} = req.body;
  const owner = req.user._id;
  user.findByIdAndUpdate(owner, {avatar}, {runValidators: true, new: true})
    .then((user) => res.status(200).send({data: user}))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Нет пользователя с таким id'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректный данные'));
      }
      next(err);
    });
};
module.exports.login = (req, res, next) => {
  const {email, password} = req.body;
  return user.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({_id: user._id}, 'secret-key', {
        expiresIn: '7d',
      });
      res
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: true,
          maxAge: 3600000 * 24 * 7,
        })
        .status(200)
        .send({token});
    })
    .catch(next);
};
