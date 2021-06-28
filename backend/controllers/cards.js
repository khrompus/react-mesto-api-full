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
    .then((card) => res.send({ data: card }))
    .catch(next);
};

// удаление карточки по id

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  card.findById(cardId)
    .orFail(new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      if (!(card.owner._id.toString() === owner)) {
        throw new ForbiddenError('Нет прав на удаление карточки');
      }
      card.findByIdAndRemove(cardId)
        .then((deleteCard) => {
          if (deleteCard) {
            return res.status(200).send(deleteCard);
          }
          throw new NotFoundError('Карточка с указанным _id не найдена.');
        });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const error = new BadRequestError('Переданы некорректные данные.');
        next(error);
      }
      next(err);
    });
};
// поставить лайк

module.exports.likeCard = (req, res, next) => card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
).then((card) => {
  if (card) {
    return res.status(200).send(card);
  }
  throw new NotFoundError('Карточка с указанным _id не найдена.');
})
  .catch((err) => {
    if (err.kind === 'ObjectId') {
      const error = new BadRequestError('Переданы некорректные данные');
      next(error);
    }
    next(err);
  });
// удалить лайк

module.exports.dislikeCard = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const error = new BadRequestError('Невалидный id');
        next(error);
      }
      next(err);
    });
};
