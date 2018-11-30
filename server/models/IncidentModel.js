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
    return this.incidents;
  }

  /**
   * @returns {object} returns one red flag
   */
  findOne(id) {
    const db = this.incidents;
    const incident = db.find(item => item.id === Number(id));
    return incident;
  }

  /**
   * @returns {object} deletes a red-flag/intervention
   */
  removeOne(id) {
    const db = this.incidents;
    const incident = db.findIndex(item => item.id === Number(id));
    db.splice(incident, 1);
    return incident;
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
    return newIncident;
  }

  patchComment(id) {
    const db = this.incidents;
    const incident = db.find(item => item.id === Number(id));
    return incident;
  }

  patchLocation(id) {
    const db = this.incidents;
    const incident = db.find(item => item.id === Number(id));
    return incident;
  }
}

export default new Incidents();
