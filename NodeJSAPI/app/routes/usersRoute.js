'use strict';
module.exports = function (prefix, app) {
  var usersInstance = require('../controllers/usersController');
  var usersModel = require('../models/usersModel');
  var pollModel = require('../models/pollModel');

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

  app.get('/api/pollview/:pollid/:userid', (req, res) => {
    res.header("Content-Type", 'text/html; charset=UTF-8');
    let pollId = req.params.pollid
    let userId = req.params.userid
    usersModel.getById(null, userId, function (err, user) {
      if (user) {
        pollModel.getAllById(null, pollId, userId, function (err, poll) {
          if (poll) {

            let jsonResult = JSON.parse(poll['result']);
            console.log(poll)
            if (poll['exist'] == 0) {
              return res.render('poll-error', { 'message': 'poll not found' });
            } else if (poll['completed'] == 0) {
              return res.render('poll-view', { 'data': jsonResult, 'userId': userId, 'pollId': pollId, 'showResult': true });
            } else
              return res.render('poll-view-result', { 'data': jsonResult, 'userId': userId, 'pollId': pollId, 'showResult': true });
          }
          else {
            return res.render('poll-error', { 'message': 'poll not found' });
          }
        });
      } else {
        return res.render('poll-error', { 'message': 'user not found' });
      }
    })
    /*
    3- veriy poll Answered
    */


  });
};
