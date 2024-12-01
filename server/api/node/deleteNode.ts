import { defineEventHandler, readBody } from 'h3'
import mysql from 'mysql2/promise'

export default defineEventHandler(async (req) => {
    try {
        const body = await readBody(req)

        // 如果没有ID，返回錯誤
        if (!body.id) {
            return {
                success: false,
                message: 'Missing ID'
            }
        }

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        })

        const query = 'DELETE FROM remote_servers WHERE id = ?'
        await connection.execute(query, [body.id])
        
        await connection.end()

        return {
            success: true,
            message: 'Node deleted successfully'
        }
    } catch (error) {
        console.error('Error deleting node:', error)
        return {
            success: false,
            message: 'Failed to delete node'
        }
    }
});