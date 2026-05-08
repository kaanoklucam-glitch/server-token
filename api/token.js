export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { shop, client_id, client_secret, code } = req.body;

  if (!shop || !client_id || !client_secret || !code) {
    return res.status(400).json({ error: 'Eksik parametre: shop, client_id, client_secret, code gerekli.' });
  }

  const cleanShop = shop.replace(/^https?:\/\//, '');
  const tokenUrl = `https://${cleanShop}/admin/oauth/access_token`;

  const params = new URLSearchParams({ client_id, client_secret, code });

  const shopifyRes = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await shopifyRes.json();
  return res.status(shopifyRes.status).json(data);
}
