'user strict';
var sql = require('./newdb.js');
var url = require('url');
var helper = require('./helper');
//Category object constructor

var Category = function (req, category) {

    this.id = 0;
    this.name = category.name;
};
Category.create = function (req, newCategory, result) {
    sql.query("INSERT INTO category set ?", newCategory, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Category.getById = function (req, id, result) {
    sql.query("SELECT  t.* FROM category t  WHERE t.id= ? LIMIT 0,1", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else if (res && res.length > 0) {
            result(null, res);

        } else {
            result("Record Not Found", null);
        }
    });
};
Category.totalCount = function (req, result) {
    sql.query("SELECT count(*) TotalCount FROM category t  ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Category.totalSearchCount = function (req, searchKey, result) {
    sql.query("SELECT count(*) TotalCount FROM category t  WHERE  LOWER(t.name) LIKE CONCAT('%','" + searchKey + "','%') ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Category.getAll = function (req, offset, pageSize, result) {
    sql.query("SELECT  t.* FROM category t  LIMIT ?, ?", [offset, pageSize], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('category : ', res);

            result(null, res);
        }
    });
};
Category.search = function (req, searchKey, offset, pageSize, result) {

    sql.query("SELECT  t.* FROM category t  WHERE  LOWER(t.name) LIKE CONCAT('%','" + searchKey + "','%') LIMIT ?,?", [offset, pageSize], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('category : ', res);

            result(null, res);
        }
    });
};
Category.updateById = function (req, id, category, result) {
    sql.query("UPDATE category SET name = ? WHERE id= ?", [category.name, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Category.patchById = function (req, id, category, result) {
    sql.query("UPDATE category SET ? WHERE id= ?", [category, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Category.remove = function (req, id, result) {
    sql.query("DELETE FROM category Where id=?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};



module.exports = Category;
