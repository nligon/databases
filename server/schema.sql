CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  objectId int NOT NULL AUTO_INCREMENT,
  username varchar(255),
  text varchar(255),
  roomname varchar(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (objectId)
);

/* table for rooms */

/* table for users */



/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

