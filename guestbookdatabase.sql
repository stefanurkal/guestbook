CREATE DATABASE guestbook; 

USE guestbook; 

DROP TABLE IF EXISTS guests;
CREATE TABLE guests(
id INT AUTO_INCREMENT,
firstName VARCHAR (255),
lastName VARCHAR (255),
jobTitle VARCHAR (255),
company VARCHAR(255),
link VARCHAR(255),
email VARCHAR(255),
meet VARCHAR(255),
other VARCHAR(255),
message TEXT,
mailing VARCHAR(255),
method VARCHAR(255),
timestamp DATETIME DEFAULT NOW(),

PRIMARY KEY(id)
);

INSERT INTO guests (firstName, lastName, jobTitle, company, link, email, meet, other, message, mailing, method) VALUES 
('Dom', 'Dolla', 'producer', 'everything always', 'www.linkedin.com', 'domdolla@gmail.com', 'gaming','' , 'nice to get back in touch', 'join', 'text'); 


Select * FROM guests;