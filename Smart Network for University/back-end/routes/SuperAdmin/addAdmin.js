var express = require('express');
var router = express.Router();
var mysql = require("../mysql")

router.post('/addAdmin', function (req, res, next) {

    var reqFirstname = req.body.firstname;
    var reqLastname = req.body.lastname;
    var reqEmail = req.body.emailid;
    var reqPassword = req.body.password;
    var reqDepartment = req.body.departmentid;

    var addAdmin =  "INSERT INTO user(firstname, lastname, emailid, password, departmentid, type) Values ('"+reqFirstname+"','"+reqLastname+"','"+reqEmail+"','"+reqPassword+"','"+reqDepartment +"',1)";

    /*var addUser = "Update user SET type=1 WHERE emailid='"+reqEmail+"' and departmentid='"+reqDepartment+"'"*/
    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            console.log('Valid Add');
            res.status(201).json({message: "Addition successful"});
        }
    },addAdmin);



});

module.exports = router;