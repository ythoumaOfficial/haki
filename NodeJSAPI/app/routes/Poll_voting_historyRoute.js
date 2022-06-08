'use strict';
module.exports = function (prefix, app) {
  var Poll_voting_historyInstance = require('../controllers/Poll_voting_historyController');

  app.route(prefix + '/Poll_voting_history')
    .get(Poll_voting_historyInstance.listAll)
    .post(Poll_voting_historyInstance.createNew);

  app.route(prefix + '/Poll_voting_history/:id')
    .get(Poll_voting_historyInstance.readById)
    .put(Poll_voting_historyInstance.updateById)
    .patch(Poll_voting_historyInstance.patchById)
    .delete(Poll_voting_historyInstance.deleteById);

  app.route(prefix + '/Poll_voting_history/search/:searchKey').get(Poll_voting_historyInstance.search);


  app.route('/Poll_voting_history/getby/Id/:id').get(Poll_voting_historyInstance.getById);
};
