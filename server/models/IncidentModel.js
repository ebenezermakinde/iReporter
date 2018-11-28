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
   * @returns {object} returns all reflections
   */
  findAll() {
    return {
      status: 200,
      data: this.incidents,
    };
  }
}

export default new Incidents();
