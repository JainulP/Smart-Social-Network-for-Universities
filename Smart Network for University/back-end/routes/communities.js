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

    var getCommunity = "SELECT departmentid FROM user_dep_mapping WHERE userid = '"+reqUserId+"'";

    console.log("query is :" +getCommunity);

    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            if(result.length>0){
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

module.exports = router;