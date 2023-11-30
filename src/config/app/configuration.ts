import { registerAs } from '@nestjs/config';
import * as process from 'process';

/* Please note that the name 'app' needs to be unique for each configuration.
 * So, for something like mail, you could use 'mail' or 'mongo' for your mongoDB database.
 */
export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
  saltOrRounds: process.env.JWT_SALT,
  jwtSecret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
  jwtExpTime: process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME,
  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: process.env.POSTGRES_PORT,
  postgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresDatabase: process.env.POSTGRES_DATABASE,
  postgresPost: process.env.PORT,
  postgresMode: process.env.MODE,
  postgresRunMigration: process.env.RUN_MIGRATIONS,
  algorithmEncryptCode: process.env.ALGORITHM_ENCRYPT_CODE,
  algorithmKey: process.env.ALGORITHM_KEY,
}));
