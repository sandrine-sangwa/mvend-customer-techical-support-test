# mvend-customer-techical-support-test

#SQL --used xampp

CREATE DATABASE articles_db;

USE articles_db;

CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE users (
   UserID INT IDENTITY(1,1) NOT NULL,
    user name VARCHAR(400) NOT NULL,
    PasswordHash BINARY(64) NOT NULL,
);

