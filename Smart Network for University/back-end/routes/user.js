var express = require('express');
var router = express.Router();
var mysql = require("./mysql");

router.post('/getUser', function (req, res, next) {

	var reqUsername = req.body.emailId;

    var getUser = "SELECT * FROM user WHERE emailid = '"+reqUsername+"'";
	console.log("query is :" +getUser);
	
	mysql.fetchData(function(err, result){
		if(err){
			throw err;
		}
		else{
			if(result.length>0){
				console.log('User fetched');
				res.status(201).json({
                    userid: result[0].userid,
                    firstname: result[0].firstname,
                    lastname: result[0].lastname,
                    emailid: result[0].emailid,
                    password: result[0].password,
                    departmentid: result[0].departmentid,
                    type: result[0].type,
                    deleteflag: result[0].deleteflag,
                });
			}
			else
			{
				console.log("Invalid User");
				res.status(401).json({message: "User fetch failed"});
			}
		}
	},getUser);
});

router.post('/updateUser', function (req, res, next) {
	
		var reqUserEmail = req.body.EmailId;
		var reqUserFname = req.body.FirstName;
		var reqUserLname = req.body.LastName;
		var reqUserWork = req.body.Work;
		var reqUserEducation = req.body.Education;
		var reqUserContact = req.body.Contact;
		var reqUserInterests = req.body.Interests;

	
		var updateUser = "UPDATE Users SET FirstName='"+reqUserFname+"', LastName='"+reqUserLname+"', Work='"+reqUserWork+"', Education='"+reqUserEducation+"', Contact='"+reqUserContact+"', Interests='"+reqUserInterests+"' WHERE EmailId = '"+reqUserEmail+"'";
		console.log("query is :" +updateUser);
		
		mysql.fetchData(function(err, result){
			if(err){
				throw err;
			}
			else{
				console.log('Valid Login');
				res.status(200).json({ Message : "User Updated"});
			}
		},updateUser);
    });
    
router.post('/getMembers', function (req, res, next) {
        var reqDepId = req.body.departmentid;
    
        var getUser = "SELECT * FROM user WHERE departmentid = '"+reqDepId+"' and deleteflag=0 and type!=2";
        console.log("query is :" +getUser);
        
        mysql.fetchData(function(err, result){
            if(err){
                throw err;
            }
            else{
                if(result.length>0){
                    console.log('Members fetched');
                    res.status(201).json({result});
                }
                else
                {
                    console.log("Invalid User");
                    res.status(401).json({message: "Member fetch failed"});
                }
            }
        },getUser);
    });


router.post('/getAdmin', function (req, res, next) {

    var getUser = "SELECT * FROM user WHERE deleteflag=0 and type=1";
    console.log("query is :" +getUser);

    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            if(result.length>0){
                console.log('Members fetched');
                res.status(201).json({result});
            }
            else
            {
                console.log("Invalid User");
                res.status(401).json({message: "Member fetch failed"});
            }
        }
    },getUser);
});


router.post('/getUsersList', function (req, res, next) {
    var reqUsername = req.body.userid;
    var getUser = "SELECT * FROM user WHERE userid != '"+reqUsername+"' ";
    console.log("query is :" +getUser);
    
    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            if(result.length>0){
                console.log('Valid Login');
                res.status(201).json({result});
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