'user strict';
var sql = require('./newdb.js');
var url = require('url');
var helper = require('./helper');
//Poll_Question_Option object constructor

var Poll_Question_Option = function (req, poll_question_option) {

    this.id = 0;
    this.option = poll_question_option.option;
    this.poll_question_id = poll_question_option.poll_question_id;
};
Poll_Question_Option.create = function (req, newPoll_Question_Option, result) {
    sql.query("INSERT INTO poll_question_option set ?", newPoll_Question_Option, function (err, res) {

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
Poll_Question_Option.getById = function (req, id, result) {
    sql.query("SELECT  t.* FROM poll_question_option t  WHERE t.id= ? LIMIT 0,1", id, function (err, res) {
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
Poll_Question_Option.totalCount = function (req, result) {
    sql.query("SELECT count(*) TotalCount FROM poll_question_option t  ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Poll_Question_Option.totalSearchCount = function (req, searchKey, result) {
    sql.query("SELECT count(*) TotalCount FROM poll_question_option t  WHERE  LOWER(t.option) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.poll_question_id) LIKE CONCAT('%','" + searchKey + "','%') ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Poll_Question_Option.getAll = function (req, offset, pageSize, result) {
    sql.query("SELECT  t.* FROM poll_question_option t  LIMIT ?, ?", [offset, pageSize], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('poll_question_option : ', res);

            result(null, res);
        }
    });
};
Poll_Question_Option.search = function (req, searchKey, offset, pageSize, result) {

    sql.query("SELECT  t.* FROM poll_question_option t  WHERE  LOWER(t.option) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.poll_question_id) LIKE CONCAT('%','" + searchKey + "','%') LIMIT ?,?", [offset, pageSize], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('poll_question_option : ', res);

            result(null, res);
        }
    });
};
Poll_Question_Option.updateById = function (req, id, poll_question_option, result) {
    sql.query("UPDATE poll_question_option SET option = ?,poll_question_id = ? WHERE id= ?", [poll_question_option.option, poll_question_option.poll_question_id, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Poll_Question_Option.patchById = function (req, id, poll_question_option, result) {
    sql.query("UPDATE poll_question_option SET ? WHERE id= ?", [poll_question_option, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Poll_Question_Option.remove = function (req, id, result) {
    sql.query("DELETE FROM poll_question_option Where id=?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};



module.exports = Poll_Question_Option;
