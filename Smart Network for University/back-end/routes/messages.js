var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();
var mysql = require("./mysql");
var Consumer = require('sqs-consumer');


router.post('/sendMessages', function (req, res, next) {
    console.log(req.body);
    var msg = req.body.msg;
    var fromUser = req.body.fromUser;
    var toUser = req.body.toUser;


    AWS.config.loadFromPath('./config.json');
    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    var params = {
      DelaySeconds: 10,
      MessageAttributes: {
        "from": {
          DataType: "Number",
          byte:fromUser 
        },
        "to": {
        DataType: "Number",
        //use the current user name from local storage
        byte: toUser 
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
      }
    });
});

router.post('/getMessages', function (req, res, next) {
    
    var fromUser = req.body.userList.fromUser;
    var toUser = req.body.userList.toUser;

    var getUser = "SELECT * FROM messages WHERE " +
                    "userid1 = '" +toUser+ "' AND userid2 = '" +fromUser+ "' OR " + 
                    "userid1 = '" +fromUser+ "' AND userid2 = '" +toUser+ " '" ;

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
                    "userid = '" +fromUser+" '" ;

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
    
    var fromUser = req.body.details.fromUser;
    var toUser = req.body.details.toUser;
    var msg = req.body.details.msg;

    var getUser = "SELECT * FROM messages WHERE " +
                    "userid1 = '" +toUser+ "' AND userid2 = '" +fromUser+ "' OR " + 
                    "userid1 = '" +fromUser+ "' AND userid2 = '" +toUser+ " '" ;

    console.log(getUser);
    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
          if(result){
            var res = json({result}).json();
            var getUser = "INSERT INTO dbssn.messages " + 
              "(userid1, userid2, firstname1, firstname2, msg, date) " + 
              "values('" +res.fromUser+ "', 'toUser', 'Anudeepa', 'Supraja', 'Hi','18-07-12 10:34:09')";
            mysql.fetchData(function(err, result){
            if(err){
                throw err;
            }
            else{
                if(result){
                    res.status(201).json({result});
                  }
                  else{
                      console.log("Invalid query");
                      res.status(401).json({message: "Fetching failed"})
                  }
                }
              },getUser);
            }
            else
            {
                console.log("Invalid query");
                res.status(401).json({message: "Fetching failed"})
            }
        }
    },getUser);
});


router.post('/receiveMessages', function (req, res, next) {
    AWS.config.loadFromPath('./config.json');
    var result = null;
    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    var queueURL = "https://sqs.us-west-2.amazonaws.com/915415951091/anudeepa";
    var app = Consumer.create({
                queueUrl: queueURL,
                region: 'us-west-2',
                batchSize: 10,
                handleMessage: function (message, done) {
                  console.log(message);
                  res.status(200).json({message});
                  return done();
                  }
                });
                app.on('error', function (err) {
                  console.log(err);
                });
                app.start();
    //  AttributeNames: [
    //     "SentTimestamp"
    //  ],
    //  MessageAttributeNames: [
    //     "to",
    //     "from"
    //  ],
    //  QueueUrl: queueURL,
    //  VisibilityTimeout: 0,
    //  WaitTimeSeconds: 10
    // };

    // sqs.receiveMessage(params, function(err, data) {
    //   if (err) {
    //     console.log("Receive Error", err);
    //   } else {
    //     console.log("this is in receive")
    //     console.log(data.Messages);
    //     result = data.Messages
    //     res.status(200).json({result});
    //  }
    // });
});



module.exports = router;
