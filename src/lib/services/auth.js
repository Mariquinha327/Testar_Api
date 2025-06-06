import { db } from '../db/firebaseAdmin'; // Firebase Admin SDK
import { pool } from '../db/mysql'; // MySQL
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

function validateUserData(email, password, role) {
  if (!email || !password) {
    throw new Error('Email e senha são obrigatórios.');
  }
  if (!['admin', 'client'].includes(role)) {
    throw new Error('Tipo de usuário inválido.');
  }
}

export async function registerUser(email, password, role = 'client') {
  try {
    if (!pool) {
      throw new Error('Pool de conexão MySQL não inicializado');
    }

    validateUserData(email, password, role);

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = Date.now().toString();

    // 1. Salva no Firestore
    await db.collection('users').doc(userId).set({
      id: userId,
      email,
      password: hashedPassword,
      role,
      created_at: new Date().toISOString(),
    });

    // 2. Salva no MySQL
    await pool.query(
      'INSERT INTO users (id, email, password, role, created_at) VALUES (?, ?, ?, ?, ?)',
      [userId, email, hashedPassword, role, new Date()]
    );

    // ✅ Retorna também o ID
    return {
      success: true,
      message: 'Usuário registrado com sucesso.',
      id: userId
    };
  } catch (error) {
    console.error('Erro no registro:', error);
    throw new Error(`Falha no registro: ${error.message}`);
  }
}
//1748971955502