DROP TABLE IF EXISTS users_kb;
DROP TABLE IF EXISTS posts_kb;
DROP TABLE IF EXISTS albums_kb;
DROP TABLE IF EXISTS photos_kb;
DROP TABLE IF EXISTS todos_kb;
DROP TABLE IF EXISTS comments_kb;


CREATE TABLE IF NOT EXISTS users_kb (
  id SMALLINT PRIMARY KEY,
  name VARCHAR(55),
  username VARCHAR(55),
  email VARCHAR(55),
  phone VARCHAR(55),
  website VARCHAR(55),
  address JSON,
  company JSON
);

CREATE TABLE IF NOT EXISTS posts_kb (
  id SMALLINT PRIMARY KEY,
  userId SMALLINT,
  title VARCHAR,
  body TEXT
);

CREATE TABLE IF NOT EXISTS albums_kb (
  id SMALLINT PRIMARY KEY,
  userId SMALLINT,
  title VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS photos_kb (
  id SMALLINT PRIMARY KEY,
  userId SMALLINT,
  albumId SMALLINT,
  title VARCHAR(255),
  url VARCHAR(255),
  thumbnailUrl VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS todos_kb (
  id SMALLINT PRIMARY KEY,
  userId SMALLINT,
  title VARCHAR(255),
  completed BOOLEAN
);

CREATE TABLE IF NOT EXISTS comments_kb (
  id SMALLINT PRIMARY KEY,
  postId SMALLINT,
  name VARCHAR(255),
  email VARCHAR(255),
  body TEXT
);
