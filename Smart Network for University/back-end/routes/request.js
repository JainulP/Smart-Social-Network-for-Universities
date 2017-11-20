var express = require('express');
var router = express.Router();
var mysql = require("./mysql");

router.post('/getRequests', function (req, res, next) {

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
		var reqcreatedby = 1;

		var createRequest = "INSERT INTO requests(description, assignedto, createdby, departmentid, generated_date, resolved_date) Values ('"+reqdescription+"','"+reqassignedTo+"','"+reqcreatedby+"','"+reqdepartment+"', '"+generatedDate+"', '"+generatedDate+"')";
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

module.exports = router;