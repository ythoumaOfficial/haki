'use strict';
module.exports = function (prefix, app) {
  var settingsInstance = require('../controllers/settingsController');

  app.route(prefix + '/settings')
    .get(settingsInstance.listAll)
    .post(settingsInstance.createNew);

  app.route(prefix + '/settings/:id')
    .get(settingsInstance.readById)
    .put(settingsInstance.updateById)
    .patch(settingsInstance.patchById)
    .delete(settingsInstance.deleteById);

  app.route(prefix + '/settings/search/:searchKey').get(settingsInstance.search);


};
