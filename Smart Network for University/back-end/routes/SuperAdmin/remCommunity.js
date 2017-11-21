var express = require('express');
var router = express.Router();
var mysql = require("../mysql")


router.post('/remCom', function (req, res, next) {


    var reqDepartmentId = req.body.dep.departmentid;
    console.log("#$#$#$#$#$#$#$#$#$#"+reqDepartmentId);


    var remDepartment = "Delete FROM department WHERE departmentid='"+reqDepartmentId+"'";

    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            console.log('Valid Remove');
            res.status(201).json({message: "Department Removed successfully"});
        }
    },remDepartment);
});

module.exports = router;