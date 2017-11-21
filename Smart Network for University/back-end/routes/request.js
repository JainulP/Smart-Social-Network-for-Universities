var express = require('express');
var router = express.Router();
var mysql = require("./mysql");

router.post('/getRequest', function (req, res, next) {

	var reqUserId = req.body.userId;
	var getRequest = "SELECT * FROM requests WHERE createdby = '"+reqUserId+"' AND deleteflag=0";
	console.log("query is :" +getRequest);
	
	mysql.fetchData(function(err, result){
		if(err){
			throw err;
		}
		else{
			if(result.length>0){
				console.log('Requests fethced');
				res.status(200).json({result});
				
			}
			else
			{
				console.log("No requests");
				res.status(400).json({message: "No requests"});
			}
		}
	},getRequest);
});

router.post('/createRequest', function (req, res, next) {
	
		var reqsubject = req.body.subject;
		var reqdescription = req.body.description;
		var reqassignedTo = req.body.assignedTo;
		var reqdepartment = req.body.department;
		var generatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
		var reqcreatedby = "t@gmail.com";

		var createRequest = "INSERT INTO requests(description, assignedto, subject, createdby, departmentid, generated_date, resolved_date) Values ('"+reqdescription+"','"+reqassignedTo+"','"+reqsubject+"','"+reqcreatedby+"','"+reqdepartment+"', '"+generatedDate+"', '"+generatedDate+"')";
		console.log("query is :" +createRequest);
		
		mysql.fetchData(function(err, result){
			if(err){
				throw err;
			}
			else{
				if(err){
					throw err;
				}
				else{
					console.log('Request Created');
					res.status(200).json({message: "Request creation successful"});
				}
			}
		},createRequest);
	});

	router.post('/getAssignedToMe', function (req, res, next) {
		
			var reqUserId = req.body.userId;
			var reqUserEmail = "t@gmail.com";
			var getRequest = "SELECT * FROM requests WHERE assignedto = '"+reqUserEmail+"' AND deleteflag=0 AND status != 'resolved'";
			console.log("query is :" +getRequest);
			
			mysql.fetchData(function(err, result){
				if(err){
					throw err;
				}
				else{
					if(result.length>0){
						console.log('Requests fethced');
						res.status(200).json({result});
						
					}
					else
					{
						console.log("No requests");
						res.status(400).json({message: "No requests"});
					}
				}
			},getRequest);
		});

module.exports = router;