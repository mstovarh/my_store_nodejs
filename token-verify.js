const jwt = require('jsonwebtoken');

const secret = 'dakota';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJKb2huIERvZSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxOTIzNjgzMH0.DXzwkq72MplGkTnMwstqICLzd3junYkyIksT9RkjwQI';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
