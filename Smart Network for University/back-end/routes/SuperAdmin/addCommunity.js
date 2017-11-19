var express = require('express');
var router = express.Router();
var mysql = require("../mysql")

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/addCom', function (req, res, next) {


    var reqDepartmentName = req.body.dep_name;
    var reqDepartmentAdmin = req.body.dep_admin;


    var addDepartment = "INSERT INTO Department(Dep_Name, Dep_Admin) Values ('"+reqDepartmentName+"','"+reqDepartmentAdmin+"')";

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