'use strict';
module.exports = function (prefix, app) {
  var poll_questionInstance = require('../controllers/poll_questionController');

  app.route(prefix + '/poll_question')
    .get(poll_questionInstance.listAll)
    .post(poll_questionInstance.createNew);

  app.route(prefix + '/poll_question/:id')
    .get(poll_questionInstance.readById)
    .put(poll_questionInstance.updateById)
    .patch(poll_questionInstance.patchById)
    .delete(poll_questionInstance.deleteById);

  app.route(prefix + '/poll_question/search/:searchKey').get(poll_questionInstance.search);


  app.route('/poll_question/getby/Id/:id').get(poll_questionInstance.getById);
};
