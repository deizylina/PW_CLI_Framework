/*
Create a new file named dbClient.ts in the existing folder utils.

Use the existing mysql2 and dotenv dependencies.

Import:

mysql from mysql2/promise
dotenv from dotenv
Call:

dotenv.config()

Create and export exactly one asynchronous function:

executeQuery(sql: string, params?: any[])

The function must:

Create a MySQL connection using mysql.createConnection().
Read the following connection details from environment variables:
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
Convert DB_PORT to a number when it is available. If it is not available, use undefined.
Execute the SQL statement using connection.execute(sql, params).
Store the returned result.
Close the database connection using await connection.end().
Return the query result.
Use a single database connection for each executeQuery() call.

Do not implement connection pooling.

Do not add transactions, retry logic, logging, custom error handling, validation, classes, interfaces, types, additional functions, or additional database functionality.

Expected Result
A utils/dbClient.ts file exporting an executeQuery() function that runs a parameterized SQL query against the configured MySQL database and returns the result.
*/

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function executeQuery(sql: string, params?: any[]) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    const [result] = await connection.execute(sql, params);
    await connection.end();
    return result;
}
