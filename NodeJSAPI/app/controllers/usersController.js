'use strict';
var helper = require('../models/helper.js');
var UsersController = require('../models/usersModel.js');

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
        UsersController.getAll(req, offset, pageSize, function (err, users) {

          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            var totalCount = 0;

            UsersController.totalCount(req, function (err, total) {
              if (err) {
                res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
              } else {
                if (total && total[0] && total[0].TotalCount && total[0].TotalCount > 0) {
                  totalCount = total[0].TotalCount;
                  var result = { records: users, pageNo: pageNo, pageSize: pageSize, totalCount: totalCount };
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
        UsersController.search(req, req.params.searchKey.toLowerCase(), offset, pageSize, function (err, users) {

          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            var totalCount = 0;
            UsersController.totalSearchCount(req, req.params.searchKey.toLowerCase(), function (err, total) {
              if (err) {
                res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
              } else {
                if (total && total[0] && total[0].TotalCount && total[0].TotalCount > 0) {
                  totalCount = total[0].TotalCount;
                  var result = { records: users, pageNo: pageNo, pageSize: pageSize, totalCount: totalCount };
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
        var reqObj = new UsersController(req, req.body);
        var createObj = {

          id: 0,
          full_name: req.body.full_name,
          birth_date: req.body.birth_date,
          gender: req.body.gender,
          religion: req.body.religion,
          email: req.body.email,
          country: req.body.country,
          city: req.body.city,
          geo: req.body.geo,
          otp: req.body.otp,
          active: req.body.active,
          phone: req.body.phone,
          password: req.body.password,
          fcm_token: req.body.fcm_token,
        };
        if (!createObj.full_name || !createObj.birth_date || !createObj.gender || !createObj.religion || !createObj.email || !createObj.country || !createObj.city || !createObj.geo || !createObj.otp || !createObj.active || !createObj.phone || !createObj.password || !createObj.fcm_token) {

          res.status(400).send({ error: true, message: 'Please provide required fields' });

        }
        else {

          UsersController.create(req, createObj, function (err, users) {

            if (err) {
              res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
            } else {
              res.status(200).send(helper.createResponse(helper.Success, 1, "Record Created", users));
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
        UsersController.getById(req, req.params.id, function (err, users) {
          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            res.status(200).send(helper.createResponse(helper.Success, 1, "Record found", users[0]));
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
        UsersController.getById(req, req.params.id, function (err, users) {
          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, "No record found for this input"));
          } else {
            UsersController.patchById(req, req.params.id, req.body, function (err, users) {
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
        UsersController.updateById(req, req.params.id, new UsersController(req, req.body), function (err, users) {
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
        UsersController.remove(req, req.params.id, function (err, users) {
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


exports.getById = function (req, res) {
  try {
    helper.checkPermission(req, 'v', function (isPermited) {
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
        UsersController.getById(req, req.params.id, offset, pageSize, function (err, users) {
          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ''));
          } else {
            var totalCount = 0;
            UsersController.totalByIdCount(req, req.params.id, function (err, total) {
              if (err) {
                res.status(200).send(helper.createResponse(helper.Error, 0, err, ''));
              } else {
                if (total && total[0] && total[0].TotalCount && total[0].TotalCount > 0) {
                  totalCount = total[0].TotalCount;
                  var result = { records: users, pageNo: pageNo, pageSize: pageSize, totalCount: totalCount };
                  res.status(200).send(helper.createResponse(helper.Success, 1, 'Record found', result));
                } else {
                  res.status(200).send(helper.createResponse(helper.Error, 0, 'No Record Found', ''));
                }
              }
            });
          }
        });
      } else {
        res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ''));
      }
    });
  } catch (error) {
    res.status(500).send(helper.createResponse(helper.Error, 0, error.message, ''));
  }
};
exports.getById = function (req, res) {
  try {
    helper.checkPermission(req, 'v', function (isPermited) {
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
        UsersController.getById(req, req.params.id, offset, pageSize, function (err, users) {
          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ''));
          } else {
            var totalCount = 0;
            UsersController.totalByIdCount(req, req.params.id, function (err, total) {
              if (err) {
                res.status(200).send(helper.createResponse(helper.Error, 0, err, ''));
              } else {
                if (total && total[0] && total[0].TotalCount && total[0].TotalCount > 0) {
                  totalCount = total[0].TotalCount;
                  var result = { records: users, pageNo: pageNo, pageSize: pageSize, totalCount: totalCount };
                  res.status(200).send(helper.createResponse(helper.Success, 1, 'Record found', result));
                } else {
                  res.status(200).send(helper.createResponse(helper.Error, 0, 'No Record Found', ''));
                }
              }
            });
          }
        });
      } else {
        res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ''));
      }
    });
  } catch (error) {
    res.status(500).send(helper.createResponse(helper.Error, 0, error.message, ''));
  }
};
exports.getById = function (req, res) {
  try {
    helper.checkPermission(req, 'v', function (isPermited) {
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
        UsersController.getById(req, req.params.id, offset, pageSize, function (err, users) {
          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ''));
          } else {
            var totalCount = 0;
            UsersController.totalByIdCount(req, req.params.id, function (err, total) {
              if (err) {
                res.status(200).send(helper.createResponse(helper.Error, 0, err, ''));
              } else {
                if (total && total[0] && total[0].TotalCount && total[0].TotalCount > 0) {
                  totalCount = total[0].TotalCount;
                  var result = { records: users, pageNo: pageNo, pageSize: pageSize, totalCount: totalCount };
                  res.status(200).send(helper.createResponse(helper.Success, 1, 'Record found', result));
                } else {
                  res.status(200).send(helper.createResponse(helper.Error, 0, 'No Record Found', ''));
                }
              }
            });
          }
        });
      } else {
        res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ''));
      }
    });
  } catch (error) {
    res.status(500).send(helper.createResponse(helper.Error, 0, error.message, ''));
  }
};
