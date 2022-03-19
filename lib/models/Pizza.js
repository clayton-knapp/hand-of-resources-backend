const pool = require('../utils/pool');

module.exports = class Pizza {
  id;
  personName;
  birthdate;

  constructor(row) {
    this.id = row.id;
    this.pizzaName = row.pizza_name;
    this.price = row.price;
    this.toppings = row.toppings;
  }

  static async insert({ pizzaName, price, toppings }){
    const { rows } = await pool.query(
      `
      INSERT INTO
        pizzas (pizza_name, price, toppings)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [pizzaName, price, toppings]
    );
    return new Pizza(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        pizzas
      `
    );
    return rows.map((row) => new Pizza(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        pizzas
      WHERE
        id=$1
      `,
      [id]
    );
    return new Pizza(rows[0]);
  }


  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        pizzas
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Pizza(rows[0]);
  }

};
