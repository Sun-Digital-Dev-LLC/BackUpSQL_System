import { defineEventHandler, readBody } from 'h3'
import mysql from 'mysql2/promise'

export default defineEventHandler(async (req) => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });

    const body = await readBody(req);

    const [rows] = await connection.execute('SELECT * FROM admin_users WHERE discord_id = ?', [body.discordId]);

    if (rows.length > 0) {
        return {
            role: 'admin'
        }
    } else {
        return {
            role: 'guest'
        }
    }
});
