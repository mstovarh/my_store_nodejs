const bcrypt = require('bcrypt');

async function verifyPassword() {
  const password = '111111111';
  const hash = '$2b$10$Koj.AVUF6u//swCWYsGkRe/6BQACRH3zcwk57jU3NXVK3K6HbGq66';
  const isMatch = await bcrypt.compare(password, hash);

  console.log(isMatch);
}

verifyPassword();
