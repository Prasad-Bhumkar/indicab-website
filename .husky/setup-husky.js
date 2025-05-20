#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper function to execute commands
function exec(command) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error executing: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Create .husky directory if it doesn't exist
const huskyDir = path.join(process.cwd(), '.husky');
if (!fs.existsSync(huskyDir)) {
  fs.mkdirSync(huskyDir, { recursive: true });
}

// Install husky
console.log('Installing husky...');
exec('npm install husky --save-dev');

// Initialize husky
console.log('Initializing husky...');
exec('npx husky install');

// Define hook content
const preCommitContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Checking code quality before commit..."

# Run lint-staged for staged files
npx lint-staged

# Type checking
echo "📋 Running type check..."
npm run type-check || { echo "❌ Type check failed"; exit 1; }

# Run quick tests
echo "🧪 Running tests..."
npm run test || { echo "❌ Tests failed"; exit 1; }

echo "✅ Code quality checks passed!"
`;

const prePushContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running comprehensive checks before push..."

# Run more thorough tests
echo "🧪 Running all tests..."
npm run test:all || { echo "❌ All tests failed"; exit 1; }

# Run build to verify
echo "🏗️ Verifying build..."
npm run build || { echo "❌ Build failed"; exit 1; }

# Run security checks
echo "🔒 Running security checks..."
npm audit --audit-level=high || echo "⚠️ Security vulnerabilities found - review required"

echo "✅ Comprehensive checks passed!"
`;

const postMergeContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Check if package.json was changed in the merge
if git diff HEAD@{1} --name-only | grep -q "package.json"; then
  echo "📦 package.json changed, checking for updates..."
  npm install
  echo "✅ Dependencies updated"
fi
`;

// Write hook files
console.log('Creating hook files...');
fs.writeFileSync(path.join(huskyDir, 'pre-commit'), preCommitContent);
fs.writeFileSync(path.join(huskyDir, 'pre-push'), prePushContent);
fs.writeFileSync(path.join(huskyDir, 'post-merge'), postMergeContent);

// Make hooks executable on non-Windows platforms
if (process.platform !== 'win32') {
  console.log('Making hooks executable...');
  exec('chmod +x .husky/pre-commit');
  exec('chmod +x .husky/pre-push');
  exec('chmod +x .husky/post-merge');
}

console.log('✅ Husky hooks have been set up successfully!'); 