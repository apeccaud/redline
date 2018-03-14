const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    console.log(new Date(), req.ip, req.method, req.url, req.query, req.body);
    next();
  });
};
