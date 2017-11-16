CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_ssn` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE db_ssn;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `userid` INT(11) NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(50) NOT NULL,
  `lastname` VARCHAR(50) NOT NULL,
  `emailid` VARCHAR(100) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `departmentid` INT(11) NOT NULL,
  `type` INT(1) DEFAULT '0' COMMENT '0=Student,1=Faculty,2=Staff, 3= Admin/Head of department, 4= Superadmin',
  `deleteflag` INT(1) DEFAULT '0',
  PRIMARY KEY (`userid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `departmentid` INT(11) NOT NULL AUTO_INCREMENT,
  `dep_name` VARCHAR(50) NOT NULL,
  `dep_admin` INT(11) NOT NULL,
  `deleteflag` INT(1) DEFAULT '0',
  PRIMARY KEY (`departmentid`),
  FOREIGN KEY (`dep_admin`) REFERENCES user(`userid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user_dep_mapping`;

CREATE TABLE `user_dep_mapping` (
  `userid` INT(11) NOT NULL,
  `departmentid` INT(11) NOT NULL,
  FOREIGN KEY (`userid`) REFERENCES user(`userid`),
  FOREIGN KEY (`departmentid`) REFERENCES department(`departmentid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `files`;

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


DROP TABLE IF EXISTS `requests`;

CREATE TABLE `requests` (
  `requestid` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(500) NOT NULL,
  `assignedto` INT(11) NOT NULL,
  `createdby` INT(11) NOT NULL,
  `departmentid` INT(11) NOT NULL,
  `status` VARCHAR(20) DEFAULT 'OPEN',
  `generated_date` DATETIME NOT NULL,
  `resolved_date` DATETIME NOT NULL,
  `deleteflag` INT(1) DEFAULT '0',
  PRIMARY KEY (`requestid`),
  FOREIGN KEY (`createdby`) REFERENCES user(`userid`),
  FOREIGN KEY (`assignedto`) REFERENCES user(`userid`),
  FOREIGN KEY (`departmentid`) REFERENCES department(`departmentid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `request_comments`;

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


