const fs = require('fs');
const path = require('path');
const envPath = path.join(process.cwd(), '.env.local');
if(!fs.existsSync(envPath)){
  const example = `# Core API & Desking bases
COREAPI_BASE=https://devhubapi.gma.to/api
EMBED_BASE=https://devhub.gma.to/desking-embed
`;
  fs.writeFileSync(envPath, example);
  console.log('Created .env.local with defaults.');
}
