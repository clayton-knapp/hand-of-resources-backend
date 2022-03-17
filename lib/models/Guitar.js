const pool = require('../utils/pool');

module.exports = class Guitar {
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
        guitars (make, model, year)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [make, model, year]
    );
    return new Guitar(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        guitars
      `
    );
    return rows.map((row) => new Guitar(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT
        *
      FROM
        guitars
      WHERE
        id=$1
      `,
      [id]
    );
    return new Guitar(rows[0]);
  }


  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        guitars
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Guitar(rows[0]);
  }

  static async updateById(id, { make, model, year }) {
    const existingGuitar = await Guitar.getById(id);
    
    if (!existingGuitar) return null;
    
    const newMake = make ?? existingGuitar.make;
    const newModel = model ?? existingGuitar.model;
    const newYear = year ?? existingGuitar.year;

    const { rows } = await pool.query(
      `
      UPDATE
          guitars
        SET
          make=$2,
          model=$3,
          year=$4
        WHERE
          id=$1
        RETURNING
          *
      `,
      [id, newMake, newModel, newYear]
    );
    
    return new Guitar(rows[0]);
  }

};
