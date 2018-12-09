import { Pool } from 'pg';
import env from 'dotenv';

env.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

db.on('connect', () => {
  console.log('connected to the db');
});

db.on('remove', () => {
  console.log('client removed');
  // process.exit(0);
});

// Incidents Class

class Incidents {
  /**
   * @returns {object} returns all red-flags/interventions
   */
  static findAll() {
    return db.query('SELECT * FROM incidents');
  }

  /**
   * @returns {object} returns one red flag
   */
  static findOne({ id }) {
    return db.query('SELECT * FROM incidents WHERE id = $1', [id]);
  }

  /**
   * @returns {object} deletes a red-flag/intervention
   */
  static removeOne({ id }) {
    return db.query('DELETE FROM incidents WHERE id = $1 returning *', [id]);
  }

  /**
   * @returns {object} adds a red-flag/intervention
   */
  static addOne({ type, location, comment }) {
    return db.query(
      'INSERT INTO incidents(type, location, comment) VALUES ($1, $2, $3) returning *', [type, location, comment],
    );
  }

  static patchComment({ id }, { comment }) {
    return db.query('UPDATE incidents SET comment = $1 WHERE id = $2 returning *', [comment, id]);
  }

  static patchLocation({ id }, { location }) {
    return db.query('UPDATE incidents SET location = $1 WHERE id = $2 returning *', [location, id]);
  }
}

export default Incidents;

require('make-runnable');
