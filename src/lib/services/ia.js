import cohere from 'cohere-ai';
import { db } from '../db/firebaseAdmin';
import { pool } from '../db/mysql';

// Configure a chave da API da Cohere
cohere.apiKey = process.env.COHERE_API_KEY;

export async function customizeIA(userId, config) {
  try {
    const personalities = ['profissional', 'amigável', 'divertido', 'neutro'];
    if (!personalities.includes(config.personality)) {
      throw new Error ('Personalidade inválida');
    }

    const updatedAt = new Date().toISOString();

    // Atualiza no Firebase
    await db.collection ('ia_configs').doc(userId).set({
      ...config,
      updated_at: updatedAt
    }, { merge: true });

    // Atualiza também no MySQL
    const sql = `
      INSERT INTO ia_configs (id, user_id, personality, theme, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        personality = VALUES(personality),
        theme = VALUES(theme),
        updated_at = VALUES(updated_at)
    `;

    await pool.query(sql, [
      userId,
      userId,
      config.personality,
      config.theme || null,
      updatedAt
    ]);

    return { success: true };
  } catch (error) {
    console.error('IA customization error:', error);
    throw error;
  }
}

export async function generateResponse(userId, message) {
  try {
    const docRef = db.collection('ia_configs').doc(userId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new Error('Configuração de IA não encontrada');
    }

    const config = docSnap.data();

    const prompt = `Você é um assistente com personalidade ${config.personality}. Responda a seguinte mensagem: ${message}`;

    const response = await cohere.generate({
      model: 'command',
      prompt,
      max_tokens: 100,
      temperature: 0.7
    });

    return response.body.generations[0].text;
  } catch (error) {
    console.error('Cohere error:', error);
    throw error;
  }
}