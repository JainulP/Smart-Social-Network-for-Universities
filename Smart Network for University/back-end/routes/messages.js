var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();
var mysql = require("./mysql");
var Consumer = require('sqs-consumer');


router.post('/sendMessages', function (req, res, next) {
    console.log(req.body);
    var msg = req.body.msg;
    var fromUser = req.body.fromUser.toString();
    var toUser = req.body.toUser.toString();


    AWS.config.loadFromPath('./config.json');
    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    var params = {
      DelaySeconds: 10,
      MessageAttributes: {
        "from": {
          DataType: "String",
          StringValue:fromUser 
        },
        "to": {
        DataType: "String",
        //use the current user name from local storage
        StringValue: toUser 
        },
     },
     MessageBody: msg,
     QueueUrl: "https://sqs.us-west-2.amazonaws.com/915415951091/anudeepa"

    };

    sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.MessageId);
        res.status(401).json({message:data.MessageId})
      }
    });
});

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


    var getUser = "SELECT * FROM groups WHERE " +
                    "firstname1 = '" +fromUser+ "' AND dep_name = '" +toUser+ "'";

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



router.post('/writeMessages', function (req, res, next) {
    var data = req.body;
    var fromUser = req.body.fromUser;
    var toUser = req.body.toUser;
    var msg = req.body.msg;
    var time = Date.now();

    var getUser = "INSERT INTO groups " + 
         "(from, dep_name, msg, date) " + 
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



router.post('/receiveMessages', function (req, res, next) {
    AWS.config.loadFromPath('./config.json');
    var messageId = req.message;
    var result = null;
    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    var queueURL = "https://sqs.us-west-2.amazonaws.com/915415951091/anudeepa";
    var app = Consumer.create({
                queueUrl: queueURL,
                region: 'us-west-2',
                batchSize: 10,
                handleMessage: function (message, done) {
                  if(messageId == MessageId){
                    console.log(message);
                    res.status(200).json({message});
                   }
                  }
                });
                app.on('error', function (err) {
                  console.log(err);
                });
                app.start();
    var params = {
     AttributeNames: [
        "SentTimestamp"
     ],
     MessageAttributeNames: [
        "to",
        "from"
     ],
     QueueUrl: queueURL,
     VisibilityTimeout: 0,
     WaitTimeSeconds: 1
    };

    sqs.receiveMessage(params, function(err, data) {
      if (err) {
        console.log("Receive Error", err);
      } else {
        console.log("this is in receive")
        console.log(data.Messages);
        result = data.Messages
        res.status(200).json({result});
     }
    });
});



module.exports = router;
