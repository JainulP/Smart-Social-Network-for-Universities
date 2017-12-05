var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();
var mysql = require("./mysql");



router.post('/getMessages', function (req, res, next) {
    
    var fromUser = req.body.userList.fromUser;
    var toUser = req.body.userList.toUser;


    var getUser = "SELECT * FROM messages WHERE " +
                    "firstname1 = '" +toUser+ "' AND firstname2 = '" +fromUser+ "' OR " + 
                    "firstname1 = '" +fromUser+ "' AND firstname2 = '" +toUser+ "'" ;

    console.log(getUser);
    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            if(result){
              res.status(201).json({result});
            }
            else
            {
                console.log("Invalid query");
                res.status(401).json({message: "Fetching failed"})
            }
        }
    },getUser);
});



router.post('/getGroupMessages', function (req, res, next) {
    
    var fromUser = req.body.userList.fromUser;
    var toUser = req.body.userList.toUser;


    var getUser = "SELECT * FROM groups WHERE dep_name = '" +toUser+ "'";

    console.log(getUser);
    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            if(result){
              res.status(201).json({result});
            }
            else
            {
                console.log("Invalid query");
                res.status(401).json({message: "Fetching failed"})
            }
        }
    },getUser);
});

router.post('/getUser', function (req, res, next) {
    
    var fromUser = req.body.details.fromUser;
    var toUser = req.body.details.toUser;

    var getUser = "SELECT * FROM user WHERE " +
                    "userid = '" +toUser+ "' OR" 
                    "userid = '" +fromUser+"'" ;

    console.log("getUser")
    console.log(getUser);
    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            if(result){
              res.status(201).json({result});
            }
            else
            {
                console.log("Invalid query");
                res.status(401).json({message: "Fetching failed"})
            }
        }
    },getUser);
});



router.post('/writeMessages', function (req, res, next) {
    var data = req.body;
    var fromUser = req.body.fromUser;
    var toUser = req.body.toUser;
    var msg = req.body.msg;
    var time = Date.now();

    var getUser = "INSERT INTO messages " + 
         "(firstname1, firstname2, msg, date) " + 
              "values('"+fromUser+"'," +
              "'"+ toUser+"', " +
              "'"+ msg +"', " +
              "'"+ time +"')";
    mysql.fetchData(function(err, result){
    if(err){
        throw err;
    }
    else{
        if(result){
          console.log("Result is")
          console.log(result)
           res.status(201).json({data});

          }
          else{
              console.log("Invalid query");
              res.status(401).json({message: "Fetching failed"})
          
        }
      }
      },getUser);
});



router.post('/writeGroupMessages', function (req, res, next) {
    var data = req.body;
    var fromUser = req.body.fromUser;
    var toUser = req.body.toUser;
    var msg = req.body.msg;
    var time = Date.now();

    var getUser = "INSERT INTO groups " + 
         "(from, dep_name, msg, date) " + 
              "values('"+fromUser+"'," +
              "'"+ toUser+"', " +
              "values("+ toUser+"', " +
              "'"+ msg +"', " +
              "'"+ time +"')";
              
    mysql.fetchData(function(err, result){
    if(err){
        throw err;
    }
    else{
        if(result){
          console.log("Result is")
          console.log(result)
           res.status(201).json({data});

          }
          else{
              console.log("Invalid query");
              res.status(401).json({message: "Fetching failed"})
          
        }
      }
      },getUser);
});



module.exports = router;
