CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_ssn` /*!40100 DEFAULT CHARACTER SET utf8 */;
 
 USE db_ssn;

 
 DROP TABLE IF EXISTS `user_dep_mapping`;
 DROP TABLE IF EXISTS `files`;
 DROP TABLE IF EXISTS `request_comments`;
 DROP TABLE IF EXISTS `requests`;
 DROP TABLE IF EXISTS `user`;
 DROP TABLE IF EXISTS `department`;
 DROP TABLE IF EXISTS `chatusers`;
 
 
 CREATE TABLE `user` (
   `userid` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `emailid` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `departmentid` int(11) NOT NULL,
  `type` int(1) DEFAULT '0' COMMENT '0=User,1=Admin,2=SuperAdmin',
  `deleteflag` int(1) DEFAULT '0',
    PRIMARY KEY (`userid`),
  UNIQUE KEY `emailid_UNIQUE` (`emailid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
  

 
 CREATE TABLE `department` (
`departmentid` int(11) NOT NULL AUTO_INCREMENT,
  `dep_name` varchar(50) NOT NULL,
  `deleteflag` int(1) DEFAULT '0',
  PRIMARY KEY (`departmentid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

 
 CREATE TABLE `user_dep_mapping` (
   `userid` INT(11) NOT NULL,
   `departmentid` INT(11) NOT NULL,
   FOREIGN KEY (`userid`) REFERENCES user(`userid`),
   FOREIGN KEY (`departmentid`) REFERENCES department(`departmentid`)
  )ENGINE=INNODB DEFAULT CHARSET=utf8;
 
 
 
 
 CREATE TABLE `files` (
   `fileid` INT(11) NOT NULL AUTO_INCREMENT,
   `filename` VARCHAR(100) NOT NULL,
   `departments` VARCHAR(50) NOT NULL,
   `uploadedby` INT(11) NOT NULL,
   `path` VARCHAR(200) NOT NULL,
   `uploaded_date` DATETIME NOT NULL,
   `deleteflag` INT(1) DEFAULT '0',
   PRIMARY KEY (`fileid`),
   FOREIGN KEY (`uploadedby`) REFERENCES user(`userid`)
 ) ENGINE=INNODB DEFAULT CHARSET=utf8;
 
 

 
 CREATE TABLE `requests` (
  `requestid` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(500) NOT NULL,
  `assignedto` varchar(50) NOT NULL,
  `createdby` varchar(50) NOT NULL,
  `departmentid` int(11) NOT NULL,
  `status` varchar(20) DEFAULT 'OPEN',
  `generated_date` datetime NOT NULL,
  `resolved_date` datetime NOT NULL,
  `deleteflag` int(1) DEFAULT '0',
  `subject` varchar(45) NOT NULL,
   PRIMARY KEY (`requestid`),
   FOREIGN KEY (`departmentid`) REFERENCES department(`departmentid`)
 ) ENGINE=INNODB DEFAULT CHARSET=utf8;
 
 
 
 
 CREATE TABLE `request_comments` (
   `commentid` INT(11) NOT NULL AUTO_INCREMENT,
   `reqid` INT(11) NOT NULL,
   `comment` VARCHAR(500) NOT NULL,
   `userid` INT(11) NOT NULL,
   `comment_time` DATETIME NOT NULL,
   `deleteflag` INT(1) DEFAULT '0',
   PRIMARY KEY (`commentid`),
   FOREIGN KEY (`userid`) REFERENCES user(`userid`),
   FOREIGN KEY (`reqid`) REFERENCES requests(`requestid`)
 ) ENGINE=INNODB DEFAULT CHARSET=utf8;

  CREATE TABLE `chatusers` (
   `userid` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `emailid` varchar(100) NOT NULL,
  `departmentid` int(11) NOT NULL,
  `type` int(1) DEFAULT '0' COMMENT '0=User,1=Admin,2=SuperAdmin',
  `deleteflag` int(1) DEFAULT '0',
    PRIMARY KEY (`userid`),
  UNIQUE KEY `emailid_UNIQUE` (`emailid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

CREATE TABLE `group` (
  `from` varchar(50) NOT NULL,
  `dep_name` varchar(50) NOT NULL,
  'message' varchar(100),
  `date` DATETIME

) ENGINE=InnoDB DEFAULT CHARSET=utf8;