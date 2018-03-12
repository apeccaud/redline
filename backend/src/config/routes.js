const path = require('path');
const serveStatic = require('serve-static');

const apiRoutes = require('../api');
const isAuthenticated = require('../auth/auth.middleware');

module.exports = (app) => {
  app.use('/api', isAuthenticated, apiRoutes);
  app.use(serveStatic('./public'));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
  });
};
