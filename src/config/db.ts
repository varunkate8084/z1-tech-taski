// import { drizzle } from "drizzle-orm/node-postgres";
// import { Client } from "pg";
// import * as schema from "../models/schema";

// // export const client = new Client({
// //   host: process.env.HOST,
// //   user: process.env.DBUSER,
// //   password: process.env.PASSWORD,
// //   database: process.env.DATABASE,
// //   port: 5432,
// //   ssl: false,
// // });

// console.log("Postgress URL : ", process.env.PG_URL);
// export let client = new Client(process.env.PG_URL);

// client
//   .connect()
//   .then(() => {
//     console.log("Postgress Client is Connected Successfully");
//   })
//   .catch((err: any) => {
//     console.error("Error connecting DB : ", err);
//   });

// const postgresdb = drizzle(client, { schema: { ...schema } });

// export default postgresdb;

// // Function to disconnect from the PostgreSQL database
// export const disconnectDB = async () => {
//   try {
//     await client.end();
//     console.log("Postgres Client has been disconnected successfully");
//   } catch (err) {
//     console.error("Error disconnecting DB: ", err);
//   }
// };

import mongoose from "mongoose";
import dotenv from "dotenv";
import { envConfigs } from "./envconfig";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(envConfigs.dburl as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;

