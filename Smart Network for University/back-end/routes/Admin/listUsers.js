var express = require('express');
var router = express.Router();
var mysql = require("./mysql");

router.post('/listUsers', function (req, res, next) {
    

    var getUser = "SELECT * FROM user" ;
    console.log("query is :" +getUser);

    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            if(result.length>0){
                console.log('Valid Login');
                res.status(201).json({message: "Login Succcessful"});
            }
            else
            {
                console.log("Invalid Login");
                res.status(401).json({message: "Login failed"})
            }
        }
    },getUser);
});

module.exports = router;