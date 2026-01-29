const fs = require('fs');
const path = require('path');
const https = require('https');

// Load env
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/GEMINI_API_KEY=(.+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

if (!apiKey) {
  console.error('❌ Error: GEMINI_API_KEY not found in .env.local');
  process.exit(1);
}

const prompt = "Say 'Hello, Gemini 2.5 Flash!'";

const data = JSON.stringify({
  contents: [{
    parts: [{ text: prompt }]
  }]
});

const options = {
  hostname: 'generativelanguage.googleapis.com',
  path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('📡 Sending request to Gemini 2.5 Flash...');

const req = https.request(options, (res) => {
  let body = '';

  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ API Call Successful!');
      console.log('Response:', body);
    } else {
      console.error(`❌ API Call Failed with Status: ${res.statusCode}`);
      console.error('Response:', body);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Network Error:', error);
});

req.write(data);
req.end();
