import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { Project, SyntaxKind, Node } from 'ts-morph';

const _project = new Project({
    tsConfigFilePath: "tsconfig.json",
});

// Function to recursively get all TypeScript files
function getTypeScriptFiles(dir: string): string[] {
    const files: string[] = [];
    const _items = readdirSync(dir);

    for (const item of _items) {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);

        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
            files.push(...getTypeScriptFiles(fullPath));
        } else if (stat.isFile() && /\.(ts|tsx)$/.test(item)) {
            files.push(fullPath);
        }
    }

    return files;
}

// Fix common issues
function fixCommonIssues() {
    const _sourceFiles = _project.getSourceFiles();

    _sourceFiles.forEach(sourceFile => {
        let modified = false;

        // Fix 'any' types
        sourceFile.forEachDescendant((node) => {
            if (Node.isTypeReference(node) && node.getTypeName().getText() === 'any') {
                node.replaceWithText('unknown');
                modified = true;
            }
        });

        // Fix require() imports
        sourceFile.getImportDeclarations().forEach(importDecl => {
            const moduleSpecifier = importDecl.getModuleSpecifierValue();
            if (moduleSpecifier.startsWith('.') || moduleSpecifier.startsWith('@')) {
                const ext = extname(moduleSpecifier);
                if (ext && ext !== '.ts' && ext !== '.tsx') {
                    importDecl.setModuleSpecifier(moduleSpecifier.replace(ext, ''));
                    modified = true;
                }
            }
        });

        // Fix empty interfaces
        sourceFile.getInterfaces().forEach(interfaceDecl => {
            if (interfaceDecl.getMembers().length === 0) {
                interfaceDecl.remove();
                modified = true;
            }
        });

        // Fix unused variables
        sourceFile.getVariableDeclarations().forEach(varDecl => {
            const _refs = varDecl.findReferencesAsNodes();
            if (_refs.length === 0) {
                const parent = varDecl.getParent();
                if (parent) {
                    parent.remove();
                    modified = true;
                }
            }
        });

        // Fix img elements to use Next.js Image
        sourceFile.forEachDescendant((node) => {
            if (Node.isJsxElement(node) && node.getOpeningElement().getTagNameNode().getText() === 'img') {
                // Add Next.js Image import if not present
                if (!sourceFile.getImportDeclaration(_imp => _imp.getModuleSpecifierValue() === 'next/image')) {
                    sourceFile.addImportDeclaration({
                        namedImports: ['Image'],
                        moduleSpecifier: 'next/image',
                    });
                }

                // Convert img to Image
                const _openingTag = node.getOpeningElement();
                const closingTag = node.getClosingElement();
                const _attrs = _openingTag.getAttributes();

                const _newAttrs = _attrs.map(attr => {
                    if (Node.isJsxAttribute(attr)) {
                        const name = attr.getNameNode().getText();
                        if (name === 'src' || name === 'alt' || name === 'width' || name === 'height') {
                            return attr.getText();
                        }
                    }
                    return '';
                }).filter(Boolean);

                const _newElement = `<Image ${_newAttrs.join(' ')} />`;
                node.replaceWithText(_newElement);
                modified = true;
            }
        });

        if (modified) {
            sourceFile.saveSync();
        }
    });
}

// Run the fixes
console.log('Fixing common lint issues...');
fixCommonIssues();
console.log('Done fixing lint issues. Please run ESLint again to check remaining issues.'); 
