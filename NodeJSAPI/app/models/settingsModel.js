'user strict';
var sql = require('./newdb.js');
var url = require('url');
var helper = require('./helper');
//Settings object constructor

var Settings = function (req, settings) {

    this.id = 0;
    this.group = settings.group;
    this.key = settings.key;
    this.value = settings.value;
};
Settings.create = function (req, newSettings, result) {
    sql.query("INSERT INTO settings set ?", newSettings, function (err, res) {

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
Settings.getById = function (req, id, result) {
    sql.query("SELECT  t.* FROM settings t  WHERE t.id= ? LIMIT 0,1", id, function (err, res) {
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
Settings.totalCount = function (req, result) {
    sql.query("SELECT count(*) TotalCount FROM settings t  ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Settings.totalSearchCount = function (req, searchKey, result) {
    sql.query("SELECT count(*) TotalCount FROM settings t  WHERE  LOWER(t.group) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.key) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.value) LIKE CONCAT('%','" + searchKey + "','%') ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Settings.getAll = function (req, offset, pageSize, result) {
    sql.query("SELECT  t.* FROM settings t  LIMIT ?, ?", [offset, pageSize], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('settings : ', res);

            result(null, res);
        }
    });
};
Settings.search = function (req, searchKey, offset, pageSize, result) {

    sql.query("SELECT  t.* FROM settings t  WHERE  LOWER(t.group) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.key) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.value) LIKE CONCAT('%','" + searchKey + "','%') LIMIT ?,?", [offset, pageSize], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('settings : ', res);

            result(null, res);
        }
    });
};
Settings.updateById = function (req, id, settings, result) {
    sql.query("UPDATE settings SET group = ?,key = ?,value = ? WHERE id= ?", [settings.group, settings.key, settings.value, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Settings.patchById = function (req, id, settings, result) {
    sql.query("UPDATE settings SET ? WHERE id= ?", [settings, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Settings.remove = function (req, id, result) {
    sql.query("DELETE FROM settings Where id=?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};



module.exports = Settings;
