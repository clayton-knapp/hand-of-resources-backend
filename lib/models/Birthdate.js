const pool = require('../utils/pool');

module.exports = class Birthdate {
  id;
  personName;
  birthdate;

  constructor(row) {
    this.id = row.id;
    this.personName = row.person_name;
    this.birthDate = new Date(row.birth_date).toLocaleDateString('en-US');
  }

  static async insert({ personName, birthDate }){
    const { rows } = await pool.query(
      `
      INSERT INTO
        birthdates (person_name, birth_date)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
      [personName, birthDate]
    );
    return new Birthdate(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        birthdates
      `
    );
    return rows.map((row) => new Birthdate(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        birthdates
      WHERE
        id=$1
      `,
      [id]
    );
    return new Birthdate(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        birthdates
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Birthdate(rows[0]);
  }

  static async updateById(id, { personName, birthDate }) {
    const existingEntry = await Birthdate.getById(id);

    if (!existingEntry) return null;
    
    const newPersonName = personName ?? existingEntry.personName;
    const newBirthDate = birthDate ?? existingEntry.birthDate;

    const { rows } = await pool.query(
      `
      UPDATE
        birthdates
      SET
        person_name=$2,
        birth_date=$3
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id, newPersonName, newBirthDate]
    );
    return new Birthdate(rows[0]);

  }

};
