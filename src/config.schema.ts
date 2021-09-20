import * as Joi from '@hapi/joi';

export const configValidationsSchema = Joi.object({
    TYPE_DB: Joi.string().required(),
    HOST_DB: Joi.string().required(),
    PORT_DB: Joi.string().default('3306').required(),
    USERNAME_DB: Joi.string().required(),
    PASSWORD_DB: Joi.string().required(),
    NAME_DATABASE: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
});