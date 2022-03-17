const pool = require('../utils/pool');

module.exports = class Subscriber {
  id;
  email;
  subscribed;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.subscribed = row.subscribed;
  }

  static async insert({ email, subscribed }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        subscribers (email, subscribed)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
      [email, subscribed]
    );

    return new Subscriber(rows[0]);
  }

};
