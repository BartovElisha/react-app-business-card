var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');
const users = require('../controllers/users');

router.get('/:id', auth, users.details);

/* Update user's Favorite list  */
router.patch('/updatefavoritelist/:id', users.updateFavoriteCardsList);

/* authentication */
router.post('/login', users.login);
router.post('/signup', users.signup);

module.exports = router;