var express = require('express');
var router = express.Router();
var mysql = require("../mysql")

router.post('/addUser', function (req, res, next) {

    var reqFirstname = req.body.firstname;
    var reqLastname = req.body.lastname;
    var reqEmail = req.body.emailid;
    var reqPassword = req.body.password;
    var reqDepartment = req.body.departmentid;

    var addUser = "INSERT INTO user(firstname, lastname, emailid, password, departmentid, type) Values ('"+reqFirstname+"','"+reqLastname+"','"+reqEmail+"','"+reqPassword+"',1,0)";

    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            /*var newid="SELECT MAX(userid) FROM user";*/
            var userDepMap="INSERT INTO user_dep_mapping(userid,departmentid) Values('"+result.insertId+"',1)";
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


router.post('/addExistingUser', function (req, res, next) {

    var studentId =  req.body.studentid;
    var reqDepartment = req.body.departmentid;

    var checkUser = "Select userid from user where userid = '"+ studentId + "' and type = 0 and deleteflag =0";
    console.log("checkUser",checkUser);
    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            if(result.length>0)
            {
                var userDepMap="INSERT INTO user_dep_mapping(userid,departmentid) Values('"+studentId+"',2)";
                mysql.fetchData(function(err, result){
                    if(err){
                        throw err;
                    }
                    else{

                        console.log('Valid Add');
                        res.status(201).json({message: "mapping successful"});
                    }
                },userDepMap);
            }
            else
            {
                res.status(401).json({message: "Invalid student id"});
            }


        }
    },checkUser);





});

module.exports = router;