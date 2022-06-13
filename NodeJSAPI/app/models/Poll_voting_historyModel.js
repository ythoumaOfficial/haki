'user strict';
var sql = require('./newdb.js');
var url = require('url');
var helper = require('./helper');
//Poll_Voting_History object constructor

var Poll_Voting_History = function (req, Poll_voting_history) {

    this.id = 0;
    this.option = Poll_voting_history.option;
    this.poll_question_id = Poll_voting_history.poll_question_id;
    this.poll_question_option_id = Poll_voting_history.poll_question_option_id;
    this.user_id = Poll_voting_history.user_id;
    this.id_Value = Poll_voting_history.id_Value;
};
Poll_Voting_History.create = function (req, newPoll_Voting_History, result) {
    sql.query("INSERT INTO Poll_voting_history set ?", newPoll_Voting_History, function (err, res) {

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
Poll_Voting_History.getById = function (req, id, result) {
    sql.query("SELECT  f.full_name as id_Value, t.* FROM Poll_voting_history t  join users f on t.user_id = f.id  WHERE t.id= ? LIMIT 0,1", id, function (err, res) {
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
Poll_Voting_History.totalCount = function (req, result) {
    sql.query("SELECT count(*) TotalCount FROM Poll_voting_history t  join users f on t.user_id = f.id  ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Poll_Voting_History.totalSearchCount = function (req, searchKey, result) {
    sql.query("SELECT count(*) TotalCount FROM Poll_voting_history t  join users f on t.user_id = f.id  WHERE  LOWER(t.option) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.poll_question_id) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.poll_question_option_id) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.user_id) LIKE CONCAT('%','" + searchKey + "','%') ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Poll_Voting_History.getAll = function (req, offset, pageSize, result) {
    sql.query("SELECT  f.full_name as id_Value, t.* FROM Poll_voting_history t  join users f on t.user_id = f.id  LIMIT ?, ?", [offset, pageSize], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('Poll_voting_history : ', res);

            result(null, res);
        }
    });
};
Poll_Voting_History.search = function (req, searchKey, offset, pageSize, result) {

    sql.query("SELECT  f.full_name as id_Value, t.* FROM Poll_voting_history t  join users f on t.user_id = f.id  WHERE  LOWER(t.option) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.poll_question_id) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.poll_question_option_id) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.user_id) LIKE CONCAT('%','" + searchKey + "','%') LIMIT ?,?", [offset, pageSize], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('Poll_voting_history : ', res);

            result(null, res);
        }
    });
};
Poll_Voting_History.updateById = function (req, id, Poll_voting_history, result) {
    sql.query("UPDATE Poll_voting_history SET option = ?,poll_question_id = ?,poll_question_option_id = ?,user_id = ? WHERE id= ?", [Poll_voting_history.option, Poll_voting_history.poll_question_id, Poll_voting_history.poll_question_option_id, Poll_voting_history.user_id, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Poll_Voting_History.patchById = function (req, id, Poll_voting_history, result) {
    sql.query("UPDATE Poll_voting_history SET ? WHERE id= ?", [Poll_voting_history, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Poll_Voting_History.remove = function (req, id, result) {
    sql.query("DELETE FROM Poll_voting_history Where id=?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};


// Poll_Voting_History.getById = function (req, id, offset, pageSize, result) {
//     sql.query("SELECT  f.full_name as id_Value, t.* FROM Poll_voting_history t  join users f on t.user_id = f.id  WHERE t.id= ? LIMIT ?,?", [id, offset, pageSize], function (err, res) {
//         if (err) {
//             console.log('error: ', err);
//             result(null, err);
//         } else {
//             console.log('Poll_voting_history : ', res);
//             result(null, res);
//         }
//     });
// };



Poll_Voting_History.totalByIdCount = function (req, id, result) {
    sql.query("SELECT count(*) TotalCount FROM Poll_voting_history t  join users f on t.user_id = f.id  WHERE t.id= ?", [id], function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Poll_Voting_History;
