
var express = require('express');
var router = express.Router();
var mysql = require("./mysql");
var fileLocation = "";

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/getFiles', function (req, res, next) {


	 var reqUserId = req.body.userId;


	var getUser='';



	getUser = "SELECT * FROM files WHERE uploadedby = '"+reqUserId+"' AND deleteflag = 0";

	console.log("query is :" +getUser);
	
	mysql.fetchData(function(err, result){
		if(err){
			throw err;
		}
		else{
			// if(result.length>0){
				console.log('Valid files');
            console.log({result});
				res.status(201).json({ result});
				
			// }
			// else
			{
				// console.log("Invalid Login");
				// res.status(401).json({message: "Login failed"});
			}
		}
	},getUser);
});


router.post('/downloadFile', function (req, res, next) {
	
		var reqFileId = req.body.fileid;
		var reqFileName = req.body.filename;
		var reqFilePath = req.body.path;

		console.log(reqFilePath);
		console.log(reqFileName);

		fileLocation = reqFilePath;
		res.download(fileLocation);
	});

router.get('/downloadFile', function (req, res, next) {
		res.download(fileLocation);
	});

router.post('/getSharedFiles', function (req, res, next) {
    	//var reqUserId = 3;
		var reqUserId = req.body.userId;
		var getShared='';
		var getDepartments = '';
    var filelist = [];

    getDepartments = "SELECT departmentid FROM user_dep_mapping WHERE userid = '"+reqUserId+"'";
    getShared = "SELECT * FROM files WHERE departments IS NOT NULL AND uploadedby != "+ reqUserId +" AND deleteflag = 0 ";

    console.log("getDepartments",getDepartments);
    console.log("getShared",getShared);
    mysql.fetchData(function(err, result1){
            if(err){
                throw err;
            }
            else{

                    mysql.fetchData(function(err, result){
                        if(err){
                            throw err;
                        }
                        else{
                        	if(result1.length>0) {

                                console.log('Valid shared files');
                                for(var j=0; j <result1.length ; j++) {
                                    var deptId = result1[j].departmentid;

                                    var departments;
                                    for (var i = 0; i < result.length; i++) {
                                        departments = result[i].departments;

                                        var arrDepartments = departments.split(",");

                                       //  console.log("arrDepartments" + JSON.stringify(arrDepartments));
                                        // console.log("position"  +commId+ " is " + arrMembers.indexOf(commId.toString()));
                                        if (arrDepartments.indexOf(deptId.toString()) >= 0  && result[i].userid != reqUserId) {
                                            filelist.push(result[i])
                                        }
                                    }

                                }
                                res.status(201).json({filelist});

                            }

                        }
                    },getShared);
                }
        },getDepartments);
	});

router.post('/setSharing', function (req, res, next) {
	var fileitem = req.body.file;
	var fileId = fileitem.fileid;
	var departments= req.body.departments;
	console.log(departments);

	// getShared = "SELECT * FROM Directory WHERE UserId = '"+reqUserId+"'";
	var getFile = "SELECT * FROM files WHERE fileid = "+fileId+" AND deleteflag = 0";
	
	console.log("query is :" +getFile);
	
	mysql.fetchData(function(err, result){
		if(err){
			throw err;
		}
		else{
			console.log('Valid Login');
			
			var currentDepartments = result[0].departments;
			var newDepartments = currentDepartments + departments +",";
			var updateSharing = "UPDATE files SET departments = '"+newDepartments+"' WHERE fileid = "+fileId+"";
			
			console.log("query is :" +updateSharing);
			
			mysql.fetchData(function(err, result){
				if(err){
					throw err;
				}
				else{
					console.log('Valid Login');
					res.status(200);
				}
			},updateSharing);



		}
	},getFile);
});


router.post('/deleteFile', function (req, res, next) {

    var fileId = req.body.fileid;
    //var reqUserId = 1;

    var deleteFile='';


    deleteFile = "UPDATE files SET deleteflag = 1 WHERE  fileid = '"+fileId+"'";

    console.log("query is :" +deleteFile);

    mysql.fetchData(function(err, result){
        if(err){
            throw err;
        }
        else{
            // if(result.length>0){
            console.log('Deleted File');
            console.log({result});
            res.status(200).end();
        }
    },deleteFile);
});
module.exports = router;