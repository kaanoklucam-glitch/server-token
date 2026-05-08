export default function handler(req, res) {
  const { code, shop, hmac, timestamp } = req.query;

  if (!code) {
    return res.status(400).send('code parametresi eksik.');
  }

  const params = new URLSearchParams({ code, shop: shop || '', hmac: hmac || '', timestamp: timestamp || '' });
  return res.redirect(302, `/?${params.toString()}`);
}
