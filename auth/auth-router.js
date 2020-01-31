const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./auth-model');
const secrets = require('../database/config/secrets');
const restricted = require('./authenticate-middleware');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = brcypt.hashSync(user.password, 10)
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    })
});

router.post('/login', (req, res) => {
  let {username, password} = req.body
  Users.findBy({ username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' })
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  });
})

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function generateToken(user) {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
