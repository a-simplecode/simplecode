const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  images:{
    domains:[
      "img.shields.io",
      "packagequality.com"
    ]
  },
  reactStrictMode: true,
});
