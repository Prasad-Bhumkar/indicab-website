#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { analyzeBundleSize, analyzeCoverage, analyzeLegacyComponents } from './project-analysis';

const REPORTS_DIR = path.join(process.cwd(), 'reports');

interface AnalysisOptions {
    coverage: boolean;
    legacy: boolean;
    bundle: boolean;
}

function parseArgs(): AnalysisOptions {
    const args = process.argv.slice(2);
    const options: AnalysisOptions = {
        coverage: false,
        legacy: false,
        bundle: false
    };

    // If no specific flags, run all analyses
    if (args.length === 0) {
        return {
            coverage: true,
            legacy: true,
            bundle: true
        };
    }

    args.forEach(arg => {
        switch (arg) {
            case '--coverage':
                options.coverage = true;
                break;
            case '--legacy':
                options.legacy = true;
                break;
            case '--bundle':
                options.bundle = true;
                break;
            default:
                console.warn(`Unknown argument: ${arg}`);
        }
    });

    return options;
}

async function generateMarkdownReport() {
    const options = parseArgs();

    // Create reports directory if it doesn't exist
    if (!fs.existsSync(REPORTS_DIR)) {
        fs.mkdirSync(REPORTS_DIR, { recursive: true });
    }

    let markdown = `# Project Analysis Report\n\n`;
    markdown += `_Generated on ${new Date().toLocaleString()}_\n\n`;

    // Coverage Analysis
    if (options.coverage) {
        markdown += `## Test Coverage Analysis\n\n`;
        const coverage = await analyzeCoverage();
        
        if (coverage.testsFailed) {
            markdown += `⚠️ **Warning:** Some tests failed during the coverage analysis. The coverage data may be incomplete.\n\n`;
        }
        
        markdown += `- Total Coverage: ${coverage.totalCoverage.toFixed(2)}%\n`;
        markdown += `- Coverage Gap to Target (95%): ${coverage.coverageGap.toFixed(2)}%\n\n`;

        if (coverage.lowCoverageFiles.length > 0) {
            markdown += `### Files Needing Coverage Improvement\n\n`;
            markdown += `| File | Current Coverage |\n`;
            markdown += `|------|------------------|\n`;
            coverage.lowCoverageFiles.forEach(file => {
                markdown += `| ${file.file} | ${file.coverage.toFixed(2)}% |\n`;
            });
            markdown += '\n';
        }
    }

    // Legacy Component Analysis
    if (options.legacy) {
        markdown += `## Legacy Component Analysis\n\n`;
        const { components, cssFiles } = await analyzeLegacyComponents();

        markdown += `### Components to Migrate\n\n`;
        markdown += `| Component | Type | Complexity | Lines | CSS Dependencies | React Router | Status |\n`;
        markdown += `|-----------|------|------------|-------|-----------------|--------------|--------|\n`;

        components.forEach(component => {
            const cssDepsList = component.analysis.cssImports.length > 0
                ? component.analysis.cssImports.join(', ')
                : '-';

            const routerStatus = component.analysis.usesRouter ? '✓' : '-';

            markdown += `| ${component.name} | ${component.type} | ${component.analysis.complexity} | ${component.analysis.linesOfCode} | ${cssDepsList} | ${routerStatus} | ⏳ Pending |\n`;
        });

        markdown += `\n### CSS Files to Migrate to Tailwind\n\n`;
        markdown += `| CSS File | Lines | Status |\n`;
        markdown += `|----------|-------|--------|\n`;

        cssFiles.forEach(css => {
            markdown += `| ${css.name}.css | ${css.lines} | ⏳ Pending |\n`;
        });
    }

    // Bundle Analysis
    if (options.bundle) {
        markdown += `\n## Bundle Size Analysis\n\n`;
        const bundleAnalysis = await analyzeBundleSize();
        
        if (bundleAnalysis) {
            markdown += `- Total Bundle Size: ${(bundleAnalysis.totalSize / 1024 / 1024).toFixed(2)} MB\n\n`;
            
            markdown += `### Page Breakdown\n\n`;
            markdown += `| Page | Size |\n`;
            markdown += `|------|------|\n`;
            Object.entries(bundleAnalysis.pageBreakdown).forEach(([page, size]) => {
                const sizeInBytes = typeof size === 'number' ? size : parseInt(size as string, 10);
                markdown += `| ${page} | ${(sizeInBytes / 1024).toFixed(2)} KB |\n`;
            });

            if (bundleAnalysis.largeModules.length > 0) {
                markdown += `\n### Large Modules (>100KB)\n\n`;
                markdown += `| Module | Size |\n`;
                markdown += `|--------|------|\n`;
                bundleAnalysis.largeModules.forEach(module => {
                    markdown += `| ${module.name} | ${(module.size / 1024).toFixed(2)} KB |\n`;
                });
            }
        } else {
            markdown += `Bundle analysis failed. Please ensure you can run \`next build\` successfully.\n`;
        }
    }

    // Write report
    const reportPath = path.join(REPORTS_DIR, 'project-analysis.md');
    fs.writeFileSync(reportPath, markdown);
    console.log(`Report generated at ${reportPath}`);
}

// Run the report generation
generateMarkdownReport().catch(error => {
    console.error('Error generating report:', error);
    process.exit(1);
}); 