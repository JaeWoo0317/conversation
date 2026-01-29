const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

// Load env
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/OPENAI_API_KEY=(.+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

if (!apiKey) {
  console.error('❌ Error: OPENAI_API_KEY not found in .env.local');
  process.exit(1);
}

console.log('🔑 Found API Key:', apiKey.substring(0, 8) + '...');

const client = new OpenAI({ apiKey: apiKey });

async function testConnection() {
  try {
    console.log('📡 Sending request to OpenAI API (gpt-4o)...');
    
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "user", content: "Say 'Hello, OpenAI!' in JSON format: {\"message\": \"...\"}" }
      ],
      response_format: { type: "json_object" }
    });

    console.log('✅ API Call Successful!');
    console.log('Response:', completion.choices[0].message.content);
  } catch (error) {
    console.error('❌ API Call Failed!');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error('Error Type:', error.type);
  }
}

testConnection();
