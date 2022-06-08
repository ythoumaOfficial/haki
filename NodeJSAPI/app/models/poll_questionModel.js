'user strict';
var sql = require('./newdb.js');
var url = require('url');
var helper = require('./helper');
//Poll_Question object constructor

var Poll_Question = function (req, poll_question) {

    this.id = 0;
    this.question = poll_question.question;
    this.poll_id = poll_question.poll_id;
    this.id_Value = poll_question.id_Value;
};
Poll_Question.create = function (req, newPoll_Question, result) {
    sql.query("INSERT INTO poll_question set ?", newPoll_Question, function (err, res) {

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
Poll_Question.getById = function (req, id, result) {
    sql.query("SELECT  sss.name as id_Value, t.* FROM poll_question t  join poll sss on t.poll_id = sss.id  WHERE t.id= ? LIMIT 0,1", id, function (err, res) {
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
Poll_Question.totalCount = function (req, result) {
    sql.query("SELECT count(*) TotalCount FROM poll_question t  join poll sss on t.poll_id = sss.id  ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Poll_Question.totalSearchCount = function (req, searchKey, result) {
    sql.query("SELECT count(*) TotalCount FROM poll_question t  join poll sss on t.poll_id = sss.id  WHERE  LOWER(t.question) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.poll_id) LIKE CONCAT('%','" + searchKey + "','%') ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Poll_Question.getAll = function (req, offset, pageSize, result) {
    sql.query("SELECT  sss.name as id_Value, t.* FROM poll_question t  join poll sss on t.poll_id = sss.id  LIMIT ?, ?", [offset, pageSize], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('poll_question : ', res);

            result(null, res);
        }
    });
};
Poll_Question.search = function (req, searchKey, offset, pageSize, result) {

    sql.query("SELECT  sss.name as id_Value, t.* FROM poll_question t  join poll sss on t.poll_id = sss.id  WHERE  LOWER(t.question) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.poll_id) LIKE CONCAT('%','" + searchKey + "','%') LIMIT ?,?", [offset, pageSize], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('poll_question : ', res);

            result(null, res);
        }
    });
};
Poll_Question.updateById = function (req, id, poll_question, result) {
    sql.query("UPDATE poll_question SET question = ?,poll_id = ? WHERE id= ?", [poll_question.question, poll_question.poll_id, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Poll_Question.patchById = function (req, id, poll_question, result) {
    sql.query("UPDATE poll_question SET ? WHERE id= ?", [poll_question, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Poll_Question.remove = function (req, id, result) {
    sql.query("DELETE FROM poll_question Where id=?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};


Poll_Question.getById = function (req, id, offset, pageSize, result) {
    sql.query("SELECT  sss.name as id_Value, t.* FROM poll_question t  join poll sss on t.poll_id = sss.id  WHERE t.id= ? LIMIT ?,?", [id, offset, pageSize], function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(null, err);
        } else {
            console.log('poll_question : ', res);
            result(null, res);
        }
    });
};



Poll_Question.totalByIdCount = function (req, id, result) {
    sql.query("SELECT count(*) TotalCount FROM poll_question t  join poll sss on t.poll_id = sss.id  WHERE t.id= ?", [id], function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Poll_Question;
