'use strict';
module.exports = function (prefix, app) {
  var poll_question_optionInstance = require('../controllers/poll_question_optionController');

  app.route(prefix + '/poll_question_option')
    .get(poll_question_optionInstance.listAll)
    .post(poll_question_optionInstance.createNew);

  app.route(prefix + '/poll_question_option/:id')
    .get(poll_question_optionInstance.readById)
    .put(poll_question_optionInstance.updateById)
    .patch(poll_question_optionInstance.patchById)
    .delete(poll_question_optionInstance.deleteById);

  app.route(prefix + '/poll_question_option/search/:searchKey').get(poll_question_optionInstance.search);


};
