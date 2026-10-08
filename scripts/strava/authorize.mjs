// One-time setup: prints a Strava refresh token with scope read,activity:read.
// 1. Create an app at https://www.strava.com/settings/api with
//    "Authorization Callback Domain" = localhost
// 2. STRAVA_CLIENT_ID=... STRAVA_CLIENT_SECRET=... node scripts/strava/authorize.mjs
// 3. Open the printed URL, approve, paste the printed token into the GitHub secret
//    STRAVA_REFRESH_TOKEN. Nothing is written to disk.

import { createServer } from 'node:http';

const PORT = 8721;
const REDIRECT = `http://localhost:${PORT}/callback`;
const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;
if (!clientId || !clientSecret) {
  console.error('Set STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET first.');
  process.exit(1);
}

const authUrl = new URL('https://www.strava.com/oauth/authorize');
authUrl.search = new URLSearchParams({
  client_id: clientId,
  redirect_uri: REDIRECT,
  response_type: 'code',
  approval_prompt: 'force',
  scope: 'read,activity:read',
}).toString();

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', REDIRECT);
  if (url.pathname !== '/callback') {
    res.writeHead(404).end();
    return;
  }
  const code = url.searchParams.get('code');
  if (!code) {
    res.writeHead(400).end('Missing code (authorization denied?).');
    console.error('Authorization denied or missing code.');
    server.close();
    return;
  }
  try {
    const tokenRes = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
      }),
    });
    const token = await tokenRes.json();
    if (!tokenRes.ok) throw new Error(JSON.stringify(token));
    res
      .writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
      .end('OK, back to the terminal.');
    console.log(`\nGranted scope: ${url.searchParams.get('scope')}`);
    console.log(`STRAVA_REFRESH_TOKEN=${token.refresh_token}\n`);
  } catch (err) {
    res.writeHead(500).end('Token exchange failed, see terminal.');
    console.error(err);
  } finally {
    server.close();
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Open this URL and approve:\n\n${authUrl}\n`);
});
