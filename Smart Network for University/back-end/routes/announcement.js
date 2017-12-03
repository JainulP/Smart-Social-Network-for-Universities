var express = require('express');
var router = express.Router();
var mysql = require("./mysql");

router.post('/getAnnouncement', function (req, res, next) {

	var reqdepartmentid = req.body.departmentId;
	var getRequest = "SELECT * FROM announcements JOIN user ON announcements.userid = user.userid WHERE announcements.departmentid = '"+reqdepartmentid+"'";
	console.log("query is :" +getRequest);
	
	mysql.fetchData(function(err, result){
		if(err){
			throw err;
		}
		else{
			if(result.length>0){
				console.log('announcements fethced');
				res.status(200).json({result});
				
			}
			else
			{
				console.log("No announcements");
				res.status(400).json({message: "No announcements"});
			}
		}
	},getRequest);
});

router.post('/createAnnouncement', function (req, res, next) {
	
		var reqdescription = req.body.payload.description;
        var requserid = req.body.userId;
        var reqdepartmentid = req.body.departmentId;

		var createRequest = "INSERT INTO announcements(description, departmentid, userid) Values ('"+reqdescription+"','"+reqdepartmentid+"','"+requserid+"')";
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
					console.log('Announcement Created');
					res.status(200).json({message: "Announcement creation successful"});
				}
			}
		},createRequest);
	});

module.exports = router;