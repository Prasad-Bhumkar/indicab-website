import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Run tests with coverage
console.log('Running tests with coverage...');
try {
    execSync('bun test --coverage', { stdio: 'inherit' });
} catch (error) {
    console.error('Test run failed:', error);
    process.exit(1);
}

// Parse coverage report
const _coverageDir = path.join(process.cwd(), 'coverage');
const coverageSummaryPath = path.join(_coverageDir, 'coverage-summary.json');

if (!fs.existsSync(coverageSummaryPath)) {
    console.error('Coverage report not found. Make sure tests are running with coverage enabled.');
    process.exit(1);
}

const coverageSummary = JSON.parse(fs.readFileSync(coverageSummaryPath, 'utf8'));

// Identify files with low coverage
const _lowCoverageThreshold = 80; // Files below this percentage are flagged
const lowCoverageFiles: Array<{ file: string; coverage: number }> = [];

Object.entries(coverageSummary).forEach(([file, data]: [string, any]) => {
    if (file === 'total') return;

    // Skip node_modules and test files
    if (file.includes('node_modules') || file.includes('.test.') || file.includes('.spec.')) return;

    const lineCoverage = data.lines.pct;
    if (lineCoverage < _lowCoverageThreshold) {
        lowCoverageFiles.push({
            file: file.replace(process.cwd(), ''),
            coverage: lineCoverage
        });
    }
});

// Sort by coverage (lowest first)
lowCoverageFiles.sort((_a, _b) => _a.coverage - _b.coverage);

// Generate report
console.log('\n📊 Test Coverage Report');
console.log('====================\n');

const totalCoverage = coverageSummary.total.lines.pct;
console.log(`Overall coverage: ${totalCoverage.toFixed(2)}%`);
console.log(`Target coverage: 95%`);
console.log(`Coverage gap: ${Math.max(0, 95 - totalCoverage).toFixed(2)}%\n`);

// Analyze error handling patterns
console.log('\n🔍 Error Handling Analysis');
console.log('=======================\n');

// Function to search for error handling patterns in a file
function analyzeErrorHandling(filePath: string): string[] {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const patterns = [];

        // Check for try/catch blocks - improved regex to catch more patterns
        const tryCatchMatches = content.match(/try\s*{[\s\S]*?}\s*catch\s*\(/g) || [];
        if (tryCatchMatches.length > 0) {
            patterns.push(`try/catch blocks: ${tryCatchMatches.length}`);
        }

        // Check for error logging - expanded to catch more patterns
        if (content.includes('console.error(') ||
            content.includes('logger.error(') ||
            content.includes('Sentry.captureException(') ||
            content.includes('logError(') ||
            content.includes('ErrorHandler.') ||
            content.includes('.withScope(')) {
            patterns.push('error logging');
        }

        // Check for custom error classes - expanded
        if (content.includes('extends Error') ||
            content.includes('new AppError(') ||
            content.includes('new ValidationError(') ||
            content.includes('new AuthenticationError(') ||
            content.includes('new NotFoundError(') ||
            content.includes('createErrorResponse(')) {
            patterns.push('custom error handling');
        }

        // Check for error boundaries - expanded
        if (content.includes('ErrorBoundary') ||
            content.includes('componentDidCatch') ||
            content.includes('getDerivedStateFromError') ||
            content.includes('onError={') ||
            content.includes('fallback={')) {
            patterns.push('React error boundary');
        }

        // Check for API error handling
        if (content.includes('withErrorHandling(') ||
            content.includes('handleZodError(') ||
            content.includes('NextResponse.json(') && content.includes('error')) {
            patterns.push('API error handling');
        }

        return patterns;
    } catch (error) {
        console.error(`Error analyzing file ${filePath}:`, error);
        return ['file read error'];
    }
}

// Find all TypeScript and JavaScript files - improved with better error handling
function findSourceFiles(dir: string, fileList: string[] = []): string[] {
    try {
        const _files = fs.readdirSync(dir);

        _files.forEach(file => {
            try {
                const filePath = path.join(dir, file);
                const _stats = fs.statSync(filePath);

                if (_stats.isDirectory()) {
                    // Skip node_modules and other non-source directories
                    if (!['node_modules', '.next', 'out', 'dist', 'coverage'].includes(file)) {
                        fileList = findSourceFiles(filePath, fileList);
                    }
                } else if (/\.(ts|tsx|js|jsx)$/.test(file) && !file.includes('.test.') && !file.includes('.spec.')) {
                    fileList.push(filePath);
                }
            } catch (_fileError) {
                console.error(`Error processing file ${file}:`, _fileError);
            }
        });
    } catch (_dirError) {
        console.error(`Error reading directory ${dir}:`, _dirError);
    }

    return fileList;
}

// Analyze error handling in source files
const _sourceDir = path.join(process.cwd(), 'src');
const sourceFiles = findSourceFiles(_sourceDir);

const filesWithoutErrorHandling: string[] = [];
const filesWithErrorHandling: Array<{ file: string; patterns: string[] }> = [];

sourceFiles.forEach(file => {
    const patterns = analyzeErrorHandling(file);
    if (patterns.length > 0) {
        filesWithErrorHandling.push({
            file: file.replace(process.cwd(), ''),
            patterns
        });
    } else {
        filesWithoutErrorHandling.push(file.replace(process.cwd(), ''));
    }
});

console.log(`Files with error handling: ${filesWithErrorHandling.length}`);
console.log(`Files without error handling: ${filesWithoutErrorHandling.length}`);

// Display files with error handling
console.log('\nError handling patterns found:');
filesWithErrorHandling.slice(0, 10).forEach(({ file, patterns }) => {
    console.log(`- ${file}: ${patterns.join(', ')}`);
});
if (filesWithErrorHandling.length > 10) {
    console.log(`... and ${filesWithErrorHandling.length - 10} more files`);
}

// Identify potential error handling issues
const errorHandlingIssues = [];

// Check for inconsistent error types
const _errorTypeFiles = sourceFiles.filter(file =>
    analyzeErrorHandling(file).includes('custom error handling')
);
if (_errorTypeFiles.length > 1) {
    errorHandlingIssues.push('Multiple files define custom error types - consider consolidation');
}

// Check for duplicate error boundaries
const _errorBoundaryFiles = sourceFiles.filter(file =>
    analyzeErrorHandling(file).includes('React error boundary')
);
if (_errorBoundaryFiles.length > 1) {
    errorHandlingIssues.push('Multiple error boundary components - consider consolidation');
}

// Check for missing Sentry integration
const _sentryFiles = sourceFiles.filter(file =>
    fs.readFileSync(file, 'utf8').includes('Sentry.captureException')
);
if (_sentryFiles.length < filesWithErrorHandling.length * 0.5) {
    errorHandlingIssues.push('Limited Sentry integration - consider adding to more error handlers');
}

if (errorHandlingIssues.length > 0) {
    console.log('\nPotential error handling issues:');
    errorHandlingIssues.forEach(_issue => {
        console.log(`- ${_issue}`);
    });
}

// Recommendations
console.log('\nRecommendations for error handling:');
console.log('1. Consolidate error types into a single definition');
console.log('2. Standardize error boundary components');
console.log('3. Ensure consistent Sentry integration across all error handlers');
console.log('4. Add error handling to high-risk files without current error handling');

if (lowCoverageFiles.length > 0) {
    console.log('\nFiles with low coverage:');
    console.log('------------------------');
    lowCoverageFiles.forEach(({ file, coverage }) => {
        console.log(`${file}: ${coverage.toFixed(2)}%`);
    });

    console.log('\nRecommendations for test coverage:');
    console.log('1. Focus on testing the files with lowest coverage first');
    console.log('2. Prioritize testing critical business logic');
    console.log('3. Add tests for edge cases and error handling');
} else {
    console.log('✅ All files have good coverage (>80%)');
}

// Create a markdown report
const reportPath = path.join(process.cwd(), 'test-coverage-report.md');
const _reportContent = `# Test Coverage and Error Handling Report

Generated on: ${new Date().toISOString()}

## Coverage Summary
- Overall coverage: ${totalCoverage.toFixed(2)}%
- Target coverage: 95%
- Coverage gap: ${Math.max(0, 95 - totalCoverage).toFixed(2)}%

## Error Handling Analysis
- Files with error handling: ${filesWithErrorHandling.length}
- Files without error handling: ${filesWithoutErrorHandling.length}

### Potential Issues
${errorHandlingIssues.map(_issue => `- ${_issue}`).join('\n')}

### Recommendations
1. Consolidate error types into a single definition
2. Standardize error boundary components
3. Ensure consistent Sentry integration across all error handlers
4. Add error handling to high-risk files without current error handling

## Files Needing Coverage Improvement
${lowCoverageFiles.map(({ file, coverage }) => `- ${file}: ${coverage.toFixed(2)}%`).join('\n')}

## Next Steps
1. Focus on writing tests for the files with lowest coverage
2. Prioritize testing critical business logic
3. Add tests for edge cases and error handling
4. Standardize error handling approach across the application
`;

fs.writeFileSync(reportPath, _reportContent);
console.log(`\nDetailed report saved to: ${reportPath}`);
