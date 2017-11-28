var express = require('express');
var router = express.Router();
var mysql = require("../mysql")

router.post('/addUser', function (req, res, next) {

    var reqFirstname = req.body.firstname;
    var reqLastname = req.body.lastname;
    var reqEmail = req.body.emailid;
    var reqPassword = req.body.password;
    //var reqDepartment = req.body.departmentid;

    var addUser = "INSERT INTO user(firstname, lastname, emailid, password, departmentid, type) Values ('"+reqFirstname+"','"+reqLastname+"','"+reqEmail+"','"+reqPassword+"',8,0)";

    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{

            var userDepMap="INSERT INTO user_dep_mapping(userid,departmentid) Values('"+result.insertId+"',8)";
            mysql.fetchData(function(err, result){
                if(err){
                    throw err;
                }
                else{
                    console.log('Valid Add');
                    res.status(201).json({message: "Addition successful"});
                }
            },userDepMap);
            console.log('Valid Add');
           // res.status(201).json({message: "Addition successful"});
        }
    },addUser);



});

module.exports = router;