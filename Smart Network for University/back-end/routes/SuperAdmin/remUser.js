var express = require('express');
var router = express.Router();
var mysql = require("../mysql")

router.post('/removeUser', function (req, res, next) {


    var reqUserId = req.body.member.userid;


    var remUser = "UPDATE user SET deleteflag = 1 WHERE userid='"+reqUserId+"'";

    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            console.log('Valid Remove');
            res.status(201).json({message: "User Removed successfully"});
        }
    },remUser);
});

module.exports = router;