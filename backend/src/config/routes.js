const path = require('path');
const serveStatic = require('serve-static');

const apiRoutes = require('../api');
const { isAuthenticated, initialize } = require('../auth/auth.middleware');

module.exports = (app) => {
  app.use('/api', [initialize, isAuthenticated], apiRoutes);
  app.use(serveStatic('./public'));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
  });
};
