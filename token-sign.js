const jwt = require('jsonwebtoken');

const secret = 'dakota';

const payload = {
  sub: 1,
  name: 'John Doe',
  role: 'customer',
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);
