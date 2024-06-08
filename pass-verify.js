const bcrypt = require('bcrypt');

async function verifyPassword() {
  const password = '123456';
  const hash = '$2b$10$DaY8lVemLUp/xs9B0ZCuiu9SXTc2d8.KqH93I2OA88wPIFdWR31G6';
  const isMatch = await bcrypt.compare(password, hash);

  console.log(isMatch);
}

verifyPassword();
