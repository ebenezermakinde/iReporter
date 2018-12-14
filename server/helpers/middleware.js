import Joi from 'joi';
import jwt from 'jsonwebtoken';
import db from '../models/ireporterModel';

/**
 * Middlewares class
 */
class Middlewares {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  static async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({
        status: 400,
        error: 'Access restricted',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const query = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(query, [decoded.id]);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          message: 'The token you provided is invalid',
        });
      }
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      return res.status(400).json({ status: 400, error: error.message });
    }
  }

  /**
   * Checks user isadmin
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns{object} access forbidden for non-admin
   */
  static checkAdmin(req, res, next) {
    const query = 'SELECT * FROM users WHERE id = $1';
    db.query(query, [req.user.id])
      .then((result) => {
        if (result.rows[0].isadmin === true) {
          next();
        } else {
          res.json({ status: 403, error: 'Access forbidden' });
        }
      })
      .catch(error => res.json(error));
  }

  /**
  *Validation function for endpoint inputs
  * @param {object} req
  * @param {object} res
  * @param {object} next
  * @returns {object} validated input
  */
  static checkPost(req, res, next) {
    const schema = Joi.object().keys({
      type: Joi.string().required().required(),
      location: Joi.string().min(3).required(),
      comment: Joi.string().min(5).required(),
      status: Joi.string(),
      images: Joi.string(),
      videos: Joi.string(),
    });
    const result = Joi.validate(req.body, schema, { abortEarly: false });
    if (!result.error) {
      next();
    } else {
      const message = [];
      result.error.details.forEach((error) => {
        message.push({ error: error.message });
      });
      res.status(400).json({
        status: 400,
        message,
      });
    }
  }

  /**
  *Validation function for endpoint inputs
  * @param {object} req
  * @param {object} res
  * @param {object} next
  * @returns {object} validated input
  */
  static checkRoute(req, res, next) {
    if (req.route.path === `/${req.body.type}s`) {
      next();
    } else {
      res.status(400).json({
        status: 400,
        error: 'please insert the correct type for the URL',
      });
    }
  }
}

export default Middlewares;
