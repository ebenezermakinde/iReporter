import db from '../models/ireporterModel';
import helper from '../helpers/helper';

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
    users(firstname, lastname, othernames, email, password, phonenumber, username)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    returning *`;
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.othernames,
      req.body.email,
      hashPassword,
      req.body.phonenumber,
      req.body.username,
    ];
    db.query(query, values)
      .then((result) => {
        const token = helper.generateToken(result.rows[0].id);
        res.status(201).json({ token });
      })
      .catch((error) => {
        if (error.routine === '_bt_check_unique') {
          res.status(400).json({ message: 'User with email already exists' });
        } else {
          res.status(400).send(error.message);
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
          res.status(400).json({ message: 'The credentials you provided are not valid' });
        } else if (!helper.comparePassword(rows[0].password, req.body.password)) {
          res.status(400).json({ message: 'The credentials you provided are not valid' });
        } else {
          const token = helper.generateToken(rows[0].id);
          res.status(200).json({ token });
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
    if (req.route.path === '/red-flags/:id/status') {
      const query = 'UPDATE users SET status = $1 WHERE id = $2 AND type = $3';
      db.query(query, [req.body.status, req.params.id, 'red-flag'])
        .then((result) => {
          const { rows } = result;
          res.json({
            status: 200,
            data: [{ id: rows[0].id, message: 'Updated red-flag record\'s status' }],
          });
        })
        .catch(error => res.status(500).json(error.message));
    } else if (req.route.path === '/interventions/:id/status') {
      const query = 'UPDATE users SET status = $1 WHERE id = $2 AND type = $3';
      db.query(query, [req.body.status, req.params.id, 'intervention'])
        .then((result) => {
          const { rows } = result;
          res.json({
            status: 200,
            data: [{ id: rows[0].id, message: 'Updated intervention record\'s status' }],
          });
        })
        .catch(error => res.status(500).json(error.message));
    }
  }
}


export default Users;
