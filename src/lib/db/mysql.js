import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'ai_widget_db',
  port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000 // aumentei para 10 segundos
});

// Testa conexão e cria tabelas, se necessário
async function initDB() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexão com o MySQL estabelecida!');
    connection.release();

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'client') NOT NULL,
        created_at DATETIME NOT NULL
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS ia_configs (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        personality VARCHAR(50) DEFAULT 'neutral',
        greeting_message TEXT,
        color_scheme VARCHAR(50) DEFAULT '#3b82f6',
        widget_position VARCHAR(50) DEFAULT 'bottom-right',
        updated_at DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    console.log('✅ Tabelas criadas/verificadas com sucesso');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MySQL:', error.message);
    throw error;
  }
}

// Executa ao carregar
initDB();

export { pool };