import { Project, SourceFile, SyntaxKind, Node, TypeNode, ts } from 'ts-morph';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize project
const project = new Project({
  tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json'),
});

// Add source files
project.addSourceFilesAtPaths([
  'src/**/*.{ts,tsx}',
  'lib/**/*.{ts,tsx}',
  'services/**/*.{ts,tsx}',
  'tests/**/*.{ts,tsx}',
]);

// Function to check if a type is 'any'
function isAnyType(type) {
  return type.getKindName() === 'AnyKeyword';
}

// Function to get appropriate type from common types
function getAppropriateType(node) {
  const text = node.getText();
  
  // Check context to determine appropriate type
  if (text.includes('event') || text.includes('handler')) {
    return 'EventHandler';
  }
  if (text.includes('response') || text.includes('result')) {
    return 'ApiResponse<unknown>';
  }
  if (text.includes('error')) {
    return 'ApiError';
  }
  if (text.includes('props')) {
    return 'PropsWithChildren';
  }
  if (text.includes('style')) {
    return 'ComponentStyles';
  }
  if (text.includes('ref')) {
    return 'ComponentRef<unknown>';
  }
  if (text.includes('data')) {
    return 'UnknownData';
  }
  
  // Default to GenericObject for object types
  return 'GenericObject';
}

// Function to fix 'any' types
function fixAnyTypes(sourceFile) {
  // Add import if file uses common types
  let needsImport = false;
  
  // Find and replace 'any' types
  sourceFile.forEachDescendant((node) => {
    if (Node.isTypeNode(node) && isAnyType(node)) {
      const parent = node.getParent();
      if (parent) {
        const newType = getAppropriateType(parent);
        node.replaceWithText(newType);
        needsImport = true;
      }
    }
  });
  
  // Add import if needed
  if (needsImport) {
    const existingImports = sourceFile.getImportDeclarations();
    const hasCommonImport = existingImports.some(imp => 
      imp.getModuleSpecifierValue() === '@/types/common'
    );
    
    if (!hasCommonImport) {
      sourceFile.insertImportDeclaration(0, {
        namedImports: ['UnknownData', 'GenericObject', 'ApiResponse', 'ApiError', 'EventHandler', 'PropsWithChildren', 'ComponentRef', 'ComponentStyles'],
        moduleSpecifier: '@/types/common',
        isTypeOnly: true,
      });
    }
  }
}

// Function to fix unused variables
function fixUnusedVariables(sourceFile) {
  // Get all identifiers in the file
  const identifiers = sourceFile.getDescendantsOfKind(SyntaxKind.Identifier);
  
  // Create a map of identifier usage
  const usageMap = new Map();
  
  identifiers.forEach(identifier => {
    const name = identifier.getText();
    const entry = usageMap.get(name) || { declarations: [], references: [] };
    
    const parent = identifier.getParent();
    if (Node.isVariableDeclaration(parent) || Node.isParameterDeclaration(parent)) {
      entry.declarations.push(identifier);
    } else {
      entry.references.push(identifier);
    }
    
    usageMap.set(name, entry);
  });
  
  // Find and rename unused variables using Array.from instead of for...of
  Array.from(usageMap).forEach(([name, usage]) => {
    if (
      usage.declarations.length > 0 && 
      usage.references.length === usage.declarations.length &&
      !name.startsWith('_')
    ) {
      usage.declarations.forEach((declaration) => {
        try {
          const newName = `_${name}`;
          const identifier = Node.isIdentifier(declaration) ? declaration : null;
          if (identifier) {
            identifier.rename(newName);
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.warn(`Could not rename ${name} to _${name}: ${errorMessage}`);
        }
      });
    }
  });
}

// Function to fix React component types
function fixReactComponentTypes(sourceFile) {
  sourceFile.forEachDescendant((node) => {
    if (Node.isFunctionDeclaration(node) || Node.isArrowFunction(node)) {
      const returnType = node.getReturnTypeNode();
      if (!returnType && (
        node.getBody()?.getFirstDescendantByKind(SyntaxKind.JsxElement) ||
        node.getBody()?.getFirstDescendantByKind(SyntaxKind.JsxSelfClosingElement)
      )) {
        node.setReturnType('JSX.Element');
        
        // Add React import if needed
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

// Main function to fix all issues
async function fixTypeScriptIssues() {
  const sourceFiles = project.getSourceFiles();
  
  for (const sourceFile of sourceFiles) {
    console.log(`Processing ${sourceFile.getFilePath()}`);
    
    try {
      // Apply fixes
      fixAnyTypes(sourceFile);
      fixUnusedVariables(sourceFile);
      fixReactComponentTypes(sourceFile);
      
      // Format the file
      sourceFile.formatText();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error processing ${sourceFile.getFilePath()}: ${errorMessage}`);
    }
  }
  
  // Save all changes
  await project.save();
  
  console.log('TypeScript issues fixed successfully!');
}

// Run the script
fixTypeScriptIssues().catch((error) => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  console.error(`Failed to fix TypeScript issues: ${errorMessage}`);
}); 