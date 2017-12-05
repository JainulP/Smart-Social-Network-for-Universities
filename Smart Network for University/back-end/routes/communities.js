var express = require('express');
var router = express.Router();
var mysql = require("./mysql")

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/getCommunities', function (req, res, next) {

    var reqUserId = req.body.userId;
    var departments =[];
    var departmentsID ='';
console.log("USER ID"+ reqUserId);
    var getCommunity = "SELECT departmentid FROM user_dep_mapping WHERE userid = "+reqUserId+"";

    console.log("getCommunity" +getCommunity);

    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            if(result.length>0){

                console.log("HERE");
                for(var i =0;i <result.length;i++)
                {
                    if(i == result.length -1)
                    {
                        departmentsID+= result[i].departmentid;

                    }
                    else {
                        departmentsID += result[i].departmentid + ",";
                    }
                }

                var getCommunityNames1 = "SELECT departmentid,dep_name FROM department WHERE departmentid IN("+departmentsID+")";
                console.log("getCommunityNames1", getCommunityNames1);
                mysql.fetchData(function(err, result1){
                    if(err){
                        throw err;
                    }
                    else{
                        if(result1.length>0){
                            for(var j=0; j <result1.length ; j++) {
                                 departments.push(result1[j]);

                                }
                            res.status(201).json({departments});
                        }
                        else
                        {
                            res.status(401).json({message: "Error"});
                        }
                    }
                },getCommunityNames1);


            }
            else
            {
                res.status(401).json({message: "Error"});
            }
        }
    },getCommunity);
});

router.post('/getAllCommunities', function (req, res, next) {
    
        var reqUserId = req.body.userId;
    
        var getCommunity = "SELECT * FROM department";
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


router.post('/getUserCommunity', function (req, res, next) {

    var reqUserId = req.body.userId;
    var departments =[];
    var departmentsID ='';
    console.log("USER ID"+ reqUserId);
    var getUserCommunity = "SELECT user.departmentid,dep_name FROM department JOIN user on user.departmentid =department.departmentid WHERE user.userid = "+reqUserId+"";

    console.log("getUserCommunity" +getUserCommunity);

    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            if(result.length>0)
            {
                console.log(result)
                departments.push(result[0]);
                res.status(201).json({departments});
            }
            else
            {
                res.status(401).json({message: "Error"});
            }
        }
    },getUserCommunity);
});

module.exports = router;