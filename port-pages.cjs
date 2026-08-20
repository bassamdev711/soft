const fs = require('fs');
const path = require('path');

const routeMap = {
  'Home.tsx': 'page.tsx',
  'About.tsx': 'about/page.tsx',
  'Services.tsx': 'services/page.tsx',
  'ServiceDetail.tsx': 'services/[slug]/page.tsx',
  'Work.tsx': 'work/page.tsx',
  'FAQ.tsx': 'faq/page.tsx',
  'Contact.tsx': 'contact/page.tsx',
  'ProjectRequest.tsx': 'request/page.tsx',
  'Admin.tsx': 'admin/page.tsx',
  'AdminContent.tsx': 'admin/content/page.tsx',
  'NotFound.tsx': 'not-found.tsx'
};

Object.entries(routeMap).forEach(([srcFile, destRoute]) => {
  const srcPath = path.join(__dirname, 'client/src/pages', srcFile);
  const destPath = path.join(__dirname, 'app', destRoute);
  
  if (fs.existsSync(srcPath)) {
    // Ensure dest dir exists
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    let content = fs.readFileSync(srcPath, 'utf8');
    // Prepend "use client" if not present
    if (!content.includes('"use client"')) {
      content = '"use client";\n\n' + content;
    }
    
    // Fix imports if necessary (e.g. @/components to ../components)
    // Actually the tsconfig paths usually handle `@/` alias, but Next.js tsconfig paths might need adjusting.
    // Let's rely on tsconfig aliases.
    
    fs.writeFileSync(destPath, content);
    console.log(`Moved ${srcFile} to ${destRoute}`);
  }
});
