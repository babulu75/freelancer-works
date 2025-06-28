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
    date DATE NOT NULL,
);

CREATE TABLE freelancer(
    id INT PRIMARY KEY AUTO_INCREMENT,
    signup_freelancer_id INT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    skills VARCHAR(255) NOT NULL,
);

