var express = require('express');
var router = express.Router();
var mysql = require("../mysql")

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/remUser', function (req, res, next) {


    var reqEmailId = req.body.emailid;


    var remDepartment = "Delete FROM User WHERE EmailId='"+reqEmailId+"'";

    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            console.log('Valid Remove');
            res.status(201).json({message: "User Removed successfully"});
        }
    },remDepartment);
});

module.exports = router;