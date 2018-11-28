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
        type: 'red-flag', // [red-flag, intervention]
        location: 'Lat long', // Lat Long coordinates
        status: 'Rejected', // [draft, under investigation, resolved, rejected]
        Images: [],
        Videos: [],
        comment: 'Bad roads',
      },
    ];
  }
  /**
   *
   * @returns {object} reflection object
   */

  /**
   * @returns {object} returns all red flags
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
   * @returns {object} deletes a red flag
   */
  removeOne(id) {
    const db = this.incidents;
    db.filter(item => item.id !== Number(id));
    return {
      status: 200,
      data: [{
        id,
        message: 'red flag record has been deleted',
      }],
    };
  }
}

export default new Incidents();
