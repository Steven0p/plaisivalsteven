-- Portfolio Personnel — Schema MySQL
-- Kreye baz done a si li pa egziste, epi tout tab yo dapre Kaye Chaj Vèsyon 1.0

CREATE DATABASE IF NOT EXISTS portfolio_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- Itilizatè admin
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Enfòmasyon pèsonèl (yon sèl liy nan tab sa a — pwofil pwopriyetè sit la)
CREATE TABLE IF NOT EXISTS profile (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  title VARCHAR(150),
  bio TEXT,
  photo VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  location VARCHAR(150),
  cv_url VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Konpetans
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  level VARCHAR(50),
  category VARCHAR(100),
  icon VARCHAR(255)
) ENGINE=InnoDB;

-- Pwojè
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  technologies VARCHAR(255),
  github_url VARCHAR(255),
  demo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Eksperyans / Fòmasyon
CREATE TABLE IF NOT EXISTS experiences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  company VARCHAR(150),
  start_date DATE,
  end_date DATE,
  description TEXT,
  type VARCHAR(50)
) ENGINE=InnoDB;

-- Mesaj kontak
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Rezo sosyal
CREATE TABLE IF NOT EXISTS socials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  platform VARCHAR(100) NOT NULL,
  url VARCHAR(255) NOT NULL,
  icon VARCHAR(255)
) ENGINE=InnoDB;
