var express = require('express');
var router = express.Router();
var mysql = require("./mysql");
var fileLocation = "";

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/getFiles', function (req, res, next) {

	//console.log(req);
	 var reqUserId = 1;
	//var reqUserId = req.body.userId;

	var getUser='';

	//console.log(parentId);

	getUser = "SELECT * FROM files WHERE uploadedby = '"+reqUserId+"'";

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

		console.log("---------------------");
		console.log(reqFilePath);
		console.log(reqFileName);

		fileLocation = reqFilePath;
		res.download(fileLocation);
	});

router.get('/downloadFile', function (req, res, next) {
		res.download(fileLocation);
	});

router.post('/getSharedFiles', function (req, res, next) {
    	var reqUserId = 1;
		//var reqUserId = req.body.userId;
		var getShared='';
		var getCommunities = '';
    var filelist = [];

    getCommunities = "SELECT departmentid FROM user_dep_mapping WHERE userid = '"+reqUserId+"'";
    getShared = "SELECT * FROM files WHERE departments IS NOT NULL";
    mysql.fetchData(function(err, result1){
            if(err){
                throw err;
            }
            else{

                console.log("res length "+ result1.length);
                // for(var j=0; j <result1.length ; j++){
                //     var commId = result1[j].CommunityId;
                //     console.log(commId);
                //     qqw.push(commId);
                    mysql.fetchData(function(err, result){
                        if(err){
                            throw err;
                        }
                        else{
                        	if(result1.length>0) {
                                console.log('Valid shared files');
                                for(var j=0; j <result1.length ; j++) {
                                    var deptId = result1[j].departmentid;
                                   // var filelist = [];
                                    var departments;
                                    for (var i = 0; i < result.length; i++) {
                                        departments = result[i].departments;

                                        var arrDepartments = departments.split(",");

                                        // console.log("arrMembers" + JSON.stringify(arrMembers));
                                        // console.log("position"  +commId+ " is " + arrMembers.indexOf(commId.toString()));
                                        if (arrDepartments.indexOf(deptId.toString()) >= 0  && result[i].userid != reqUserId) {
                                            filelist.push(result[i])
                                        }
                                    }
                                    //console.log(result1[j].CommunityId);
                                    console.log("======");
                                    console.log(JSON.stringify(filelist));

                                }
                                res.status(201).json({filelist});

                            }

                        }
                    },getShared);

                    //console.log(result1[j].CommunityId);
                }



        },getCommunities);





   // Select * from directory where members in(SELECT CommunityId FROM usercommunity WHERE UserId = 17)
	    //getCommunities = "SELECT CommunityId FROM usercommunity WHERE UserId = '"+reqUserId+"'";
// 		getShared = "SELECT * FROM Directory WHERE Members IS NOT NULL";
// console.log("get communities "+getCommunities);
//     console.log("get shared "+getShared);
//     mysql.fetchData(function(err, result1){
//         if(err){
//             throw err;
//         }
//         else{
//
// console.log("res length "+ result1.length);
//             for(var j=0; j <result1.length ; j++){
//    var commId = result1[j].CommunityId;
//    console.log(commId);
//    qqw.push(commId);
//                 // mysql.fetchData(function(err, result){
//                 //     if(err){
//                 //         throw err;
//                 //     }
//                 //     else{
//                 //         console.log('Valid shared files');
//                 //         // var filelist = [];
//                 //         var members;
//                 //         for(var i=0; i<result.length; i++){
//                 //             members = result[i].Members;
//                 //
//                 //             var arrMembers = members.split(",");
//                 //
//                 //             console.log("arrMembers"+ JSON.stringify(arrMembers));
//                 //             console.log("position"+ commId+" is "+ arrMembers.indexOf(commId));
//                 //             if(arrMembers.indexOf(commId)>=0){
//                 //                 filelist.push(result[i])
//                 //             }
//                 //         }
//                 //         //console.log(result1[j].CommunityId);
//                 //         console.log("======", filelist);
// 					// 	console.log(filelist);
//                 //
//                 //
//                 //     }
//                 // },getShared);
//                 //console.log(result1[j].CommunityId);
//             }
//
//
//         }
//     },getCommunities);

    // Promise.resolve( mysql.fetchData(function(err, result1){
    //     if(err){
    //         throw err;
    //     }
    //     else{
    //
    //         console.log("res length "+ result1.length);
    //         for(var j=0; j <result1.length ; j++){
    //             var commId = result1[j].CommunityId;
    //             console.log(commId);
    //             qqw.push(commId);
    //             // mysql.fetchData(function(err, result){
    //             //     if(err){
    //             //         throw err;
    //             //     }
    //             //     else{
    //             //         console.log('Valid shared files');
    //             //         // var filelist = [];
    //             //         var members;
    //             //         for(var i=0; i<result.length; i++){
    //             //             members = result[i].Members;
    //             //
    //             //             var arrMembers = members.split(",");
    //             //
    //             //             console.log("arrMembers"+ JSON.stringify(arrMembers));
    //             //             console.log("position"+ commId+" is "+ arrMembers.indexOf(commId));
    //             //             if(arrMembers.indexOf(commId)>=0){
    //             //                 filelist.push(result[i])
    //             //             }
    //             //         }
    //             //         //console.log(result1[j].CommunityId);
    //             //         console.log("======", filelist);
    //             // 	console.log(filelist);
    //             //
    //             //
    //             //     }
    //             // },getShared);
    //             //console.log(result1[j].CommunityId);
    //         }
    //
    //
    //     }
    // },getCommunities))
    //     .then(() =>{
    // 	console.log("promis resolves");
    // 	console.log(result1);
    //         //var userDetail = this.props.userdetail;
    //
    //     });
		// mysql.fetchData(function(err, result){
		// 	if(err){
		// 		throw err;
		// 	}
		// 	else{
		// 		console.log('Valid shared files');
		// 		var filelist = [];
		// 		var members;
		// 		for(var i=0; i<result.length; i++){
		// 			members = result[i].Members;
		// 			var arrMembers = members.split(",");
		// 			if(arrMembers.indexOf(reqUserId)>=0){
		// 				filelist.push(result[i])
		// 			}
		// 		}
		// 		console.log("======", filelist);
		// 		res.status(201).json( {filelist});
		// 	}
		// },getShared);


// if(qqw.length> 0) {
// 	console.log("**************");
//     mysql.fetchData(function (err, result) {
//         if (err) {
//             throw err;
//         }
//         else {
//             console.log('Valid shared files');
//             // var filelist = [];
//             var members;
//             for (var i = 0; i < result.length; i++) {
//                 members = result[i].Members;
//
//                 var arrMembers = members.split(",");
//
//                 console.log("arrMembers" + JSON.stringify(arrMembers));
//                 console.log("position" + commId + " is " + arrMembers.indexOf(commId));
//                 if (arrMembers.indexOf(commId) >= 0) {
//                     filelist.push(result[i])
//                 }
//             }
//             //console.log(result1[j].CommunityId);
//             console.log("======", filelist);
//             console.log(filelist);
//
//
//         }
//     }, getShared);
// }

	});

router.post('/setSharing', function (req, res, next) {
	var fileitem = req.body.file;
	var fileId = fileitem.fileid;
	var departments= req.body.departments;
	console.log(departments);

	// getShared = "SELECT * FROM Directory WHERE UserId = '"+reqUserId+"'";
	var getFile = "SELECT * FROM files WHERE fileid = "+fileId+"";
	
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

module.exports = router;