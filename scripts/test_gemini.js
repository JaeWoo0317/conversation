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

console.log('🔑 Found API Key:', apiKey.substring(0, 5) + '...');

const prompt = "Say 'Hello, World!' in JSON format.";

const data = JSON.stringify({
  contents: [{
    parts: [{ text: prompt }]
  }],
  generationConfig: {
    response_mime_type: "application/json"
  }
});

const options = {
  hostname: 'generativelanguage.googleapis.com',
  path: `/v1beta/models?key=${apiKey}`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

console.log('📡 Listing available models...');

const req = https.request(options, (res) => {
  let body = '';

  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ API Call Successful!');
      const data = JSON.parse(body);
      const names = data.models.map(m => m.name).join('\n');
      require('fs').writeFileSync('models.txt', names);
      console.log('✅ Models saved to models.txt');
    } else {
      console.error(`❌ API Call Failed with Status: ${res.statusCode}`);
      console.error('Response:', body);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Network Error:', error);
});

req.end();
