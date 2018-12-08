import Joi from 'joi';
// class Middlewares {}
const checkFields = (req, res, next) => {
  const schema = Joi.object().keys({
    type: Joi.string().required(),
    location: Joi.string().min(3).required(),
    comment: Joi.string().min(5).required(),
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    next();
  } else {
    res.status(400).json({
      status: 400,
      message: result.error.details[0].message,
    });
  }
};

export default checkFields;
