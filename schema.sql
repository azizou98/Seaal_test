CREATE DATABASE inventory_db;

USE inventory_db;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    unique_code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    stock_status ENUM('in', 'out') DEFAULT 'in',
    INDEX idx_name (name)
);
CREATE TABLE Article_In (
    id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL,
    user_id INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES Articles(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
CREATE TABLE Article_Out (
    id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL,
    user_id INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES Articles(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);