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

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        subscribers
      `
    );

    return rows.map((row) => new Subscriber(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        subscribers
      WHERE
        id=$1
      `,
      [id]
    );

    // console.log(rows[0]);
    return new Subscriber(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        subscribers
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    return new Subscriber(rows[0]);

  }

  static async updateById(id, attributes) {
    const existingSubscriber = await Subscriber.getById(id);
    if (!existingSubscriber) return null;

    const updatedAttributes = { ...existingSubscriber, ...attributes };
    // const { email, subscribed } = updatedAttributes;

    // console.log(updatedAttributes);

    const { rows } = await pool.query(
      `
      UPDATE
        subscribers
      SET
        email=$2,
        subscribed=$3
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id, updatedAttributes.email, updatedAttributes.subscribed]
    );

    return new Subscriber(rows[0]);
  }

};
