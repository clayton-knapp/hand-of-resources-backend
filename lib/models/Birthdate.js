const pool = require('../utils/pool');

module.exports = class Birthdate {
  id;
  personName;
  birthdate;

  constructor(row) {
    this.id = row.id;
    this.personName = row.person_name;
    this.birthdate = row.birthdate;
  }

  static async insert({ personName, birthdate }){
    const { rows } = await pool.query(
      `
      INSERT INTO
        birthdates (person_name, birthdate)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
      [personName, birthdate]
    );
    return new Birthdate(rows[0]);
  }

};
