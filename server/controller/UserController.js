import uuidv4 from 'uuid/v4';
import env from 'dotenv';
import db from '../models/ireporterModel';
import helper from '../helpers/helper';

env.config();

/**
 * User class
 */
class Users {
  /**
   * Handles signup
   * @param {object} req
   * @param {object} res
   * @returns {object} a success signup message
   */
  static canSignup(req, res) {
    const hashPassword = helper.hashPassword(req.body.password);
    const query = `INSERT INTO
    users(id, firstname, lastname, othernames, email, password, phonenumber, username, isadmin)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning *`;
    const values = [
      uuidv4(),
      req.body.firstname,
      req.body.lastname,
      req.body.othernames,
      req.body.email,
      hashPassword,
      req.body.phonenumber,
      req.body.username,
      req.body.isadmin,
    ];
    db.query(query, values)
      .then((result) => {
        const token = helper.generateToken(result.rows[0].id);
        res.status(201).json({
          status: 201,
          data: [{
            token,
            user: result.rows[0],
          }],
        });
      })
      .catch((error) => {
        if (error.routine === '_bt_check_unique') {
          res.status(409).json({
            status: 409,
            error: 'User with email already exists',
          });
        } else {
          res.status(400).json({
            status: 400,
            error: error.message,
          });
        }
      });
  }

  /**
   * Handles login
   * @param {object} req
   * @param {object} res
   * @returns {object} with login success message
   */
  static canLogin(req, res) {
    const query = 'SELECT * FROM users WHERE email = $1';
    db.query(query, [req.body.email])
      .then((result) => {
        const { rows } = result;
        if (!rows[0]) {
          res.status(400).json({
            status: 400,
            error: 'The credentials you provided are not valid',
          });
        } else if (!helper.comparePassword(rows[0].password, req.body.password)) {
          res.status(400).json({
            status: 400,
            message: 'The credentials you provided are not valid',
          });
        } else {
          const token = helper.generateToken(rows[0].id);
          res.status(200).json({
            status: 200,
            data: [{
              token,
              user: req.body,
            }],
          });
        }
      })
      .catch(error => res.status(400).json(error));
  }

  /**
   * Handle status updates
   * @param {object} req
   * @param {object} res
   * @returns {object} a successfully edit message
   */
  static canEdit(req, res) {
    const query = 'UPDATE users SET status = $1 WHERE id = $2 AND type = $3';
    if (req.route.path === '/red-flags/:id/status') {
      const values = [req.body.status, req.params.id, 'red-flag'];
      return helper.controller(req, res, query, values);
    }
    const values = [req.body.status, req.params.id, 'intervention'];
    return helper.controller(req, res, query, values);
  }
}


export default Users;
