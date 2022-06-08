'use strict';
module.exports = function (prefix, app) {
  var usersInstance = require('../controllers/usersController');

  app.route(prefix + '/users')
    .get(usersInstance.listAll)
    .post(usersInstance.createNew);

  app.route(prefix + '/users/:id')
    .get(usersInstance.readById)
    .put(usersInstance.updateById)
    .patch(usersInstance.patchById)
    .delete(usersInstance.deleteById);

  app.route(prefix + '/users/search/:searchKey').get(usersInstance.search);


  app.route('/users/getby/Id/:id').get(usersInstance.getById);
  app.route('/users/getby/Id/:id').get(usersInstance.getById);
  app.route('/users/getby/Id/:id').get(usersInstance.getById);
};
