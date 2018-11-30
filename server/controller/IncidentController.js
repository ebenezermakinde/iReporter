import incident from '../models/IncidentModel';

class Incidents {
  static getAll(req, res) {
    const data = incident.findAll();
    if (data.length < 1) {
      res.status(202).json({
        status: 202,
        message: 'No data in the database',
      });
    }
    res.json({
      status: 200,
      data,
    });
  }

  static getOne(req, res) {
    const { id } = req.params;
    const data = incident.findOne(id);
    if (!data) {
      res.status(404).json({
        status: 404,
        message: `No red-flag found with #id of ${id}`,
      });
    }
    res.json({
      status: 200,
      data: [data],
    });
  }

  static remove(req, res) {
    const { id } = req.params;
    const data = incident.removeOne(id);
    if (data === -1) {
      res.status(404).json({
        status: 404,
        message: `No red-flag found with #id of ${id}`,
      });
    }
    res.status(202).json({
      status: 202,
      data: [{
        id,
        message: 'red flag record has been deleted',
      }],
    });
  }

  static add(req, res) {
    const data = incident.addOne(req.body);
    res.status(201).json({
      status: 201,
      data: [{
        id: data.id,
        message: 'Created red-flag record',
      }],
    });
  }

  static updateComment(req, res) {
    const { id } = req.params;
    const { comment } = req.body;
    const data = incident.patchComment(id);
    if (!data) {
      res.status(404).json({
        status: 404,
        message: `No red-flag found with #id of ${id}`,
      });
    }
    data.comment = comment;
    res.status(202).json({
      status: 202,
      data: [{
        id,
        message: 'Updated red-flag record\'s comment',
      }],
    });
  }

  static updateLocation(req, res) {
    const { id } = req.params;
    const { location } = req.body;
    const data = incident.patchLocation(id);
    if (!data) {
      res.status(404).json({
        status: 404,
        message: `No red-flag found with #id of ${id}`,
      });
    }
    data.location = location;
    res.status(202).json({
      status: 202,
      data: [{
        id,
        message: 'Updated red-flag record\'s location',
      }],
    });
  }
}

export default Incidents;
