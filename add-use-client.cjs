const fs = require('fs');
const path = require('path');

const files = [
  'components/AnalyticsPreference.tsx', 
  'components/ErrorBoundary.tsx', 
  'components/ThemeContext.tsx', 
  'components/SiteChrome.tsx', 
  'components/DashboardLayout.tsx', 
  'components/ContentBlocks.tsx',
  'components/trpc-provider.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if(fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if(!content.includes('"use client"')) {
      fs.writeFileSync(filePath, '"use client";\n\n' + content);
    }
  }
});
