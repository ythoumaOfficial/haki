'user strict';
var sql = require('./newdb.js');
var url = require('url');
var helper = require('./helper');
//Users object constructor

var Users = function (req, users) {

    this.id = 0;
    this.full_name = users.full_name;
    this.birth_date = users.birth_date;
    this.gender = users.gender;
    this.religion = users.religion;
    this.email = users.email;
    this.country = users.country;
    this.city = users.city;
    this.geo = users.geo;
    this.otp = users.otp;
    this.active = users.active;
    this.phone = users.phone;
    this.password = users.password;
    this.fcm_token = users.fcm_token;
    this.id_Value = users.id_Value;
    this.id_Value = users.id_Value;
    this.id_Value = users.id_Value;
};
Users.create = function (req, newUsers, result) {
    sql.query("INSERT INTO users set ?", newUsers, function (err, res) {

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
Users.getById = function (req, id, result) {
    sql.query("SELECT  hhhh.group as id_Value, bbbb.group as id_Value, kkkk.group as id_Value, t.* FROM users t  join settings hhhh on t.gender = hhhh.id  join settings bbbb on t.religion = bbbb.id  join settings kkkk on t.country = kkkk.id  WHERE t.id= ? LIMIT 0,1", id, function (err, res) {
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
Users.totalCount = function (req, result) {
    sql.query("SELECT count(*) TotalCount FROM users t  join settings hhhh on t.gender = hhhh.id  join settings bbbb on t.religion = bbbb.id  join settings kkkk on t.country = kkkk.id  ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Users.totalSearchCount = function (req, searchKey, result) {
    sql.query("SELECT count(*) TotalCount FROM users t  join settings hhhh on t.gender = hhhh.id  join settings bbbb on t.religion = bbbb.id  join settings kkkk on t.country = kkkk.id  WHERE  LOWER(t.full_name) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.birth_date) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.gender) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.religion) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.email) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.country) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.city) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.geo) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.otp) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.active) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.phone) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.password) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.fcm_token) LIKE CONCAT('%','" + searchKey + "','%') ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Users.getAll = function (req, offset, pageSize, result) {
    sql.query("SELECT  hhhh.group as id_Value, bbbb.group as id_Value, kkkk.group as id_Value, t.* FROM users t  join settings hhhh on t.gender = hhhh.id  join settings bbbb on t.religion = bbbb.id  join settings kkkk on t.country = kkkk.id  LIMIT ?, ?", [offset, pageSize], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('users : ', res);

            result(null, res);
        }
    });
};
Users.search = function (req, searchKey, offset, pageSize, result) {

    sql.query("SELECT  hhhh.group as id_Value, bbbb.group as id_Value, kkkk.group as id_Value, t.* FROM users t  join settings hhhh on t.gender = hhhh.id  join settings bbbb on t.religion = bbbb.id  join settings kkkk on t.country = kkkk.id  WHERE  LOWER(t.full_name) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.birth_date) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.gender) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.religion) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.email) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.country) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.city) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.geo) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.otp) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.active) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.phone) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.password) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.fcm_token) LIKE CONCAT('%','" + searchKey + "','%') LIMIT ?,?", [offset, pageSize], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('users : ', res);

            result(null, res);
        }
    });
};
Users.updateById = function (req, id, users, result) {
    sql.query("UPDATE users SET full_name = ?,birth_date = ?,gender = ?,religion = ?,email = ?,country = ?,city = ?,geo = ?,otp = ?,active = ?,phone = ?,password = ?,fcm_token = ? WHERE id= ?", [users.full_name, users.birth_date, users.gender, users.religion, users.email, users.country, users.city, users.geo, users.otp, users.active, users.phone, users.password, users.fcm_token, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Users.patchById = function (req, id, users, result) {
    sql.query("UPDATE users SET ? WHERE id= ?", [users, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Users.remove = function (req, id, result) {
    sql.query("DELETE FROM users Where id=?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};


Users.getById = function (req, id, offset, pageSize, result) {
    sql.query("SELECT  hhhh.group as id_Value, bbbb.group as id_Value, kkkk.group as id_Value, t.* FROM users t  join settings hhhh on t.gender = hhhh.id  join settings bbbb on t.religion = bbbb.id  join settings kkkk on t.country = kkkk.id  WHERE t.id= ? LIMIT ?,?", [id, offset, pageSize], function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(null, err);
        } else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};



Users.totalByIdCount = function (req, id, result) {
    sql.query("SELECT count(*) TotalCount FROM users t  join settings hhhh on t.gender = hhhh.id  join settings bbbb on t.religion = bbbb.id  join settings kkkk on t.country = kkkk.id  WHERE t.id= ?", [id], function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Users.getById = function (req, id, offset, pageSize, result) {
    sql.query("SELECT  hhhh.group as id_Value, bbbb.group as id_Value, kkkk.group as id_Value, t.* FROM users t  join settings hhhh on t.gender = hhhh.id  join settings bbbb on t.religion = bbbb.id  join settings kkkk on t.country = kkkk.id  WHERE t.id= ? LIMIT ?,?", [id, offset, pageSize], function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(null, err);
        } else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};



Users.totalByIdCount = function (req, id, result) {
    sql.query("SELECT count(*) TotalCount FROM users t  join settings hhhh on t.gender = hhhh.id  join settings bbbb on t.religion = bbbb.id  join settings kkkk on t.country = kkkk.id  WHERE t.id= ?", [id], function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Users.getById = function (req, id, offset, pageSize, result) {
    sql.query("SELECT  hhhh.group as id_Value, bbbb.group as id_Value, kkkk.group as id_Value, t.* FROM users t  join settings hhhh on t.gender = hhhh.id  join settings bbbb on t.religion = bbbb.id  join settings kkkk on t.country = kkkk.id  WHERE t.id= ? LIMIT ?,?", [id, offset, pageSize], function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(null, err);
        } else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};



Users.totalByIdCount = function (req, id, result) {
    sql.query("SELECT count(*) TotalCount FROM users t  join settings hhhh on t.gender = hhhh.id  join settings bbbb on t.religion = bbbb.id  join settings kkkk on t.country = kkkk.id  WHERE t.id= ?", [id], function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Users;
