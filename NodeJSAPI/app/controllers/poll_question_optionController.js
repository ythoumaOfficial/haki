'use strict';
var helper = require('../models/helper.js');
var Poll_Question_OptionController = require('../models/poll_question_optionModel.js');

exports.listAll = function (req, res) {
  try {
    helper.checkPermission(req, "v", function (isPermited) {
      if (isPermited) {
        var pageNo = 1;
        if (req.query && req.query.pageNo) {
          pageNo = parseInt(req.query.pageNo);
        }
        var pageSize = 30;
        if (req.query && req.query.pageSize) {
          pageSize = parseInt(req.query.pageSize);
        }
        var offset = (pageNo - 1) * pageSize;
        Poll_Question_OptionController.getAll(req, offset, pageSize, function (err, poll_question_option) {

          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            var totalCount = 0;

            Poll_Question_OptionController.totalCount(req, function (err, total) {
              if (err) {
                res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
              } else {
                if (total && total[0] && total[0].TotalCount && total[0].TotalCount > 0) {
                  totalCount = total[0].TotalCount;
                  var result = { records: poll_question_option, pageNo: pageNo, pageSize: pageSize, totalCount: totalCount };
                  res.status(200).send(helper.createResponse(helper.Success, 1, "Record found", result));
                } else {
                  res.status(200).send(helper.createResponse(helper.Error, 0, "No Record Found", ""));
                }
              }
            });
          }


        });
      } else {
        res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
      }
    });
  } catch (error) {
    res.status(500).send(helper.createResponse(helper.Error, 0, error.message, ''));
  }
};


exports.search = function (req, res) {
  try {
    helper.checkPermission(req, "v", function (isPermited) {
      if (isPermited) {
        var pageNo = 1;
        if (req.query && req.query.pageNo) {
          pageNo = parseInt(req.query.pageNo);
        }
        var pageSize = 30;
        if (req.query && req.query.pageSize) {
          pageSize = parseInt(req.query.pageSize);
        }
        var offset = (pageNo - 1) * pageSize;
        Poll_Question_OptionController.search(req, req.params.searchKey.toLowerCase(), offset, pageSize, function (err, poll_question_option) {

          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            var totalCount = 0;
            Poll_Question_OptionController.totalSearchCount(req, req.params.searchKey.toLowerCase(), function (err, total) {
              if (err) {
                res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
              } else {
                if (total && total[0] && total[0].TotalCount && total[0].TotalCount > 0) {
                  totalCount = total[0].TotalCount;
                  var result = { records: poll_question_option, pageNo: pageNo, pageSize: pageSize, totalCount: totalCount };
                  res.status(200).send(helper.createResponse(helper.Success, 1, "Record found", result));
                } else {
                  res.status(200).send(helper.createResponse(helper.Error, 0, "No Record Found", ""));
                }
              }
            });
          }


        });
      } else {
        res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
      }
    });
  } catch (error) {
    res.status(500).send(helper.createResponse(helper.Error, 0, error.message, ''));
  }
};


exports.createNew = function (req, res) {
  try {
    helper.checkPermission(req, "a", function (isPermited) {
      if (isPermited) {
        var reqObj = new Poll_Question_OptionController(req, req.body);
        var createObj = {

          id: 0,
          option: req.body.option,
          poll_question_id: req.body.poll_question_id,
        };
        if (!createObj.option || !createObj.poll_question_id) {

          res.status(400).send({ error: true, message: 'Please provide required fields' });

        }
        else {

          Poll_Question_OptionController.create(req, createObj, function (err, poll_question_option) {

            if (err) {
              res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
            } else {
              res.status(200).send(helper.createResponse(helper.Success, 1, "Record Created", poll_question_option));
            }
          });
        }
      } else {
        res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
      }
    });
  } catch (error) {
    res.status(500).send(helper.createResponse(helper.Error, 0, error.message, ''));
  }
};


exports.readById = function (req, res) {
  try {
    helper.checkPermission(req, "v", function (isPermited) {
      if (isPermited) {
        Poll_Question_OptionController.getById(req, req.params.id, function (err, poll_question_option) {
          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            res.status(200).send(helper.createResponse(helper.Success, 1, "Record found", poll_question_option[0]));
          }
        });
      } else {
        res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
      }
    });
  } catch (error) {
    res.status(500).send(helper.createResponse(helper.Error, 0, error.message, ''));
  }
};


exports.patchById = function (req, res) {
  try {
    helper.checkPermission(req, "u", function (isPermited) {
      if (isPermited) {
        Poll_Question_OptionController.getById(req, req.params.id, function (err, poll_question_option) {
          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, "No record found for this input"));
          } else {
            Poll_Question_OptionController.patchById(req, req.params.id, req.body, function (err, poll_question_option) {
              if (err) {
                res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
              } else {
                res.status(200).send(helper.createResponse(helper.Success, 1, "Record Updated", ""));
              }
            });
          }
        });
      } else {
        res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
      }
    });
  } catch (error) {
    res.status(500).send(helper.createResponse(helper.Error, 0, error.message, ''));
  }
};

exports.updateById = function (req, res) {
  try {
    helper.checkPermission(req, "u", function (isPermited) {
      if (isPermited) {
        Poll_Question_OptionController.updateById(req, req.params.id, new Poll_Question_OptionController(req, req.body), function (err, poll_question_option) {
          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            res.status(200).send(helper.createResponse(helper.Success, 1, "Record Updated", ""));
          }
        });
      } else {
        res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
      }
    });
  } catch (error) {
    res.status(500).send(helper.createResponse(helper.Error, 0, error.message, ''));
  }
};

exports.deleteById = function (req, res) {
  try {
    helper.checkPermission(req, "d", function (isPermited) {
      if (isPermited) {
        Poll_Question_OptionController.remove(req, req.params.id, function (err, poll_question_option) {
          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            res.status(200).send(helper.createResponse(helper.Success, 1, "Deleted", ""));
          }
        });
      } else {
        res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
      }
    });
  } catch (error) {
    res.status(500).send(helper.createResponse(helper.Error, 0, error.message, ''));
  }
};


