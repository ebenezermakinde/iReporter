import incident from '../models/IncidentModel';

class Incidents {
  static getAll(req, res) {
    res.json(incident.findAll());
  }

  static getOne(req, res) {
    const { id } = req.params;
    res.json(incident.findOne(id));
  }
}

export default Incidents;
