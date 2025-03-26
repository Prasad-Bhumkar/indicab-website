#!/usr/bin/env node

/**
 * Legacy Component Identifier
 *
 * This script scans the project to identify all legacy components
 * and generates a migration tracking markdown file.
 */

const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Directories to scan
const LEGACY_COMPONENT_DIRS = [
  path.join(__dirname, '..', 'src', 'legacy-components'),
  path.join(__dirname, '..', 'src', 'legacy-pages'),
];

// CSS directories to scan
const CSS_DIRS = [
  path.join(__dirname, '..', 'src', 'styles')
];

const OUTPUT_FILE = process.argv[2] || path.join(__dirname, '..', 'MIGRATION_TRACKING.md');

/**
 * Recursively scans directories for files with specified extensions
 */
async function scanDirectory(dir, extensions) {
  const files = [];

  async function scan(directory) {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }

  await scan(dir);
  return files;
}

/**
 * Extract component name from file path
 */
function getComponentName(filePath) {
  const baseName = path.basename(filePath, path.extname(filePath));
  return baseName;
}

/**
 * Extract component type based on directory
 */
function getComponentType(filePath) {
  if (filePath.includes('legacy-components')) {
    return 'Component';
  } else if (filePath.includes('legacy-pages')) {
    return 'Page';
  } else if (filePath.includes('admin')) {
    return 'Admin Component';
  } else {
    return 'Unknown';
  }
}

/**
 * Analyze component to get complexity and dependencies
 */
async function analyzeComponent(filePath) {
  try {
    let content;
    try {
        content = await readFile(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading file ${filePath}: ${error.message}`);
        return {
            linesOfCode: 0,
            cssImports: [],
            hasState: false,
            hasEffects: false,
            usesRouter: false,
            complexity: 'Unknown'
        };
    }

    // Count lines of code
    const lines = content.split('\n').length;

    // Check for CSS imports
    const cssImports = (content.match(/import ['"]\.\.\/styles\/[^'"]+\.css['"]/g) || []).map(
      importStr => importStr.match(/\.\.\/styles\/([^'"]+)\.css/)[1]
    );

    // Check for useState/useEffect hooks (indicating complexity)
    const hasState = content.includes('useState');
    const hasEffects = content.includes('useEffect');

    // Check for React Router dependencies
    const usesRouter = content.includes('useNavigate') ||
                      content.includes('useLocation') ||
                      content.includes('useParams') ||
                      content.includes('Link');

    // Simple complexity score
    let complexity = 'Low';
    if (lines > 200 || (hasState && hasEffects && usesRouter)) {
      complexity = 'High';
    } else if (lines > 100 || hasState || hasEffects) {
      complexity = 'Medium';
    }

    return {
      linesOfCode: lines,
      cssImports,
      hasState,
      hasEffects,
      usesRouter,
      complexity
    };
  } catch (error) {
    console.error(`Error analyzing ${filePath}: ${error.message}`);
    return {
      linesOfCode: 0,
      cssImports: [],
      hasState: false,
      hasEffects: false,
      usesRouter: false,
      complexity: 'Unknown'
    };
  }
}

/**
 * Get all CSS files and their line counts
 */
async function getCssFiles() {
  const cssFiles = [];

  for (const dir of CSS_DIRS) {
    const files = await scanDirectory(dir, ['.css']);

    for (const file of files) {
      const content = await readFile(file, 'utf8');
      const lines = content.split('\n').length;
      const name = path.basename(file, '.css');

      cssFiles.push({
        path: file,
        name,
        lines
      });
    }
  }

  return cssFiles;
}

/**
 * Generate markdown report
 */
async function generateReport(components, cssFiles) {
  let markdown = `# IndiCab Migration Tracking\n\n`;
  markdown += `_Generated on ${new Date().toLocaleString()}_\n\n`;

  markdown += `## Legacy Components to Migrate\n\n`;
  markdown += `| Component | Type | Complexity | Lines | CSS Dependencies | React Router | Status |\n`;
  markdown += `|-----------|------|------------|-------|-----------------|-------------|--------|\n`;

  for (const component of components) {
    const cssDepsList = component.analysis.cssImports.length > 0
      ? component.analysis.cssImports.join(', ')
      : '-';

    const routerStatus = component.analysis.usesRouter ? '✓' : '-';

    markdown += `| ${component.name} | ${component.type} | ${component.analysis.complexity} | ${component.analysis.linesOfCode} | ${cssDepsList} | ${routerStatus} | ⏳ Pending |\n`;
  }

  markdown += `\n## CSS Files to Migrate to Tailwind\n\n`;
  markdown += `| CSS File | Lines | Status |\n`;
  markdown += `|----------|-------|--------|\n`;

  for (const css of cssFiles) {
    markdown += `| ${css.name}.css | ${css.lines} | ⏳ Pending |\n`;
  }

  markdown += `\n## Migration Process\n\n`;
  markdown += `1. For each component, create a new file in the appropriate location.\n`;
  markdown += `2. Follow the migration guide in MIGRATION_GUIDE.md\n`;
  markdown += `3. Update this file with the component's status as you progress\n`;
  markdown += `4. Mark components as:\n`;
  markdown += `   - ⏳ Pending: Not started\n`;
  markdown += `   - 🔄 In Progress: Currently being migrated\n`;
  markdown += `   - ✅ Completed: Fully migrated\n`;
  markdown += `   - ❌ Blocked: Cannot be migrated yet due to dependencies\n\n`;

  markdown += `## Migration Progress\n\n`;
  markdown += `- Total Components: ${components.length}\n`;
  markdown += `- Completed: 0\n`;
  markdown += `- In Progress: 0\n`;
  markdown += `- Pending: ${components.length}\n`;
  markdown += `- Blocked: 0\n\n`;

  markdown += `- Total CSS Files: ${cssFiles.length}\n`;
  markdown += `- CSS Files Migrated: 0\n\n`;

  markdown += `## Components Migration Order Recommendation\n\n`;
  markdown += `Based on complexity and dependencies, here's a recommended order for migration:\n\n`;

  // Sort components by complexity (Low to High)
  const sortedComponents = [...components].sort((a, b) => {
    const complexityOrder = { 'Low': 1, 'Medium': 2, 'High': 3, 'Unknown': 4 };
    return complexityOrder[a.analysis.complexity] - complexityOrder[b.analysis.complexity];
  });

  markdown += `1. Start with these low-complexity components:\n`;
  const lowComplexity = sortedComponents.filter(c => c.analysis.complexity === 'Low');
  lowComplexity.forEach((c, i) => {
    markdown += `   ${i + 1}. ${c.name} (${c.type})\n`;
  });

  markdown += `\n2. Then proceed with medium-complexity components:\n`;
  const mediumComplexity = sortedComponents.filter(c => c.analysis.complexity === 'Medium');
  mediumComplexity.forEach((c, i) => {
    markdown += `   ${i + 1}. ${c.name} (${c.type})\n`;
  });

  markdown += `\n3. Finally tackle high-complexity components:\n`;
  const highComplexity = sortedComponents.filter(c => c.analysis.complexity === 'High');
  highComplexity.forEach((c, i) => {
    markdown += `   ${i + 1}. ${c.name} (${c.type})\n`;
  });

  return markdown;
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Scanning for legacy components in directories:', LEGACY_COMPONENT_DIRS);

    const componentFiles = await Promise.all(LEGACY_COMPONENT_DIRS.map(async (dir) => {
      return await scanDirectory(dir, ['.tsx', '.jsx', '.js']);
    }));
    const flattenedComponentFiles = componentFiles.flat();

    console.log(`Found ${flattenedComponentFiles.length} legacy component files.`);

    const components = [];
    for (const file of flattenedComponentFiles) {
      const name = getComponentName(file);
      const type = getComponentType(file);
      const analysis = await analyzeComponent(file);

      components.push({
        path: file,
        name,
        type,
        analysis
      });
    }

    console.log('Scanning for CSS files...');
    const cssFiles = await getCssFiles();
    console.log(`Found ${cssFiles.length} CSS files.`);

    console.log('Generating migration tracking report...');
    const report = await generateReport(components, cssFiles);

    await writeFile(OUTPUT_FILE, report, 'utf8');
    console.log(`Migration tracking report generated at ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
