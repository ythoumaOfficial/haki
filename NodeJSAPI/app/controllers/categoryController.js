'use strict';
var helper = require('../models/helper.js');
var CategoryController = require('../models/categoryModel.js');

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
        CategoryController.getAll(req, offset, pageSize, function (err, category) {

          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            var totalCount = 0;

            CategoryController.totalCount(req, function (err, total) {
              if (err) {
                res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
              } else {
                if (total && total[0] && total[0].TotalCount && total[0].TotalCount > 0) {
                  totalCount = total[0].TotalCount;
                  var result = { records: category, pageNo: pageNo, pageSize: pageSize, totalCount: totalCount };
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
        CategoryController.search(req, req.params.searchKey.toLowerCase(), offset, pageSize, function (err, category) {

          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            var totalCount = 0;
            CategoryController.totalSearchCount(req, req.params.searchKey.toLowerCase(), function (err, total) {
              if (err) {
                res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
              } else {
                if (total && total[0] && total[0].TotalCount && total[0].TotalCount > 0) {
                  totalCount = total[0].TotalCount;
                  var result = { records: category, pageNo: pageNo, pageSize: pageSize, totalCount: totalCount };
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
        var reqObj = new CategoryController(req, req.body);
        var createObj = {

          id: 0,
          name: req.body.name,
        };
        if (!createObj.name) {

          res.status(400).send({ error: true, message: 'Please provide required fields' });

        }
        else {

          CategoryController.create(req, createObj, function (err, category) {

            if (err) {
              res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
            } else {
              res.status(200).send(helper.createResponse(helper.Success, 1, "Record Created", category));
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
        CategoryController.getById(req, req.params.id, function (err, category) {
          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            res.status(200).send(helper.createResponse(helper.Success, 1, "Record found", category[0]));
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
        CategoryController.getById(req, req.params.id, function (err, category) {
          if (err) {
            res.status(200).send(helper.createResponse(helper.Error, 0, err, "No record found for this input"));
          } else {
            CategoryController.patchById(req, req.params.id, req.body, function (err, category) {
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
        CategoryController.updateById(req, req.params.id, new CategoryController(req, req.body), function (err, category) {
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
        CategoryController.remove(req, req.params.id, function (err, category) {
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


