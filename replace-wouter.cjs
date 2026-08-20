const fs = require('fs');
const path = require('path');

const files = [
  'client/src/pages/Work.tsx',
  'client/src/pages/Services.tsx',
  'client/src/pages/ProjectRequest.tsx',
  'client/src/pages/Home.tsx',
  'client/src/pages/Contact.tsx',
  'client/src/pages/About.tsx',
  'client/src/pages/ServiceDetail.tsx',
  'components/ContentBlocks.tsx',
  'components/DashboardLayout.tsx',
  'client/src/pages/NotFound.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/import \{ Link \} from "wouter";/g, 'import Link from "next/link";');
    content = content.replace(/import \{ Link, useRoute \} from "wouter";/g, 'import Link from "next/link";\nimport { useParams } from "next/navigation";');
    content = content.replace(/import \{ useLocation \} from "wouter";/g, 'import { usePathname } from "next/navigation";');
    content = content.replace(/const \[location\] = useLocation\(\);/g, 'const location = usePathname();');
    fs.writeFileSync(filePath, content);
  }
});
