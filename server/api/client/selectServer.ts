import { defineEventHandler, readBody } from 'h3'
import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    if (!body.id) {
        return {
            success: false,
            message: 'SelectServer Missing id'
        }
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    })

    try {
        const [rows] = await connection.execute(`SELECT id, server_name as name FROM remote_servers WHERE discord_id = ? ORDER BY id ASC`, [body.id])

        const formattedData = rows.map((row, index) => ({
            id: row.id,
            name: row.name
        }))
        
        return {
            success: true,
            data: formattedData
        }

    } catch (error) {
        console.error('Database error:', error)
        return {
            success: false,
            message: 'Database error occurred'
        }
    } finally {
        await connection.end()
    }
});