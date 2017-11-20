var express = require('express');
var router = express.Router();
var mysql = require("../mysql")

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/removeAdmin', function (req, res, next) {


    var reqDepartmentName = req.body.dep_name;
    var reqDepartmentAdmin = req.body.dep_admin;


    var remDepartment = "Delete FROM Department WHERE Dep_Name='"+reqDepartmentName+"'  and Dep_Admin='"+reqDepartmentAdmin+"'" ;

    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            console.log('Valid Remove');
            res.status(201).json({message: "Admin Removed successfully"});
        }
    },remDepartment);
});

module.exports = router;