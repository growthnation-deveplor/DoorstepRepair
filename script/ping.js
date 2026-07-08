import https from 'https';

const targetUrl = process.env.PING_URL || 'https://devicesdoctor.in/ping';
const intervalMs = Number(process.env.PING_INTERVAL_MS || 14 * 60 * 1000);

function ping() {
  const start = Date.now();
  https.get(targetUrl, (res) => {
    const duration = Date.now() - start;
    console.log(`Ping ok: ${res.statusCode} in ${duration}ms`);
    res.resume();
  }).on('error', (err) => {
    console.error('Ping failed:', err.message);
  });
}

ping();
setInterval(ping, intervalMs);
