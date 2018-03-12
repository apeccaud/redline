const path = require('path');
const serveStatic = require('serve-static');

const apiRoutes = require('../api');

module.exports = (app) => {
  app.use('/api', apiRoutes);
  app.use(serveStatic('./public'));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
};
