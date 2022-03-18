const pool = require('../utils/pool');

module.exports = class Birthdate {
  id;
  personName;
  birthdate;

  constructor(row) {
    this.id = row.id;
    this.personName = row.person_name;
    this.birthDate = row.birth_date;
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

};
