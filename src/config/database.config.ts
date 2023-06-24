import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('local', 'dev').required(),
  MYSQL_HOST: Joi.string().required(),
  MYSQL_PORT: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().when('NODE_ENV', {
    is: 'local',
    then: Joi.string().allow('').default(''),
    otherwise: Joi.string().required(),
  }),
  MYSQL_DATABASE: Joi.string().required(),
});
