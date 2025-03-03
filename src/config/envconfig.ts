import * as dotenv from "dotenv";
dotenv.config();
import { z } from "zod";

const envVarsSchema = z.object({
  PORT: z.string().default("8008").transform((str) => parseInt(str, 10)),  
  DB_URL: z.string(),
  JWT_SECRET: z.string(),
  TOKEN_EXPIRE:z.string(),
  apiKey:z.string()
});

const envVars = envVarsSchema.parse(process.env);
export const envConfigs = {
  port: envVars.PORT || 8080,
  dburl:envVars.DB_URL,
  jwtsecret:envVars.JWT_SECRET,
  tokenexpire:envVars.TOKEN_EXPIRE,
  apiKey:envVars.apiKey
};

