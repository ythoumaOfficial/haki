var parseurl = require('parseurl');
var md5 = require('md5');
var SECRET_KEY = "Paglaho";
var crypto = require('crypto'),
  algorithm = 'aes192';
var fs = require('fs');
var uuid = require('uuid');
var cors = require('cors');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var http = require('http');
var https = require('https');
const jwt = require('jsonwebtoken');
var fileUpload = require('express-fileupload');
var helper = require('./app/models/helper');
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

const ejs = require('ejs');

port = process.env.PORT || 8400;
portssl = 8444;
app.use(cors());
app.use(fileUpload());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  next();
});

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
  host: 'haki.cxd7ybnaxl1r.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'root',
  password: 'makaremat357',
  database: 'haki'

});

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// connect to database
mc.connect();
//uncomment options for ssl
//var options = {
//    key: fs.readFileSync('/domain.com.key'),
//    cert: fs.readFileSync('/certificate.crt')
//};
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', false);
  res.header('Access-Control-Max-Age', '86400');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, x_chord, y_chord, z_chord, d_chord');
  next();
};

var encrypt = function (text) {
  var cipher = crypto.createCipheriv(algorithm, SECRET_KEY);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

var decrypt = function (text) {
  var decipher = crypto.createDecipheriv(algorithm, SECRET_KEY);
  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

const jwtKey = 'my_secret_key';
const jwtExpirySeconds = "10h";

const users = {
  user1: 'password1',
  user2: 'password2'
}

const tokenGen = (req, res) => {
  try {
    // Get credentials from JSON body
    const { username, password } = req.body
    if (!username || !password || users[username] !== password) {
      // return 401 error is username or password doesn't exist, or if password does
      // not match the password in our records
      return res.status(401).end()
    }

    // Create a new token with the username in the payload
    // and which expires 1 day after issue
    //jwtExpirySeconds ="20d" // it will be expired after 20 days
    //jwtExpirySeconds= 120 // it will be expired after 120ms
    const token = jwt.sign({ username }, jwtKey, {
      algorithm: 'HS256',
      expiresIn: jwtExpirySeconds
    })
    console.log('token:', token)
    var response = { "expires_in": jwtExpirySeconds, "access_token": token, "token_type": "bearer" };
    res.status(200).send(helper.createResponse(helper.Success, 1, "Token Generated", response));
  } catch (error) {
    return res.status(500).send(helper.createResponse(helper.Error, 0, error.message));
  }
}
const imageUploadFun = (req, res) => {
  try {
    helper.checkPermission(req, "a", function (isPermited) {
      if (isPermited) {
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send('No files were uploaded.');
        }

        // The name of the input field (i.e. "image") is used to retrieve the uploaded file
        let uploadedFile = req.files.image;
        if (uploadedFile && !uploadedFile.name && uploadedFile.name.match(/\.(jpg|jpeg|png)$/i)) {
          return res.status(400).send(helper.createResponse(helper.Error, 0, "Invalid file format"));
        }
        let newFileName = uuid.v1() + path.extname(uploadedFile.name);
        let uploadPath = "./upload/" + newFileName;
        // Use the mv() method to place the file somewhere on your server
        uploadedFile.mv(uploadPath, function (err) {
          if (err)
            return res.status(200).send(helper.createResponse(helper.Error, 0, "Failed to upload file", err));

          return res.status(200).send(helper.createResponse(helper.Success, 1, "File uploaded", newFileName));
        });
      } else {
        res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
      }
    });
  } catch (error) {
    return res.status(500).send(helper.createResponse(helper.Error, 0, error.message));
  }
}
const fileUploadFun = (req, res) => {
  try {
    helper.checkPermission(req, "a", function (isPermited) {
      if (isPermited) {
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send('No files were uploaded.');
        }

        // The name of the input field (i.e. "file") is used to retrieve the uploaded file
        let uploadedFile = req.files.file;
        if (uploadedFile && !uploadedFile.name && uploadedFile.name.match(/\.(pdf|docx|xlsx)$/i)) {
          return res.status(400).send(helper.createResponse(helper.Error, 0, "Invalid file format"));
        }
        let newFileName = uuid.v1() + path.extname(uploadedFile.name);
        let uploadPath = "./upload/" + newFileName;
        // Use the mv() method to place the file somewhere on your server
        uploadedFile.mv(uploadPath, function (err) {
          if (err)
            return res.status(200).send(helper.createResponse(helper.Error, 0, "Failed to upload file", err));

          return res.status(200).send(helper.createResponse(helper.Success, 1, "File uploaded", newFileName));
        });
      } else {
        res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
      }
    });
  } catch (error) {
    return res.status(500).send(helper.createResponse(helper.Error, 0, error.message));
  }
}

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);

http.createServer(app).listen(port);
// Create an HTTPS service identical to the HTTP service.
//https.createServer(options, app).listen(portssl);
//app.listen(port);

console.log('API server started on: ' + port);
const prefixUrl = "/api";
app.post(prefixUrl + '/token', tokenGen);
app.post(prefixUrl + '/upload/image', imageUploadFun);
app.post(prefixUrl + '/upload/file', fileUploadFun);

var Poll_voting_historyRoutes = require('./app/routes/Poll_voting_historyRoute');
var categoryRoutes = require('./app/routes/categoryRoute');
var pollRoutes = require('./app/routes/pollRoute');
var poll_questionRoutes = require('./app/routes/poll_questionRoute');
var poll_question_optionRoutes = require('./app/routes/poll_question_optionRoute');
var settingsRoutes = require('./app/routes/settingsRoute');
var usersRoutes = require('./app/routes/usersRoute');

Poll_voting_historyRoutes(prefixUrl, app)
categoryRoutes(prefixUrl, app)
pollRoutes(prefixUrl, app)
poll_questionRoutes(prefixUrl, app)
poll_question_optionRoutes(prefixUrl, app)
settingsRoutes(prefixUrl, app)
usersRoutes(prefixUrl, app)

