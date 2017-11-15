var express = require('express');
var router = express.Router();
var mysql = require("./mysql");

router.post('/doLogin', function (req, res, next) {

	var reqUsername = req.body.EmailId;
    var reqPassword = req.body.Password;

    var getUser = "SELECT * FROM user WHERE emailid = '"+reqUsername+"' and password = '"+reqPassword+"'";
	console.log("query is :" +getUser);
	
	mysql.fetchData(function(err, result){
		if(err){
			throw err;
		}
		else{
			if(result.length>0){
				console.log('Valid Login');
				res.status(201).json({message: "Login Succcessful"});
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