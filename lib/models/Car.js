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

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        cars
      WHERE
        id=$1
      `,
      [id]
    );

    return new Car(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        cars
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    return new Car(rows[0]);
  }

  static async updateById(id, attributes) {

    const existingCar = await Car.getById(id);
    if (!existingCar) return null;

    const updatedAttributes = { ...existingCar, ...attributes };
    const { make, model, year } = updatedAttributes;


    const { rows } = await pool.query(
      `
      UPDATE
        cars
      SET
        make=$2,
        model=$3,
        year=$4
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id, make, model, year]
    );


    return new Car(rows[0]);
  }

};
