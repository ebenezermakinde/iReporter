import db from '../models/ireporterModel';
import Helper from '../helpers/helper';
/**
 * Incident class
 */
class Incidents {
  /**
   * Get all incidents
   * @param {object} req
   * @param {object} res
   * @returns {object} all incident objects
   */
  static getAll(req, res) {
    const query = 'SELECT * FROM incidents WHERE type = $1';
    if (req.route.path === '/red-flags') {
      Helper.find(req, res, query, ['red-flag']);
    } else {
      Helper.find(req, res, query, ['intervention']);
    }
  }

  /**
   * Get one incident
   * @param {object} req
   * @param {object} res
   * @returns {object} one incident object
   */
  static getOne(req, res) {
    const query = 'SELECT * FROM incidents WHERE id = $1 AND type = $2';
    if (req.route.path === '/red-flags/:id') {
      Helper.find(req, res, query, [req.params.id, 'red-flag']);
    } else {
      Helper.find(req, res, query, [req.params.id, 'intervention']);
    }
  }

  /**
   * Delete an incident
   * @param {object} req
   * @param {object} res
   * @returns {object} a delete message
   */
  static remove(req, res) {
    const query = 'DELETE FROM incidents WHERE id = $1 AND type = $2';
    if (req.route.path === '/red-flags/:id') {
      db.query(query, [req.params.id, 'red-flag'])
        .then(result => res.status(200).json({
          status: 200,
          data: [{
            id: result.rows[0].id,
            message: 'redflag record has been deleted',
          }],
        }))
        .catch(error => res.json(error.message));
    } else {
      db.query(query, [req.params.id, 'intervention'])
        .then(result => res.status(200).json({
          status: 200,
          data: [{
            id: result.rows[0].id,
            message: 'intervention record has been deleted',
          }],
        }))
        .catch(error => res.json(error.message));
    }
  }

  /**
   * Creates an incident
   * @param {object} req
   * @param {object} res
   * @returns {object} a created incident object
   */
  static add(req, res) {
    const query = `INSERT INTO
      incidents(type, location, images, videos, comment)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      req.body.type,
      req.body.location,
      req.body.images,
      req.body.videos,
      req.body.comment,
    ];
    db.query(query, values)
      .then((result) => {
        const created = {
          status: 201,
          data: [{
            id: result.rows[0].id,
            message: `Created ${req.body.type} record`,
          }],
        };
        res.json(created);
      })
      .catch(error => res.status(500).json(error.message));
  }

  /**
   * Edits only the comment
   * @param {object} req
   * @param {object} res
   * @returns {object} an edited comment message
   */
  static updateComment(req, res) {
    const query = 'UPDATE incidents SET comment = $1 WHERE id = $2 AND type = $3 returning *';
    if (req.route.path === '/red-flags/:id/comment') {
      const values = [req.body.comment, req.params.id, 'red-flag'];
      Helper.patch(req, res, query, values);
    } else {
      const values = [req.body.comment, req.params.id, 'intervention'];
      Helper.patch(req, res, query, values);
    }
  }

  /**
   * Edits only the location
   * @param {object} req
   * @param {object} res
   * @returns {object} an edited location message
   */
  static updateLocation(req, res) {
    const query = 'UPDATE incidents SET location = $1 WHERE id = $2 AND type = $3 returning *';
    if (req.route.path === '/red-flags/:id/location') {
      const values = [req.body.location, req.params.id, 'red-flag'];
      Helper.patch(req, res, query, values);
    } else {
      const values = [req.body.location, req.params.id, 'intervention'];
      Helper.patch(req, res, query, values);
    }
  }
}

export default Incidents;
