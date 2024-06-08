const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const routerApi = require('./routes/indexRoutes');
const config = require('./config/config');
const LocalStrategy = require('./utils/auth/strategies/local.strategy');
const UserService = require('./services/usuariosServ');
//const encryptPasswords = require('./encryptPassword');

const {
  logErrors,
  ormErrorHandler,
  boomErrorHandler,
  errorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const whitelist = [
  'http://localhost:3000',
  'http://127.0.0.1:5501',
  'https://my-store-nodejs.onrender.com/',
];

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'), false);
    }
  },
};

app.use(cors(options));

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY || 'my_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.isProd ? true : false },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(LocalStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const service = new UserService();
    const user = await service.findOne(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

require('./utils/auth');

//encryptPasswords();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Corriendo en http://localhost:${port}`);
});
