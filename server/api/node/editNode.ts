import { defineEventHandler, readBody } from 'h3'
import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
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

    // 构建 UPDATE 语句
    const fields = Object.keys(body).filter(key => key !== 'id')
    if (fields.length === 0) {
      return {
        success: false,
        message: 'No fields to update'
      }
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ')
    const values = fields.map(field => body[field])
    values.push(body.id) // 添加 WHERE 子句的值

    const query = `UPDATE remote_servers SET ${setClause} WHERE id = ?`
    
    await connection.execute(query, values)
    connection.end()

    return {
      success: true,
      message: 'Node updated successfully'
    }
  } catch (error) {
    console.error('Error updating node:', error)
    return {
      success: false,
      message: 'Failed to update node'
    }
  }
})