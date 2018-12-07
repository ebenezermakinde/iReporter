import Joi from 'joi';

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
    res.send(result.error.details[0].message);
  }
};

export default checkFields;
