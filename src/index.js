const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const routes = require('./routes');

class Application {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(morgan('dev'));
  }

  routes() {
    this.express.use(routes.bucket);
  }
}

const app = new Application().express;

app.listen(process.env.PORT || 3001, () => {
  // eslint-disable-next-line no-console
  console.log(`Ready at port ${process.env.PORT || 3001}`);
});
