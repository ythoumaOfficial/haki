'use strict';
module.exports = function (prefix, app) {
  var categoryInstance = require('../controllers/categoryController');

  app.route(prefix + '/category')
    .get(categoryInstance.listAll)
    .post(categoryInstance.createNew);

  app.route(prefix + '/category/:id')
    .get(categoryInstance.readById)
    .put(categoryInstance.updateById)
    .patch(categoryInstance.patchById)
    .delete(categoryInstance.deleteById);

  app.route(prefix + '/category/search/:searchKey').get(categoryInstance.search);


};
