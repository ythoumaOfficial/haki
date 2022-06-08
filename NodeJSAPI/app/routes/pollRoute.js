'use strict';
module.exports = function (prefix, app) {
  var pollInstance = require('../controllers/pollController');

  app.route(prefix + '/poll')
    .get(pollInstance.listAll)
    .post(pollInstance.createNew);

  app.route(prefix + '/poll/:id')
    .get(pollInstance.readById)
    .put(pollInstance.updateById)
    .patch(pollInstance.patchById)
    .delete(pollInstance.deleteById);

  app.route(prefix + '/poll/search/:searchKey').get(pollInstance.search);


  app.route('/poll/getby/Id/:id').get(pollInstance.getById);
};
