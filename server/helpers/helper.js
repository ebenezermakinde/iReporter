import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/ireporterModel';

/**
 * Helper class
 */
class Helper {
  /**
   * Finds an incident
   * @param {object} req
   * @param {object} res
   * @param {object} query
   * @param {Array} type
   * @returns {object} of a record
   */
  static find(req, res, query, type) {
    return db.query(query, type)
      .then((result) => {
        if (result.rowCount === 0) {
          res.status(404).json({
            status: 404,
            error: `No ${type}(s) record found`, // fix id issue
          });
        } else {
          res.json({
            status: 200,
            data: result.rows,
          });
        }
      })
      .catch(error => res.json(error.message));
  }

  /**
   * Edits a record
   * @param {object} req
   * @param {object} res
   * @param {object} query
   * @param {object} values
   * @returns {object} a Promise
   */
  static patch(req, res, query, values) {
    return db.query(query, values)
      .then((result) => {
        if (result.rowCount === 0) {
          res.json({
            status: 404,
            error: `No ${values[2]} records found`,
          });
        } else {
          res.json({
            status: 200,
            data: [{
              id: result.rows[0].id,
              message: `Updated ${values[2]} record's`, // work on this too
            }],
          });
        }
      })
      .catch(error => res.status(500).json(error.message));
  }

  /**
   * Encrypts a password
   * @param {object} password
   * @returns {string} hashed password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * Generate Token
   * @param {string} id
   * @returns {string} token
   */
  static generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
    process.env.SECRET, { expiresIn: '7d' });
    return token;
  }
}

export default Helper;
