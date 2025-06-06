import { db } from '../../../lib/db/firebaseAdmin'; // Admin SDK Firestore

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const configDoc = await db.collection('ia_configs').doc(userId).get();

    if (!configDoc.exists) {
      return res.status(404).json({ error: 'Config not found' });
    }

    const config = configDoc.data();
    const widgetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/widget/script.js?userId=${userId}`;
    const embedCode = `<script src="${widgetUrl}" defer></script>`;

    return res.status(200).json({
      widgetUrl,
      embedCode,
      config,
    });
  } catch (error) {
    console.error('Widget generation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}