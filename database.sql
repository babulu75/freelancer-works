CREATE DATABASE freelancer;

USE freelancer;

CREATE TABLE signup_employer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,    
    password VARCHAR(255) NOT NULL
);

CREATE TABLE signup_freelancer(   
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE posts(
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    skills VARCHAR(255) NOT NULL,
    money INT NOT NULL,
    date CHAR(9) NOT NULL
);

CREATE TABLE freelancer(
    id INT PRIMARY KEY AUTO_INCREMENT,
    signup_freelancer_id INT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    skills VARCHAR(255) NOT NULL
);

CREATE TABLE POSTS (
    POST_ID INT PRIMARY KEY AUTO_INCREMENT,
    TITLE VARCHAR(255) NOT NULL,
    DESCRIPTION VARCHAR(255) NOT NULL,
    SKILLS VARCHAR(255) NOT NULL,
    MONEY INT NOT NULL,
    POSTED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DATE CHAR(10) NOT NULL
);
