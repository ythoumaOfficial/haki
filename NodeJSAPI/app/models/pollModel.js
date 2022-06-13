'user strict';
var sql = require('./newdb.js');
var url = require('url');
var helper = require('./helper');
//Poll object constructor

var Poll = function (req, poll) {

    this.id = 0;
    this.name = poll.name;
    this.description = poll.description;
    this.category_id = poll.category_id;
    this.id_Value = poll.id_Value;
};
Poll.create = function (req, newPoll, result) {
    sql.query("INSERT INTO poll set ?", newPoll, function (err, res) {

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
Poll.getById = function (req, id, result) {
    sql.query("SELECT  fff.name as id_Value, t.* FROM poll t  join category fff on t.category_id = fff.id  WHERE t.id= ? LIMIT 0,1", id, function (err, res) {
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
Poll.getAllById = function (req, id, result) {
    sql.query(`SELECT JSON_ARRAYAGG(JSON_OBJECT('id', pq.id,'question', pq.question, 'options', 
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', pqo.id,'option', pqo.option)) FROM haki.poll_question_option pqo    
    where pqo.poll_question_id  = pq.id ))) as result FROM haki.poll_question pq where pq.poll_id = ? LIMIT 0,1`,
        id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else if (res && res.length > 0) {
                result(null, res[0]);

            } else {
                result("Record Not Found", null);
            }
        });
};
Poll.totalCount = function (req, result) {
    sql.query("SELECT count(*) TotalCount FROM poll t  join category fff on t.category_id = fff.id  ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Poll.totalSearchCount = function (req, searchKey, result) {
    sql.query("SELECT count(*) TotalCount FROM poll t  join category fff on t.category_id = fff.id  WHERE  LOWER(t.name) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.description) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.category_id) LIKE CONCAT('%','" + searchKey + "','%') ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Poll.getAll = function (req, offset, pageSize, result) {
    sql.query("SELECT  fff.name as id_Value, t.* FROM poll t  join category fff on t.category_id = fff.id  LIMIT ?, ?", [offset, pageSize], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('poll : ', res);

            result(null, res);
        }
    });
};
Poll.search = function (req, searchKey, offset, pageSize, result) {

    sql.query("SELECT  fff.name as id_Value, t.* FROM poll t  join category fff on t.category_id = fff.id  WHERE  LOWER(t.name) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.description) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.category_id) LIKE CONCAT('%','" + searchKey + "','%') LIMIT ?,?", [offset, pageSize], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('poll : ', res);

            result(null, res);
        }
    });
};
Poll.updateById = function (req, id, poll, result) {
    sql.query("UPDATE poll SET name = ?,description = ?,category_id = ? WHERE id= ?", [poll.name, poll.description, poll.category_id, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Poll.patchById = function (req, id, poll, result) {
    sql.query("UPDATE poll SET ? WHERE id= ?", [poll, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Poll.remove = function (req, id, result) {
    sql.query("DELETE FROM poll Where id=?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};


// Poll.getById = function (req, id, offset, pageSize, result) {
//     sql.query("SELECT  fff.name as id_Value, t.* FROM poll t  join category fff on t.category_id = fff.id  WHERE t.id= ? LIMIT ?,?", [id, offset, pageSize], function (err, res) {
//         if (err) {
//             console.log('error: ', err);
//             result(null, err);
//         } else {
//             console.log('poll : ', res);
//             result(null, res);
//         }
//     });
// };



Poll.totalByIdCount = function (req, id, result) {
    sql.query("SELECT count(*) TotalCount FROM poll t  join category fff on t.category_id = fff.id  WHERE t.id= ?", [id], function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Poll;
