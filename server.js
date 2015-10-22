var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.development');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'hot-dev.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.info("==> ✅  Hot Reload server is listening");
  console.info("==> 🌎  Go to http://localhost:3000");
});
