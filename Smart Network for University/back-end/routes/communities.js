var express = require('express');
var router = express.Router();
var mysql = require("./mysql")

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/getCommunities', function (req, res, next) {

    var reqUserId = req.body.userId;

    var getCommunity = "SELECT departmentid FROM user_dep_mapping WHERE userid = '"+reqUserId+"'";
    console.log("query is :" +getCommunity);

    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            if(result.length>0){
                res.status(201).json({result});
            }
            else
            {
                res.status(401).json({message: "Error"});
            }
        }
    },getCommunity);
});

module.exports = router;