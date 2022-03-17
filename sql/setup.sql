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