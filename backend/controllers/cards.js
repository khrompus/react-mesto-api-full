/* eslint-disable no-shadow */
const card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
// создание карточки

module.exports.createCard = (req, res, next) => {
  const { name, link, owner = req.user._id } = req.body;
  card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректный данные'));
      }
      next(err);
    });
};

// получение карточки

module.exports.getCard = (req, res, next) => {
  card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

// удаление карточки по id

module.exports.deleteCard = (req, res, next) => {
  card.findById(req.params.id)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      if (req.user._id.toString() === card.owner.toString()) {
        card.remove();
        res.status(200).send({ message: 'Карточка удалена' });
      }
      throw new ForbiddenError('Нельзя удалять чужую карточку');
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
      }
      next(err);
    });
};
// поставить лайк

module.exports.likeCard = (req, res, next) => {
  const { id } = req.params;
  card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    // eslint-disable-next-line comma-dangle
    { new: true }
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
      }
      next(err);
    });
};
// удалить лайк

module.exports.dislikeCard = (req, res, next) => {
  const { id } = req.params;
  card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    // eslint-disable-next-line comma-dangle
    { new: true }
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
      }
      next(err);
    });
};
