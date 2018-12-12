import { Pool } from 'pg';
import env from 'dotenv';

env.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


export default {
  /**
   * DB Query
   * @param {string} text
   * @param {Array} params
   * @returns {object} promise
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
