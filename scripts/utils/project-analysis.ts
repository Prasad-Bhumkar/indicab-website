import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Types
interface CoverageData {
    lines: { pct: number };
    [key: string]: any;
}

interface CoverageSummary {
    total: CoverageData;
    [key: string]: CoverageData;
}

interface LowCoverageFile {
    file: string;
    coverage: number;
}

interface ComponentAnalysis {
    linesOfCode: number;
    cssImports: string[];
    hasState: boolean;
    hasEffects: boolean;
    usesRouter: boolean;
    complexity: 'Low' | 'Medium' | 'High' | 'Unknown';
}

interface Component {
    name: string;
    type: string;
    path: string;
    analysis: ComponentAnalysis;
}

interface CssFile {
    path: string;
    name: string;
    lines: number;
}

// Configuration
const CONFIG = {
    coverageThreshold: 80,
    targetCoverage: 95,
    complexityThresholds: {
        high: 200,
        medium: 100
    },
    directories: {
        legacy: [
            'src/legacy-components',
            'src/legacy-pages'
        ],
        css: ['src/styles'],
        source: 'src'
    }
} as const;

// Coverage Analysis
export async function analyzeCoverage() {
    console.log('Running tests with coverage...');
    let testsFailed = false;
    try {
        execSync('vitest run --coverage', { stdio: 'inherit' });
    } catch (error) {
        console.warn('Some tests failed, but continuing with coverage analysis...');
        testsFailed = true;
    }

    const coverageDir = path.join(process.cwd(), 'coverage');
    const coverageSummaryPath = path.join(coverageDir, 'coverage-summary.json');

    if (!fs.existsSync(coverageSummaryPath)) {
        console.error('Coverage report not found. Make sure tests are running with coverage enabled.');
        return {
            totalCoverage: 0,
            lowCoverageFiles: [],
            coverageGap: CONFIG.targetCoverage,
            testsFailed
        };
    }

    const coverageSummary: CoverageSummary = JSON.parse(fs.readFileSync(coverageSummaryPath, 'utf8'));
    const lowCoverageFiles: LowCoverageFile[] = [];

    Object.entries(coverageSummary).forEach(([file, data]) => {
        if (file === 'total') return;
        if (file.includes('node_modules') || file.includes('.test.') || file.includes('.spec.')) return;

        const lineCoverage = data.lines.pct;
        if (lineCoverage < CONFIG.coverageThreshold) {
            lowCoverageFiles.push({
                file: file.replace(process.cwd(), ''),
                coverage: lineCoverage
            });
        }
    });

    return {
        totalCoverage: coverageSummary.total?.lines?.pct || 0,
        lowCoverageFiles: lowCoverageFiles.sort((a, b) => a.coverage - b.coverage),
        coverageGap: Math.max(0, CONFIG.targetCoverage - (coverageSummary.total?.lines?.pct || 0)),
        testsFailed
    };
}

// Legacy Component Analysis
export async function analyzeLegacyComponents() {
    const components: Component[] = [];
    
    for (const dir of CONFIG.directories.legacy) {
        const fullDir = path.join(process.cwd(), dir);
        if (!fs.existsSync(fullDir)) continue;

        const files = await scanDirectory(fullDir, ['.tsx', '.jsx', '.js']);
        
        for (const file of files) {
            const analysis = await analyzeComponent(file);
            components.push({
                name: getComponentName(file),
                type: getComponentType(file),
                path: file,
                analysis
            });
        }
    }

    const cssFiles = await getCssFiles();

    return { components, cssFiles };
}

// Bundle Analysis
export async function analyzeBundleSize() {
    console.log('Analyzing bundle size...');
    try {
        execSync('next build', { stdio: 'inherit' });
        const bundleReport = JSON.parse(fs.readFileSync(path.join(process.cwd(), '.next/analyze/bundle-report.json'), 'utf8'));
        
        return {
            totalSize: bundleReport.totalSize,
            pageBreakdown: bundleReport.pageBreakdown,
            largeModules: bundleReport.largeModules
        };
    } catch (error) {
        console.error('Bundle analysis failed:', error);
        return null;
    }
}

// Utility Functions
async function scanDirectory(dir: string, extensions: string[]): Promise<string[]> {
    const files: string[] = [];

    async function scan(directory: string) {
        const entries = await fs.promises.readdir(directory, { withFileTypes: true });

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

function getComponentName(filePath: string): string {
    return path.basename(filePath, path.extname(filePath));
}

function getComponentType(filePath: string): string {
    if (filePath.includes('legacy-components')) return 'Component';
    if (filePath.includes('legacy-pages')) return 'Page';
    if (filePath.includes('admin')) return 'Admin Component';
    return 'Unknown';
}

async function analyzeComponent(filePath: string): Promise<ComponentAnalysis> {
    try {
        const content = await fs.promises.readFile(filePath, 'utf8');
        const lines = content.split('\n').length;

        const cssImports = (content.match(/import ['"]\.\.\/styles\/[^'"]+\.css['"]/g) || [])
            .map(importStr => importStr.match(/\.\.\/styles\/([^'"]+)\.css/)?.[1] || '');

        const hasState = content.includes('useState');
        const hasEffects = content.includes('useEffect');
        const usesRouter = content.includes('useNavigate') ||
                          content.includes('useLocation') ||
                          content.includes('useParams') ||
                          content.includes('Link');

        let complexity: ComponentAnalysis['complexity'] = 'Low';
        if (lines > CONFIG.complexityThresholds.high || (hasState && hasEffects && usesRouter)) {
            complexity = 'High';
        } else if (lines > CONFIG.complexityThresholds.medium || hasState || hasEffects) {
            complexity = 'Medium';
        }

        return { linesOfCode: lines, cssImports, hasState, hasEffects, usesRouter, complexity };
    } catch (error) {
        console.error(`Error analyzing ${filePath}:`, error);
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

async function getCssFiles(): Promise<CssFile[]> {
    const cssFiles: CssFile[] = [];

    for (const dir of CONFIG.directories.css) {
        const fullDir = path.join(process.cwd(), dir);
        if (!fs.existsSync(fullDir)) continue;

        const files = await scanDirectory(fullDir, ['.css']);

        for (const file of files) {
            const content = await fs.promises.readFile(file, 'utf8');
            cssFiles.push({
                path: file,
                name: path.basename(file, '.css'),
                lines: content.split('\n').length
            });
        }
    }

    return cssFiles;
} 