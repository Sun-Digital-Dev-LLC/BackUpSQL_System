import mysql from 'mysql2/promise'

export default async function viewAllNode() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute('SELECT * FROM remote_servers');
    connection.end();
    // console.log(rows);
    return rows;
}