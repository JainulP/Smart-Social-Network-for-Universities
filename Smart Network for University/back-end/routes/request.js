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

module.exports = router;