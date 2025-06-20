import { customizeIA } from '../../../lib/services/ia';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, ...config } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    await customizeIA(userId, config);

    // Retorna os dados inseridos
    return res.status(200).json({
      success: true,
      data: {
        userId,
        ...config,
        updated_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Customization error:', error);
    return res.status(500).json({ error: error.message });
  }
}