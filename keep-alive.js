const https = require('https');
const http = require('http');

function pingService() {
  const url = process.env.RENDER_EXTERNAL_URL || process.env.WEBHOOK_URL;
  if (!url) {
    console.log('No URL available for keep-alive');
    return;
  }

  const protocol = url.startsWith('https') ? https : http;
  
  protocol.get(`${url}/healthz`, (res) => {
    console.log(`Keep-alive ping successful: ${res.statusCode}`);
  }).on('error', (err) => {
    console.log('Keep-alive ping failed:', err.message);
  });
}

// Ping every 5 minutes (300000 ms)
setInterval(pingService, 300000);

// Initial ping after 30 seconds
setTimeout(pingService, 30000);

console.log('Keep-alive service started');
