var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();
var mysql = require("./mysql");


router.post('/sendMessages', function (req, res, next) {
    var msg = req.body.message;
    AWS.config.loadFromPath('./config.json');
    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    var params = {
      DelaySeconds: 10,
      MessageAttributes: {
        "from": {
          DataType: "String",
          StringValue: "The Whistler"
        },
        "to": {
        DataType: "String",
        //use the current user name from local storage
        StringValue: "John Grisham" 
        },
     },
     MessageBody: msg,
     QueueUrl: "https://sqs.us-east-1.amazonaws.com/652264208281/MyFirstQueue"
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

    var getUser = "SELECT * FROM message WHERE " +
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


router.post('/receiveMessages', function (req, res, next) {
    AWS.config.loadFromPath('./config.json');
    var result = null;
    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    var queueURL = "https://sqs.us-east-1.amazonaws.com/652264208281/MyFirstQueue";
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
     WaitTimeSeconds: 10
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
