const bcrypt = require('bcrypt');

async function hashPassword() {
  const password = '111111111';
  const hash = await bcrypt.hash(password, 10);

  console.log(hash);
}

hashPassword();
