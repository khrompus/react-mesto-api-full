const router = require('express').Router();
const {
  getCard, deleteCard, createCard, dislikeCard, likeCard,
} = require('../controllers/cards');

router.get('/cards', getCard);
router.delete('/cards/:cardId', deleteCard);
router.post('/cards', createCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);
module.exports = router;
