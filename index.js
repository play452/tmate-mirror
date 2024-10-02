const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const tmate = 'https://help.moonlightpanel.xyz/';

const proxy = createProxyMiddleware({
  target: tmate,
  changeOrigin: true,
  secure: true,
  logLevel: 'debug',
  router: function(req) {
    if (req.headers.host === 'stackoverflow.com') {
      req.headers['X-Forwarded-For'] = ''; 
      req.headers['X-Real-IP'] = '';
      req.headers['Via'] = '';
    }
    return tmate;
  }
});

app.use('*', proxy);

const port = process.env.PORT || 443;
app.listen(port, () => {
  console.log(`${port}`);
});
