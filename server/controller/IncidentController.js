import uuidv4 from 'uuid/v4';
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
    const query = 'SELECT * FROM incidents WHERE type = $1 AND createdby = $2';
    if (req.route.path === '/red-flags') {
      return Helper.controller(req, res, query, ['red-flag', req.user.id]);
    }
    return Helper.controller(req, res, query, ['intervention', req.user.id]);
  }

  /**
   * Get one incident
   * @param {object} req
   * @param {object} res
   * @returns {object} one incident object
   */
  static getOne(req, res) {
    const query = 'SELECT * FROM incidents WHERE type = $1 AND id = $2 AND createdby = $3';
    if (req.route.path === '/red-flags/:id') {
      return Helper.controller(req, res, query, ['red-flag', req.params.id, req.user.id]);
    }
    return Helper.controller(req, res, query, ['intervention', req.params.id, req.user.id]);
  }

  /**
   * Delete an incident
   * @param {object} req
   * @param {object} res
   * @returns {object} a delete message
   */
  static remove(req, res) {
    const query = 'DELETE FROM incidents WHERE type = $1 AND id = $2 AND createdby = $3 returning *';
    if (req.route.path === '/red-flags/:id') {
      const values = ['red-flag', req.params.id, req.user.id];
      return Helper.controller(req, res, query, values);
    }
    const values = ['intervention', req.params.id, req.user.id];
    return Helper.controller(req, res, query, values);
  }

  /**
   * Creates an incident
   * @param {object} req
   * @param {object} res
   * @returns {object} a created incident object
   */
  static add(req, res) {
    const query = `INSERT INTO
      incidents(id, createdby, type, location, images, videos, comment)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      uuidv4(),
      req.user.id,
      req.body.type,
      req.body.location,
      req.body.images,
      req.body.videos,
      req.body.comment,
    ];
    return Helper.controller(req, res, query, values);
  }

  /**
   * Edits only the comment
   * @param {object} req
   * @param {object} res
   * @returns {object} an edited comment message
   */
  static updateComment(req, res) {
    const query = 'UPDATE incidents SET comment = $2 WHERE id = $3 AND type = $1 AND createdby = $4 returning *';
    if (req.route.path === '/red-flags/:id/comment') {
      const values = ['red-flag', req.body.comment, req.params.id, req.user.id];
      return Helper.controller(req, res, query, values);
    }
    const values = ['intervention', req.body.comment, req.params.id, req.user.id];
    return Helper.controller(req, res, query, values);
  }

  /**
   * Edits only the location
   * @param {object} req
   * @param {object} res
   * @returns {object} an edited location message
   */
  static updateLocation(req, res) {
    const query = 'UPDATE incidents SET location = $2 WHERE id = $3 AND type = $1 AND createdby = $4 returning *';
    if (req.route.path === '/red-flags/:id/location') {
      const values = ['red-flag', req.body.location, req.params.id, req.user.id];
      return Helper.controller(req, res, query, values);
    }
    const values = ['intervention', req.body.location, req.params.id, req.user.id];
    return Helper.controller(req, res, query, values);
  }
}

export default Incidents;
