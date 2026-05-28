import dotenv from 'dotenv';
import mysql from 'mysql2/promise'; // Importante usar a versão /promise

dotenv.config();


const { MySQLHOST, MySQLPORT, MySQLUSER, MySQLPASSWORD, MySQLDATABASE } = process.env;

const pool = mysql.createPool({
  host: MySQLHOST,
  port: MySQLPORT || 3306, // Porta padrão do MySQL é 3306 se não for especificada no .env
  user: MySQLUSER,
  password: MySQLPASSWORD,
  database: MySQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: false // Caso precise de SSL no futuro, mude para { rejectUnauthorized: false }
});


export const sql = pool;