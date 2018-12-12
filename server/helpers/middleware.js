import Joi from 'joi';

/**
 * Middlewares class
 */
class Middlewares {
  /**
  *Validation function for endpoint inputs
  * @param {object} req
  * @param {object} res
  * @param {object} next
  * @returns{object} validated input
  */
  static checkPost(req, res, next) {
    const schema = Joi.object().keys({
      type: Joi.string().required().required(),
      location: Joi.string().min(3).required(),
      comment: Joi.string().min(5).required(),
      status: Joi.string(),
      images: Joi.string(),
      videos: Joi.string(),
    });
    const result = Joi.validate(req.body, schema, { abortEarly: false });
    if (!result.error) {
      next();
    } else {
      const message = [];
      result.error.details.forEach((error) => {
        message.push({ error: error.message });
      });
      res.status(400).json({
        status: 400,
        message,
      });
    }
  }

  /**
  *Validation function for endpoint inputs
  * @param {object} req
  * @param {object} res
  * @param {object} next
  * @returns{object} validated input
  */
  static checkRoute(req, res, next) {
    if (req.route.path === `/${req.body.type}s`) {
      next();
    } else {
      res.json({
        status: 400,
        error: 'please insert the correct type for the URL',
      });
    }
  }
}

export default Middlewares;
