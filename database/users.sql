DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  username varchar(30) NOT NULL,
  password varchar(30) NOT NULL,
  mail varchar(30) NOT NULL,
  Admin int(1) not null Default 0,
  PRIMARY KEY (username,mail)
);

INSERT INTO `user` VALUES ('orestis_m','roheyan22','ormaraziotis@gmail.com')
,('dairuinz','yeet22','dairuinz@gmail.com')
,('roheyan','aneswad','roheyan@gmail.com');
