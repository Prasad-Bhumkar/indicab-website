#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Constants
const COMPONENT_TYPES = ['ui', 'layout', 'feature', 'page', 'form'];
const SRC_DIR = path.join(process.cwd(), 'src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');

// Ensure directories exist
if (!fs.existsSync(SRC_DIR)) {
  fs.mkdirSync(SRC_DIR);
}

if (!fs.existsSync(COMPONENTS_DIR)) {
  fs.mkdirSync(COMPONENTS_DIR);
}

// Templates
const componentTemplate = (name, description) => `
/**
 * @component ${name}
 * @description ${description}
 */
import React from 'react';

interface ${name}Props {
  /**
   * Optional className for additional styling
   */
  className?: string;
  /**
   * Component children
   */
  children?: React.ReactNode;
}

export const ${name} = ({ className = '', children }: ${name}Props) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};
`.trim();

const testTemplate = (name) => `
import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders correctly', () => {
    render(<${name}>Test content</${name}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<${name} className="test-class">Test content</${name}>);
    const element = screen.getByText('Test content');
    expect(element.parentElement).toHaveClass('test-class');
  });
});
`.trim();

const indexTemplate = (name) => `
export * from './${name}';
`.trim();

const cssTemplate = (name) => `
.${name.toLowerCase()} {
  /* Component specific styles */
}
`.trim();

// Create component function
const createComponent = (name, type, description) => {
  const componentDir = path.join(COMPONENTS_DIR, type, name);
  
  if (fs.existsSync(componentDir)) {
    console.error(`❌ Component ${name} already exists in ${type} directory`);
    process.exit(1);
  }
  
  // Create directory structure
  fs.mkdirSync(componentDir, { recursive: true });
  
  // Create component files
  fs.writeFileSync(path.join(componentDir, `${name}.tsx`), componentTemplate(name, description));
  fs.writeFileSync(path.join(componentDir, `${name}.test.tsx`), testTemplate(name));
  fs.writeFileSync(path.join(componentDir, `${name}.module.css`), cssTemplate(name));
  fs.writeFileSync(path.join(componentDir, `index.ts`), indexTemplate(name));
  
  console.log(`✅ Created component ${name} in ${path.join('components', type, name)}`);
};

// Interactive prompt
const promptUser = () => {
  rl.question('Component name (PascalCase): ', (name) => {
    if (!name.match(/^[A-Z][A-Za-z0-9]*$/)) {
      console.error('❌ Component name must be in PascalCase');
      promptUser();
      return;
    }
    
    rl.question(`Component type (${COMPONENT_TYPES.join('/')}): `, (type) => {
      if (!COMPONENT_TYPES.includes(type)) {
        console.error(`❌ Component type must be one of: ${COMPONENT_TYPES.join(', ')}`);
        promptUser();
        return;
      }
      
      rl.question('Component description: ', (description) => {
        createComponent(name, type, description);
        rl.close();
      });
    });
  });
};

// Handle command line arguments
const args = process.argv.slice(2);

if (args.length >= 3) {
  const [name, type, ...descParts] = args;
  const description = descParts.join(' ');
  
  if (!name.match(/^[A-Z][A-Za-z0-9]*$/)) {
    console.error('❌ Component name must be in PascalCase');
    process.exit(1);
  }
  
  if (!COMPONENT_TYPES.includes(type)) {
    console.error(`❌ Component type must be one of: ${COMPONENT_TYPES.join(', ')}`);
    process.exit(1);
  }
  
  createComponent(name, type, description);
} else {
  console.log('📝 Interactive component generator');
  promptUser();
} 