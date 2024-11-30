import { defineEventHandler, readBody } from 'h3'
import mysql from 'mysql2/promise'

export default defineEventHandler(async (req) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });

        const body = await readBody(req);
        console.log(body.nodeIp, body);

        if (body) {
            const { nodeIp, dbPort, dbUsername, dbPassword, backupDbName, discordId, serverName } = body;

            if (!nodeIp || !dbPort || !dbUsername || !dbPassword || !backupDbName || !discordId || !serverName) {
                return {
                    success: false,
                    message: JSON.stringify({ error: 'All fields are required' })
                };
            }

            const query = `
            INSERT INTO remote_servers (node_ip, db_port, db_username, db_password, backup_db_name, discord_id, server_name)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            await connection.execute(query, [nodeIp, dbPort, dbUsername, dbPassword, backupDbName, discordId, serverName]);
            return {
                success: true,
            };
        }
    } catch (error) {
        return {
            success: false,
            message: JSON.stringify({ error: error.message })
        };
    }
});