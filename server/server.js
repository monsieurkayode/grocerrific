/* eslint-disable no-console */
import express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
import { resolve } from 'path';
import logger from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { STATUS_CODES } from 'http';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware'; // eslint-disable-line
import webpackHotMiddleware from 'webpack-hot-middleware'; // eslint-disable-line
import webpackConfig from '../../webpack.config.dev'; // eslint-disable-line
import dbConfig from './config';
import routes from './routes/groceryItem';
import { seedDb } from './seeds/groceryItemSeed';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 5000;
const config = dbConfig[env];
const compiler = webpack(webpackConfig);
const app = express();

if (config.use_env_variable) {
  mongoose.connect(
    process.env[config.use_env_variable],
    { useNewUrlParser: true }
  );
} else {
  const {
    prefix,
    host,
    database
  } = config;
  const url = `${prefix}://${host}:${config.port}/${database}`;
  mongoose.connect(url, { useNewUrlParser: true });
}

// use the global promise library for mongoose
mongoose.Promise = global.Promise;

const db = mongoose.connection;

app.use(compression());
app.use(express.static(resolve(__dirname, '../../dist/client')));
app.use(
  '/favicon.ico',
  favicon(resolve(__dirname, '../client/favicon.ico'))
);

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('x-powered-by');

if (env !== 'production') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

// use logger only for development and peoduction
if (env !== 'test') {
  // logger for server requests and responses
  app.use(logger('dev'));
}

app.get('/api', (req, res) => {
  res.status(200).send({
    status: STATUS_CODES[200],
    message: 'Status connected ok'
  });
});

app.use(routes);

app.use('*', (_, res) => {
  res.sendFile(resolve(__dirname, '../client/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  db.on('error', console.error.bind(console, 'Error connecting to database'));
  db.once('open', () => {
    console.info('🍺 Database connection established...');
    console.info(`🍺 Server started on ${port}`);
    seedDb();
  });
});
