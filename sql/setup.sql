-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS guitars;

CREATE TABLE guitars (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INT NOT NULL
);

INSERT INTO
  guitars (make, model, year)
VALUES
  ('Fender', 'Jazzmaster', 1969),
  ('Gibson', 'Les Paul Special', 1958),
  ('Yamaha', 'FG-180', 1970);



DROP TABLE IF EXISTS cars;

CREATE TABLE cars (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INT NOT NULL
);

INSERT INTO
  cars (make, model, year)
VALUES
  ('Ford', 'F-150', 2006),
  ('Nissan', 'D21', 1997),
  ('Subaru', 'Legacy', 1990);


DROP TABLE IF EXISTS subscribers;

CREATE TABLE subscribers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  subscribed BOOLEAN NOT NULL
);

INSERT INTO
  subscribers (email, subscribed)
VALUES
  ('clay@clay.com', true),
  ('sterling@sterling.com', false);



-- TABLE 4
DROP TABLE IF EXISTS birthdates;

CREATE TABLE birthdates (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  person_name TEXT NOT NULL,
  birth_date TEXT NOT NULL 
);

INSERT INTO
  birthdates (person_name, birth_date)
VALUES
  ('Clayton', '1969-04-20'),
  ('Bob', '2000-01-01');