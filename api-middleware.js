const request = require('request');
const METHODS = {
  media: 'media'
};

let access_token = 1;

try {
  access_token = require('./env.js').access_token;
} catch (e) {
  console.log('Please enter access token in env.js file');
}

module.exports = (req, res, next) => {
  const result = { status: 'nothing found' };
  const path = req.path;
  const [, section = false, count = 1] = path.split('/');


  const HOST = 'https://api.instagram.com';
  const PATH = 'v1/users/691623/media/recent';
  const url = `${HOST}/${PATH}/?access_token=${access_token}&count=${count}`;

  if (!section) {
    return res.json(result);
  }

  switch (section) {
    case METHODS.media:
      request(url, (err, response, body) => {
        if (body) {
          let parsedBody;
          try {
            parsedBody = JSON.parse(body);
            res.json(parsedBody);
          } catch (e) {
            console.log('%c some text %o', 'color:red', 'Parsing Error >>>', e);
            res.json({ error: e });
          }
        }
      });
      break;
    default:
      return next();
  }
};