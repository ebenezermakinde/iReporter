import incident from '../models/IncidentModel';
// import helper from '../helpers/helper';

class Incidents {
  static getAll(req, res) {
    incident.findAll()
      .then(result => res.json({
        status: 200,
        data: result.rows,
      }))
      .catch(error => res.json(error));
  }

  static getOne(req, res) {
    // console.log(req.route.path);
    incident.findOne(req.params)
      .then((result) => {
        if (result.rowCount === 0) {
          res.status(404).json({
            status: 404,
            message: 'Not found',
          });
        } else {
          res.json({
            status: 200,
            data: result.rows,
          });
        }
      })
      .catch((error) => {
        if (error) {
          res.status(500).json({
            status: 500,
            message: 'An error occurred most likely invalid id',
          });
        }
      });
  }

  static remove(req, res) {
    incident.removeOne(req.params)
      .then((result) => {
        if (result.rowCount === 0) {
          res.json({
            status: 404,
            message: 'Not found',
          });
        } else {
          res.json({
            id: result.rows[0].id,
            message: 'red-flag record has been deleted',
          });
        }
      })
      .catch((error) => {
        if (error) {
          res.status(500).json({
            status: 500,
            message: 'An error occurred most likely invalid id',
          });
        }
      });
  }

  static add(req, res) {
    incident.addOne(req.body)
      .then(result => res.json({
        status: 201,
        data: [{
          id: result.rows[0].id,
          message: 'Created red-flag record',
        }],
      }))
      .catch((error) => {
        if (error) {
          res.status(500).json({
            status: 500,
            message: 'Please insert a valid type e.g red-flag, intervention',
          });
        }
      });
  }

  static updateComment(req, res) {
    incident.patchComment(req.params, req.body)
      .then(result => res.json({
        status: 200,
        data: [{
          id: result.rows[0].id,
          message: 'Updated red-flag record\'s comment',
        }],
      }))
      .catch((error) => {
        if (error) {
          res.status(500).json({
            status: 500,
            message: 'An error occurred most likely invalid id',
          });
        }
      });
  }

  static updateLocation(req, res) {
    incident.patchLocation(req.params, req.body)
      .then(result => res.json({
        status: 200,
        data: [{
          id: result.rows[0].id,
          message: 'Updated red-flag record\'s location',
        }],
      }))
      .catch((error) => {
        if (error) {
          res.status(500).json({
            status: 500,
            message: 'An error occurred most likely invalid id',
          });
        }
      });
  }
}

export default Incidents;
