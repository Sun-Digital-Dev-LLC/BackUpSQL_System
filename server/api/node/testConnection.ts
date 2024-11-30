import { defineEventHandler, readBody } from 'h3'
import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log('Received connection data:', body)  // 用來確認是否收到資料
    
    // 建立資料庫連線
    const connection = await mysql.createConnection({
      host: body.nodeIp,
      port: body.dbPort,
      user: body.dbUsername,
      password: body.dbPassword,
      database: body.backupDbName
    });

    // 測試連線
    await connection.connect();
      
    // 執行一個簡單的查詢來確認連線
    await connection.query('SELECT 1');

    await connection.end();
    
    return {
      success: true,
      message: '資料庫連線成功'
    }
  } catch (error) {
    return {
      success: false,
      message: `資料庫連線失敗: ${error.message}`
    }
  }
})