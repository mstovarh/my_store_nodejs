const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/indexRoutes');

const {
  logErrors,
  ormErrorHandler,
  boomErrorHandler,
  errorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5501'];
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
