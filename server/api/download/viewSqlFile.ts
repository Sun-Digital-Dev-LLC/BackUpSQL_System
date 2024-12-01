import { defineEventHandler, readBody } from "h3";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

export default defineEventHandler(async (req) => {
  const body = await readBody(req);

  if (!body) {
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
    const [rows] = await connection.execute(
      "SELECT server_name, discord_id FROM remote_servers WHERE id = ? AND server_name = ?",
      [body.id, body.name]
    );
    if (rows.length === 0) {
      return {
        success: false,
        message: "Server not found",
      };
    }

    const serverName = rows[0].server_name;
    const backupPath = path.join(process.cwd(), "BackUpSQL_File", serverName);
    // const backupPath = path.join(process.env.BACKUP_BASE_PATH, serverName);  // 正式環境用

    if (!fs.existsSync(backupPath)) {
      return {
        success: false,
        message: "Backup directory not found",
      };
    }

    const files = fs
      .readdirSync(backupPath)
      .filter((file) => file.endsWith(".sql"))
      .map((file) => {
        const filePath = path.join(backupPath, file);
        const stats = fs.statSync(filePath);
        let fileSizeInBytes = stats.size;
        let size = fileSizeInBytes;
        let unit = 'B';

        if (size >= 1000) {
          size /= 1000;
          unit = 'KB';
        }
        if (size >= 1000) {
          size /= 1000;
          unit = 'MB';
        }
        if (size >= 1000) {
          size /= 1000;
          unit = 'GB';
        }

        return {
          name: file,
          size: `${size.toFixed(2)} ${unit}`,
        };
      });

    return {
      success: true,
      data: files,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
      message: "An error occurred while processing your request",
    };
  } finally {
    await connection.end();
  }
});
