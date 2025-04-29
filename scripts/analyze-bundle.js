const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Install required packages if not already installed
try {
  execSync('bun add -D next-bundle-analyzer', { stdio: 'inherit' });
  console.log('✅ next-bundle-analyzer installed');
} catch (error) {
  console.error('Failed to install next-bundle-analyzer:', error);
  process.exit(1);
}

// Update next.config.mjs to include bundle analyzer
const nextConfigPath = path.join(process.cwd(), 'next.config.mjs');
let nextConfig = fs.readFileSync(nextConfigPath, 'utf8');

if (!nextConfig.includes('withBundleAnalyzer')) {
  const withBundleAnalyzerImport = `import withBundleAnalyzer from 'next-bundle-analyzer';\n`;
  
  // Find the import section and add our import
  if (nextConfig.includes('import')) {
    nextConfig = nextConfig.replace(/import .+?;/, match => `${match}\n${withBundleAnalyzerImport}`);
  } else {
    nextConfig = withBundleAnalyzerImport + nextConfig;
  }
  
  // Wrap the config with withBundleAnalyzer
  nextConfig = nextConfig.replace(
    /export default .+?;/s,
    match => `export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(${match.replace('export default ', '')});`
  );
  
  fs.writeFileSync(nextConfigPath, nextConfig);
  console.log('✅ next.config.mjs updated with bundle analyzer');
}

// Create npm script for analyzing
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

if (!packageJson.scripts.analyze) {
  packageJson.scripts.analyze = 'ANALYZE=true bun run build';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Added "analyze" script to package.json');
}

console.log('\n🔍 Bundle analysis setup complete!');
console.log('Run "bun run analyze" to generate bundle analysis reports');
console.log('\nRecommendations for reducing bundle size:');
console.log('1. Use dynamic imports for large components that aren\'t needed immediately');
console.log('2. Implement code splitting with React.lazy() and Suspense');
console.log('3. Consider using smaller alternative libraries');
console.log('4. Remove unused dependencies and code');