'use strict';
var helper = require('../models/helper.js');
var SettingsController = require('../models/settingsModel.js');

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
        SettingsController.getAll(req, offset, pageSize, function (err, settings) {

          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            var totalCount = 0;

            SettingsController.totalCount(req, function (err, total) {
              if (err) {
                res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
              } else {
                if (total && total[0] && total[0].TotalCount && total[0].TotalCount > 0) {
                  totalCount = total[0].TotalCount;
                  var result = { records: settings, pageNo: pageNo, pageSize: pageSize, totalCount: totalCount };
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
        SettingsController.search(req, req.params.searchKey.toLowerCase(), offset, pageSize, function (err, settings) {

          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            var totalCount = 0;
            SettingsController.totalSearchCount(req, req.params.searchKey.toLowerCase(), function (err, total) {
              if (err) {
                res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
              } else {
                if (total && total[0] && total[0].TotalCount && total[0].TotalCount > 0) {
                  totalCount = total[0].TotalCount;
                  var result = { records: settings, pageNo: pageNo, pageSize: pageSize, totalCount: totalCount };
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
        var reqObj = new SettingsController(req, req.body);
        var createObj = {

          id: 0,
          group: req.body.group,
          key: req.body.key,
          value: req.body.value,
        };
        if (!createObj.group || !createObj.key || !createObj.value) {

          res.status(400).send({ error: true, message: 'Please provide required fields' });

        }
        else {

          SettingsController.create(req, createObj, function (err, settings) {

            if (err) {
              res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
            } else {
              res.status(200).send(helper.createResponse(helper.Success, 1, "Record Created", settings));
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
        SettingsController.getById(req, req.params.id, function (err, settings) {
          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            res.status(200).send(helper.createResponse(helper.Success, 1, "Record found", settings[0]));
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
        SettingsController.getById(req, req.params.id, function (err, settings) {
          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, "No record found for this input"));
          } else {
            SettingsController.patchById(req, req.params.id, req.body, function (err, settings) {
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
        SettingsController.updateById(req, req.params.id, new SettingsController(req, req.body), function (err, settings) {
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
        SettingsController.remove(req, req.params.id, function (err, settings) {
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


