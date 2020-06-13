const proxy = require('http-proxy-middleware');


function onProxyReq(proxyReq, req, res) {
  proxyReq.setHeader('Cookie', 'token=db5a50a572df484ea021001053198724');
}

module.exports = function(app) {
  app.use('/api/pv-web', proxy({
    onProxyReq,
    target: 'https://platform-test.mobilemd.cn',
    changeOrigin: true,
    cookieDomainRewrite: {
      "*": ".mobilemd.cn"
    },
    cookiePathRewrite: {
      "*": "/"
    },
    pathRewrite: {
      '^/api/pv-web': '/api/pv-web-xlt'
    }
  }));


  app.use('/file/', proxy({
    onProxyReq,
    target: 'https://platform-test.mobilemd.cn',
    changeOrigin: true,
    cookieDomainRewrite: {
      "*": ".mobilemd.cn"
    },
    cookiePathRewrite: {
      "*": "/"
    },
    pathRewrite: {
      '^/$': ''
    }
  }));
};  