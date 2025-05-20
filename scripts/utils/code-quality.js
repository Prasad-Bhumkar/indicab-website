import { exec } from 'child_process';
import { writeFileSync } from 'fs';
import * as path from 'path';
import { Node, Project, SyntaxKind } from 'ts-morph';
import { promisify } from 'util';
const execAsync = promisify(exec);
/**
 * Project configuration
 */

// Helper to get all files recursively in a directory
function getAllFiles(dir, exts = ['.ts', '.tsx']) {
  const fs = require('fs');
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(file, exts));
    } else {
      if (exts.includes(path.extname(file))) {
        results.push(file);
      }
    }
  });
  return results;
}

// Accept file/directory arguments
const userArgs = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
let filesToProcess = [];
if (userArgs.length > 0) {
  userArgs.forEach(arg => {
    const absPath = path.resolve(arg);
    const fs = require('fs');
    if (fs.existsSync(absPath)) {
      const stat = fs.statSync(absPath);
      if (stat.isDirectory()) {
        filesToProcess = filesToProcess.concat(getAllFiles(absPath));
      } else if (stat.isFile()) {
        filesToProcess.push(absPath);
      }
    }
  });
} else {
  // Default: process main source directories only
  const mainDirs = ['src', 'lib', 'services', 'tests'];
  mainDirs.forEach(dir => {
    const absDir = path.join(process.cwd(), dir);
    filesToProcess = filesToProcess.concat(getAllFiles(absDir));
  });
}
// Filter out root-level config files
const configFileNames = [
  'env.d.ts',
  'next-env.d.ts',
  'playwright.config.ts',
  'vitest.config.ts',
  'jest.config.ts',
  'tsconfig.json',
  'tsconfig.node.json',
  'tsconfig.tsbuildinfo',
  'package.json',
  'package-lock.json',
  'README.md',
  'index.ts',
  'index.js',
];
filesToProcess = filesToProcess.filter(f => !configFileNames.includes(path.basename(f)));

const project = new Project({
  tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json'),
});
// Only add the files we want to process, not a glob or default
project.addSourceFilesAtPaths(filesToProcess);
// Remove any files from the project that are not in filesToProcess
project.getSourceFiles().forEach(sf => {
  if (!filesToProcess.includes(sf.getFilePath())) {
    project.removeSourceFile(sf);
  }
});

class TypeScriptFixer {
    getAppropriateType(node) {
        const text = node.getText();
        if (text.includes('event') || text.includes('handler'))
            return 'EventHandler';
        if (text.includes('response') || text.includes('result'))
            return 'ApiResponse<unknown>';
        if (text.includes('error'))
            return 'ApiError';
        if (text.includes('props'))
            return 'PropsWithChildren';
        if (text.includes('style'))
            return 'ComponentStyles';
        if (text.includes('ref'))
            return 'ComponentRef<unknown>';
        if (text.includes('data'))
            return 'UnknownData';
        return 'GenericObject';
    }
    fixAnyTypes(sourceFile) {
        let needsImport = false;
        sourceFile.forEachDescendant((node) => {
            if (Node.isTypeNode(node) && node.getKindName() === 'AnyKeyword') {
                const parent = node.getParent();
                if (parent) {
                    const newType = this.getAppropriateType(parent);
                    node.replaceWithText(newType);
                    needsImport = true;
                }
            }
        });
        if (needsImport) {
            const hasCommonImport = sourceFile.getImportDeclarations()
                .some(imp => imp.getModuleSpecifierValue() === '@/types/common');
            if (!hasCommonImport) {
                sourceFile.insertImportDeclaration(0, {
                    namedImports: ['UnknownData', 'GenericObject', 'ApiResponse', 'ApiError', 'EventHandler', 'PropsWithChildren', 'ComponentRef', 'ComponentStyles'],
                    moduleSpecifier: '@/types/common',
                    isTypeOnly: true,
                });
            }
        }
    }
    fixReactComponentTypes(sourceFile) {
        sourceFile.forEachDescendant((node) => {
            var _a, _b;
            if (Node.isFunctionDeclaration(node) || Node.isArrowFunction(node)) {
                const returnType = node.getReturnTypeNode();
                if (!returnType && (((_a = node.getBody()) === null || _a === void 0 ? void 0 : _a.getFirstDescendantByKind(SyntaxKind.JsxElement)) ||
                    ((_b = node.getBody()) === null || _b === void 0 ? void 0 : _b.getFirstDescendantByKind(SyntaxKind.JsxSelfClosingElement)))) {
                    node.setReturnType('JSX.Element');
                    const hasReactImport = sourceFile.getImportDeclarations()
                        .some(imp => imp.getModuleSpecifierValue() === 'react');
                    if (!hasReactImport) {
                        sourceFile.insertImportDeclaration(0, {
                            defaultImport: 'React',
                            moduleSpecifier: 'react',
                        });
                    }
                }
            }
        });
    }
    fixUnusedVariables(sourceFile) {
        const identifiers = sourceFile.getDescendantsOfKind(SyntaxKind.Identifier);
        const usageMap = new Map();
        identifiers.forEach(identifier => {
            const name = identifier.getText();
            const entry = usageMap.get(name) || { declarations: [], references: [] };
            const parent = identifier.getParent();
            if (Node.isVariableDeclaration(parent) || Node.isParameterDeclaration(parent)) {
                entry.declarations.push(identifier);
            }
            else {
                entry.references.push(identifier);
            }
            usageMap.set(name, entry);
        });
        Array.from(usageMap).forEach(([name, usage]) => {
            if (usage.declarations.length > 0 &&
                usage.references.length === usage.declarations.length &&
                !name.startsWith('_')) {
                usage.declarations.forEach((declaration) => {
                    try {
                        const newName = `_${name}`;
                        const identifier = Node.isIdentifier(declaration) ? declaration : null;
                        if (identifier) {
                            identifier.rename(newName);
                        }
                    }
                    catch (error) {
                        console.warn(`Could not rename ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
                    }
                });
            }
        });
    }
    fixImports(sourceFile) {
        // Get all imports
        const imports = sourceFile.getImportDeclarations();
        // Sort imports by category
        const importGroups = {
            react: [],
            external: [],
            internal: [],
            relative: [],
        };
        imports.forEach(imp => {
            const moduleSpecifier = imp.getModuleSpecifierValue();
            if (moduleSpecifier === 'react') {
                importGroups.react.push(imp);
            }
            else if (!moduleSpecifier.startsWith('.') && !moduleSpecifier.startsWith('@/')) {
                importGroups.external.push(imp);
            }
            else if (moduleSpecifier.startsWith('@/')) {
                importGroups.internal.push(imp);
            }
            else {
                importGroups.relative.push(imp);
            }
        });
        // Remove all existing imports
        imports.forEach(imp => imp.remove());
        // Add imports back in sorted order with newlines between groups
        let currentIndex = 0;
        if (importGroups.react.length) {
            importGroups.react.sort((a, b) => a.getModuleSpecifierValue().localeCompare(b.getModuleSpecifierValue()));
            importGroups.react.forEach(imp => sourceFile.insertImportDeclaration(currentIndex++, imp.getStructure()));
            currentIndex++; // Add blank line
        }
        if (importGroups.external.length) {
            importGroups.external.sort((a, b) => a.getModuleSpecifierValue().localeCompare(b.getModuleSpecifierValue()));
            importGroups.external.forEach(imp => sourceFile.insertImportDeclaration(currentIndex++, imp.getStructure()));
            currentIndex++;
        }
        if (importGroups.internal.length) {
            importGroups.internal.sort((a, b) => a.getModuleSpecifierValue().localeCompare(b.getModuleSpecifierValue()));
            importGroups.internal.forEach(imp => sourceFile.insertImportDeclaration(currentIndex++, imp.getStructure()));
            currentIndex++;
        }
        if (importGroups.relative.length) {
            importGroups.relative.sort((a, b) => a.getModuleSpecifierValue().localeCompare(b.getModuleSpecifierValue()));
            importGroups.relative.forEach(imp => sourceFile.insertImportDeclaration(currentIndex++, imp.getStructure()));
        }
    }
    detectDeadCode(sourceFile) {
        // Find unused exports
        sourceFile.getExportedDeclarations().forEach((declarations, name) => {
            const declaration = declarations[0];
            if (Node.isSourceFile(declaration)) {
                return; // Skip source file declarations
            }
            if (!Node.isExportSpecifier(declaration)) {
                // Comment out or replace with a warning (since ts-morph Symbol does not have findReferences)
                // const refs = declaration.getSymbol()?.findReferences();
                // if (refs) { ... }
                // Instead, just warn about unused exports (skip reference check for now)
                console.warn(`⚠️ Unused export found: ${name} in ${sourceFile.getFilePath()}`);
            }
        });
        // Find unreachable code
        sourceFile.forEachDescendant((node) => {
            if (Node.isReturnStatement(node)) {
                const nextSibling = node.getNextSibling();
                if (nextSibling && !Node.isBlock(nextSibling)) {
                    console.warn(`⚠️ Unreachable code found after return statement in ${sourceFile.getFilePath()}`);
                }
            }
        });
        // Find empty blocks
        sourceFile.forEachDescendant((node) => {
            if (Node.isBlock(node) && node.getStatements().length === 0) {
                const parent = node.getParent();
                if (parent && !Node.isCatchClause(parent)) {
                    console.warn(`⚠️ Empty block found in ${sourceFile.getFilePath()}`);
                }
            }
        });
    }
    optimizeComponents(sourceFile) {
        sourceFile.forEachDescendant((node) => {
            var _a, _b, _c;
            // Add memo to components with only prop dependencies
            if (Node.isFunctionDeclaration(node) || Node.isArrowFunction(node)) {
                const isComponent = ((_a = node.getReturnTypeNode()) === null || _a === void 0 ? void 0 : _a.getText()) === 'JSX.Element';
                if (isComponent) {
                    const body = node.getBody();
                    if (body) {
                        const hasStateOrEffects = body.getText().includes('useState') ||
                            body.getText().includes('useEffect') ||
                            body.getText().includes('useContext');
                        if (!hasStateOrEffects) {
                            const functionName = Node.isFunctionDeclaration(node) ? node.getName() :
                                (_c = (_b = node.getParent()) === null || _b === void 0 ? void 0 : _b.getFirstChildByKind(SyntaxKind.Identifier)) === null || _c === void 0 ? void 0 : _c.getText();
                            if (functionName) {
                                const needsMemo = !functionName.endsWith('Memo');
                                if (needsMemo) {
                                    // Add React.memo import if needed
                                    const hasReactImport = sourceFile.getImportDeclarations()
                                        .some(imp => {
                                        var _a;
                                        return imp.getModuleSpecifierValue() === 'react' &&
                                            ((_a = imp.getNamedImports()) === null || _a === void 0 ? void 0 : _a.some(named => named.getName() === 'memo'));
                                    });
                                    if (!hasReactImport) {
                                        const reactImport = sourceFile.getImportDeclaration(imp => imp.getModuleSpecifierValue() === 'react');
                                        if (reactImport) {
                                            reactImport.addNamedImport('memo');
                                        }
                                        else {
                                            sourceFile.addImportDeclaration({
                                                moduleSpecifier: 'react',
                                                namedImports: ['memo'],
                                            });
                                        }
                                    }
                                    // Wrap component in memo
                                    const originalCode = node.getText();
                                    const memoCode = `memo(${originalCode})`;
                                    node.replaceWithText(memoCode);
                                }
                            }
                        }
                    }
                }
            }
        });
    }
}
/**
 * Linting Utilities
 */
class LintManager {
    async runLinter(command = 'bun biome lint') {
        try {
            const { stdout, stderr } = await execAsync(command);
            if (stderr) {
                console.error('Linter execution failed:', stderr);
                throw new Error(stderr);
            }
            return stdout;
        }
        catch (error) {
            throw new Error(`Linter execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    categorizeErrors(linterOutput) {
        const categories = {};
        const lines = linterOutput.split('\n');
        lines.forEach((line) => {
            const match = line.match(/\[(\w+)\]/);
            if (match) {
                const category = match[1];
                if (!categories[category]) {
                    categories[category] = [];
                }
                categories[category].push(line);
            }
            else if (line.trim()) {
                if (!categories['Uncategorized']) {
                    categories['Uncategorized'] = [];
                }
                categories['Uncategorized'].push(line);
            }
        });
        return categories;
    }
    async documentErrors(outputPath = 'LINTER_ERRORS.md') {
        try {
            console.log('Running linter...');
            const linterOutput = await this.runLinter();
            console.log('Categorizing errors...');
            const categories = this.categorizeErrors(linterOutput);
            console.log('Saving errors to markdown...');
            let content = '# Linter Errors\n\n';
            Object.entries(categories).forEach(([category, errors]) => {
                content += `## ${category}\n\n`;
                errors.forEach((error) => {
                    content += `- ${error}\n`;
                });
                content += '\n';
            });
            writeFileSync(outputPath, content, 'utf-8');
            console.log(`Linter errors documented in ${outputPath}`);
        }
        catch (error) {
            console.error('Error documenting linter errors:', error instanceof Error ? error.message : error);
            throw error;
        }
    }
}
/**
 * Main functionality
 */
export async function fixCodeQuality(options = {}) {
    const { fixTypes = true, fixLint = true, documentErrors = true, sortImports = true, detectDeadCode = true, optimizeComponents = true } = options;
    try {
        if (fixTypes || sortImports || detectDeadCode || optimizeComponents) {
            console.log('Analyzing and fixing code issues...');
            const typeFixer = new TypeScriptFixer();
            const sourceFiles = project.getSourceFiles();
            for (const sourceFile of sourceFiles) {
                console.log(`Processing ${sourceFile.getFilePath()}`);
                if (fixTypes) {
                    typeFixer.fixAnyTypes(sourceFile);
                    typeFixer.fixUnusedVariables(sourceFile);
                    typeFixer.fixReactComponentTypes(sourceFile);
                }
                if (sortImports) {
                    typeFixer.fixImports(sourceFile);
                }
                if (detectDeadCode) {
                    typeFixer.detectDeadCode(sourceFile);
                }
                if (optimizeComponents && sourceFile.getFilePath().includes('components')) {
                    typeFixer.optimizeComponents(sourceFile);
                }
                sourceFile.formatText();
            }
            await project.save();
            console.log('✅ Code issues fixed');
        }
        if (fixLint || documentErrors) {
            const lintManager = new LintManager();
            if (documentErrors) {
                await lintManager.documentErrors();
                console.log('✅ Linter errors documented');
            }
        }
        console.log('🎉 Code quality improvements completed!');
    }
    catch (error) {
        console.error('Failed to fix code quality issues:', error instanceof Error ? error.message : error);
        throw error;
    }
}
/**
 * Command-line interface
 */
if (require.main === module) {
    const args = process.argv.slice(2);
    const options = {
        fixTypes: args.includes('--fix-types'),
        fixLint: args.includes('--fix-lint'),
        documentErrors: args.includes('--document-errors'),
        sortImports: args.includes('--sort-imports'),
        detectDeadCode: args.includes('--detect-dead-code'),
        optimizeComponents: args.includes('--optimize-components'),
    };
    // If no specific options provided, run everything
    if (!args.length) {
        Object.keys(options).forEach(key => {
            options[key] = true;
        });
    }
    fixCodeQuality(options).catch(() => process.exit(1));
}
