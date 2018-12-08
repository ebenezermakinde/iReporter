import { Pool } from 'pg';
import env from 'dotenv';

env.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

db.on('connect', () => {
  console.log('connected to the db');
});

// class Table {
//   /**
//    * Create Tables
//    */
//   static createTables() {
//     const queryText = `CREATE TABLE IF NOT EXISTS incident(
//       id SERIAL PRIMARY KEY,
//       createdOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//       status VARCHAR(25) DEFAULT 'draft',
//       type VARCHAR(13) NOT NULL,
//       location TEXT NOT NULL,
//       images TEXT,
//       videos TEXT,
//       comment TEXT NOT NULL,
//       CONSTRAINT check_type check (type in('red-flag','intervention'))
//       )`;

//     db.query(queryText)
//       .then((res) => {
//         console.log(res);
//         db.end();
//       })
//       .catch((err) => {
//         console.log(err);
//         db.end();
//       });
//   }

//   /**
//    * Drop Tables
//    */
//   static dropTables() {
//     const queryText = 'DROP TABLE IF EXISTS incident';
//     db.query(queryText)
//       .then((res) => {
//         console.log(res);
//         db.end();
//       })
//       .catch((err) => {
//         console.log(err);
//         db.end();
//       });
//   }
// }

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
    return db.query('SELECT * FROM incident');
  }

  /**
   * @returns {object} returns one red flag
   */
  static findOne({ id }) {
    return db.query('SELECT * FROM incident WHERE id = $1', [id]);
  }

  /**
   * @returns {object} deletes a red-flag/intervention
   */
  static removeOne({ id }) {
    return db.query('DELETE FROM incident WHERE id = $1 returning *', [id]);
  }

  /**
   * @returns {object} adds a red-flag/intervention
   */
  static addOne({ type, location, comment }) {
    return db.query(
      'INSERT INTO incident(type, location, comment) VALUES ($1, $2, $3) returning *', [type, location, comment],
    );
  }

  static patchComment({ id }, { comment }) {
    return db.query('UPDATE incident SET comment = $1 WHERE id = $2 returning *', [comment, id]);
  }

  static patchLocation({ id }, { location }) {
    return db.query('UPDATE incident SET location = $1 WHERE id = $2 returning *', [location, id]);
  }
}

export default Incidents;

require('make-runnable');
