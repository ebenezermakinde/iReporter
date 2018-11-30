// Incidents Class

class Incidents {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.incidents = [
      {
        id: 1,
        createdOn: new Date(),
        createdBy: 2, // represents the user who created this record
        status: 'Rejected', // [draft, under investigation, resolved, rejected]
        type: 'red-flag', // [red-flag, intervention]
        location: 'Lat long', // Lat Long coordinates
        Images: [],
        Videos: [],
        comment: 'Bad roads',
      },
    ];
  }

  /**
   * @returns {object} returns all red-flags/interventions
   */
  findAll() {
    return {
      status: 200,
      data: this.incidents,
    };
  }

  /**
   * @returns {object} returns one red flag
   */
  findOne(id) {
    const db = this.incidents;
    const incident = db.find(item => item.id === Number(id));
    return {
      status: 200,
      data: incident,
    };
  }

  /**
   * @returns {object} deletes a red-flag/intervention
   */
  removeOne(id) {
    const db = this.incidents;
    const incident = db.findIndex(item => item.id === Number(id));
    if (incident === -1) {
      return {
        status: 404,
        data: [{
          id,
          message: `id of ${id} is not found`,
        }],
      };
    }
    db.splice(incident, 1);
    return {
      status: 200,
      data: [{
        id,
        message: 'red flag record has been deleted',
      }],
    };
  }

  /**
   * @returns {object} adds a red-flag/intervention
   */
  addOne(incident) {
    const db = this.incidents;
    const id = { id: db.length + 1 };
    const createdOn = { createdOn: new Date() };
    const createdBy = { createdBy: 2 }; // represents the user who created this record
    const status = { status: 'draft' }; // [draft, under investigation, resolved, rejected]
    const newIncident = {
      ...id,
      ...createdOn,
      ...createdBy,
      ...status,
      ...incident,
    };

    db.push(newIncident);
    return {
      status: 201,
      data: [{
        id: `${id.id}`,
        message: 'Created red-flag record',
      }],
    };
  }

  patchComment(id, comment) {
    const db = this.incidents;
    const incident = db.find(item => item.id === Number(id));
    incident.comment = comment;
    return {
      Status: 201,
      Data: [{
        id,
        Message: 'Updated red-flag record\'s comment',
      }],
    };
  }

  patchLocation(id, location) {
    const db = this.incidents;
    const incident = db.find(item => item.id === Number(id));
    incident.location = location;
    return {
      Status: 201,
      Data: [{
        id,
        Message: 'Updated red-flag record\'s location',
      }],
    };
  }
}

module.exports = new Incidents();
