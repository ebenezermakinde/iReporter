class Middleware {
  static checkIncidentFields(req, res, next) {
    const { type, location, comment } = req.body;
    if (type && location && comment) {
      next();
    } else {
      res.status(400).json({
        status: 400,
        message: 'type, location and comment cannot be empty',
      });
    }
  }
}

export default Middleware;
