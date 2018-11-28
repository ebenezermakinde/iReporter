import incident from '../models/IncidentModel';

class Incidents {
  static getAll(req, res) {
    res.json(incident.findAll());
  }
}

export default Incidents;
