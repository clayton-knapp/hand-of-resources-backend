const pool = require('../utils/pool');

module.exports = class Car {
  id;
  make;
  model;
  year;

  constructor(row) {
    this.id = row.id;
    this.make = row.make;
    this.model = row.model;
    this.year = row.year;
  }

  static async insert({ make, model, year }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        cars (make, model, year)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [make, model, year]
    );

    // console.log('model rows', rows[0]);

    return new Car(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          cars
      `
    );

    return rows.map((row) => new Car(row));
  }
};