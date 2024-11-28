import * as joi from 'joi';
import 'dotenv/config';

interface EnvsSchema {
  PORT: number;
  NAT_SERVERS: string[];
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_SECRET: string;
  CLOUD_NAME: string;
  CLOUDINARY_SECRET: string;
  CLOUDINARY_KEY: string;
  database: Database;
}

interface Database {
  host: string;
  port: number;
  database: string;
  password: string;
  username: string;
}

export const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_USER: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    GOOGLE_CLIENT_ID: joi.string().required(),
    GOOGLE_SECRET: joi.string().required(),
    CLOUD_NAME: joi.string().required(),
    CLOUDINARY_SECRET: joi.string().required(),
    CLOUDINARY_KEY: joi.string().required(),
    NAT_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NAT_SERVERS: process.env.NAT_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs: EnvsSchema = {
  PORT: value.PORT,
  database: {
    host: value.DB_HOST,
    port: value.DB_PORT,
    database: value.DB_NAME,
    username: value.DB_USER,
    password: value.DB_PASSWORD,
  },

  NAT_SERVERS: value.NAT_SERVERS,
  JWT_SECRET: value.JWT_SECRET,
  GOOGLE_CLIENT_ID: value.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET: value.GOOGLE_SECRET,
  CLOUD_NAME: value.CLOUD_NAME,
  CLOUDINARY_SECRET: value.CLOUDINARY_SECRET,
  CLOUDINARY_KEY: value.CLOUDINARY_KEY,
};
