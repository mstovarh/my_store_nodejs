const express = require('express');
const passport = require('passport');

const app = express();

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
