const incident = require('../models/IncidentModel');

class Incidents {
  static getAll(req, res) {
    res.json(incident.findAll());
  }

  static getOne(req, res) {
    const { id } = req.params;
    res.json(incident.findOne(id));
  }

  static remove(req, res) {
    const { id } = req.params;
    res.json(incident.removeOne(id));
  }

  static add(req, res) {
    res.json(incident.addOne(req.body));
  }

  static updateComment(req, res) {
    const { id } = req.params;
    const { comment } = req.body;
    res.json(incident.patchComment(id, comment));
  }

  static updateLocation(req, res) {
    const { id } = req.params;
    const { location } = req.body;
    res.json(incident.patchLocation(id, location));
  }
}

module.exports = Incidents;
