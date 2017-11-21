var express = require('express');
var router = express.Router();
var mysql = require("../mysql")


router.post('/addCom', function (req, res, next) {


    var reqDepartmentName = req.body.dep_name;
    // var reqDepartmentAdmin = req.body.dep_admin;


    var addDepartment = "INSERT INTO department(Dep_Name) Values ('"+reqDepartmentName+"')";

    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            console.log('Valid Add');
            res.status(201).json({message: "Department Added successfully"});
        }
    },addDepartment);
});

module.exports = router;