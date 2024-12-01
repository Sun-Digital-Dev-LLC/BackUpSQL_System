import { defineEventHandler, readBody, sendStream } from "h3";
import { createReadStream } from "fs";
import path from "path";
import mysql from "mysql2/promise";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("Download file body:", body.fileName);
  if (!body.server.id || !body.server.name || !body.fileName) {
    return {
      success: false,
      message: "Missing required parameters",
    };
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  try {
    // 驗證伺服器資訊
    const [rows] = await connection.execute(
      "SELECT server_name FROM remote_servers WHERE id = ? AND server_name = ?",
      [body.server.id, body.server.name]
    );

    if (rows.length === 0) {
      return {
        success: false,
        message: "Server not found",
      };
    }

    // 構建檔案路徑
    const filePath = path.join(process.cwd(), "BackUpSQL_File", body.server.name, body.fileName);

    // 設置回應標頭 (正式環境請換成"application/gzip", 因為tar.gz 使用)
    event.node.res.setHeader("Content-Type", "application/sql");
    event.node.res.setHeader(
      "Content-Disposition",
      `attachment; filename="${body.fileName}"`
    );

    // 創建檔案讀取流
    const fileStream = createReadStream(filePath);

    // 返回檔案流
    return sendStream(event, fileStream);
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "Error downloading file",
    };
  } finally {
    await connection.end();
  }
});
