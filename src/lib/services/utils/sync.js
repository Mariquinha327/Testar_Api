import { pool } from '../db/mysql';
import { format } from 'date-fns';

/**
 * Formata datas para o MySQL
 */
function formatDateForMySQL(date) {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
}

export async function syncToMySQL(table, id, data) {
  try {
    // Prepara os dados, convertendo datas quando necessário
    const processedData = { ...data };
    
    // Converte campos de data para formato MySQL
    Object.keys(processedData).forEach(key => {
      if (processedData[key] instanceof Date) {
        processedData[key] = formatDateForMySQL(processedData[key]);
      }
    });

    const columns = Object.keys(processedData).join(', ');
    const values = Object.values(processedData);
    const placeholders = values.map(() => '?').join(', ');

    const [result] = await pool.query(
      `INSERT INTO ${table} (${columns}) VALUES (${placeholders})
       ON DUPLICATE KEY UPDATE ${Object.keys(processedData)
         .map(key => `${key} = VALUES(${key})`)
         .join(', ')}`,
      values
    );

    return result;
  } catch (error) {
    console.error(`MySQL sync error for ${table}:`, error);
    throw error;
  }
}