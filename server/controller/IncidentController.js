import incident from '../models/IncidentModel';
// import helper from '../helpers/helper';

class Incidents {
  static getAll(req, res) {
    incident.findAll()
      .then((result) => {
        if (req.route.path && !result.rowCount) {
          res.json({
            status: 404,
            message: 'No red-flag or intervention records',
          });
        } else if (req.route.path === '/red-flags') {
          const redflag = result.rows.filter(row => row.type === 'red-flag');
          if (redflag.length === 0) {
            res.json({
              status: 404,
              message: 'No red-flag records',
            });
          } else {
            res.json({
              status: 200,
              data: redflag,
            });
          }
        } else {
          const intervention = result.rows.filter(row => row.type !== 'red-flag');
          if (intervention.length === 0) {
            res.json({
              status: 404,
              message: 'No intervention records',
            });
          } else {
            res.json({
              status: 200,
              data: intervention,
            });
          }
          res.json({
            status: 200,
            data: intervention,
          });
        }
      })
      .catch(error => res.json(error));
  }

  static getOne(req, res) {
    incident.findOne(req.params)
      .then((result) => {
        if (req.route.path && !result.rowCount) {
          res.json({
            status: 404,
            message: 'Not found',
          });
        } else if (req.route.path === '/red-flags/:id' && result.rowCount) {
          const redflag = result.rows.filter(row => row.type === 'red-flag');
          res.json({
            status: 200,
            data: redflag,
          });
        } else {
          const intervention = result.rows.filter(row => row.type !== 'red-flag');
          res.json({
            status: 200,
            data: intervention,
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
        if (req.route.path && !result.rowCount) {
          res.json({
            status: 404,
            message: 'Not found',
          });
        } else if (req.route.path === '/red-flags/:id' && result.rowCount) {
          const redflag = result.rows.filter(row => row.type === 'red-flag');
          res.json({
            id: redflag[0].id,
            message: 'red-flag record has been deleted',
          });
        } else {
          const intervention = result.rows.filter(row => row.type !== 'red-flag');
          res.json({
            id: intervention[0].id,
            message: 'intervention record has been deleted',
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
