// import "reflect-metadata"
// import { DataSource } from "typeorm"

// export const AppDataSource = new DataSource({
//     type: "mysql",
//     host: "127.0.0.1",
//     port: 3306,
//     username: "root",
//     password: "123456",
//     database: "social_media",
//     synchronize: true,
//     entities: ["dist/src/entity/*.js"],
//     extra: {
//         "charset": "utf8mb4_unicode_ci"
//     }
// })

import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql", 
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: ["dist/src/entity/*.js"],
    extra: {
        charset: "utf8mb4_unicode_ci"
    }
});

