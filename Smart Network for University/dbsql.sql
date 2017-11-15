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
  `isadmin` INT(1) DEFAULT '0',
  `issuperadmin` INT(1) DEFAULT '0',
  `deleteflag` INT(1) DEFAULT '0',
  PRIMARY KEY (`userid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

