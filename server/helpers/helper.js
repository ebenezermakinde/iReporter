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
  static controller(req, res, query, type) {
    return db.query(query, type)
      .then((result) => {
        if (result.rowCount === 0) {
          res.status(404).json({ status: 404, error: `No ${type[0]}(s) record found` });
        } else if (result.command === 'UPDATE') {
          let path = req.url.split('/');
          path = path[path.length - 1];
          res.json({
            status: 200,
            data: [{ id: result.rows[0].id, message: `Updated ${type[0]} record's ${path}` }],
          });
        } else if (result.command === 'INSERT') {
          res.json({
            status: 200,
            data: [{ id: result.rows[0].id, message: `Created ${result.rows[0].type} record` }],
          });
        } else if (result.command === 'DELETE') {
          res.json({
            status: 200,
            data: [{ id: result.rows[0].id, message: `${result.rows[0].type} record has been deleted` }],
          });
        } else {
          res.json({ status: 200, data: result.rows });
        }
      })
      .catch((error) => {
        if (error.routine === 'string_to_uuid') {
          res.status(400).json({ status: 400, error: 'Please insert a valid URL' });
        } else {
          res.status(500).json({ status: 500, error: error.message });
        }
      });
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
      id,
    },
    process.env.SECRET, { expiresIn: '7d' });
    return token;
  }
}

export default Helper;
