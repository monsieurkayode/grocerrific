import express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
import { resolve } from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware'; //eslint-disable-line
import webpackHotMiddleware from 'webpack-hot-middleware'; //eslint-disable-line
import webpackConfig from '../../webpack.config.dev';

const compiler = webpack(webpackConfig);

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(express.static('../dist'));
app.use(
  '/favicon.ico',
  favicon(resolve(__dirname, '../client/favicon.ico'))
);

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../client/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server started on ${port}`);
});
