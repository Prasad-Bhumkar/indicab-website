import { expect, test, describe } from 'bun:test';
import fs from 'fs';
import path from 'path';

describe('ContactForm Component', () => {
  test('ContactForm component exists', () => {
    const componentPath = path.join(process.cwd(), 'src/components/ContactForm.tsx');
    const exists = fs.existsSync(componentPath);
    expect(exists).toBe(true);
  });

  test('ContactForm contains form fields', () => {
    const componentPath = path.join(process.cwd(), 'src/components/ContactForm.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for form fields
    expect(content).toContain('name');
    expect(content).toContain('email');
    expect(content).toContain('phone');
    expect(content).toContain('message');
  });

  test('ContactForm has form validation', () => {
    const componentPath = path.join(process.cwd(), 'src/components/ContactForm.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for validation logic
    expect(content).toContain('useState');
    expect(content).toContain('formStatus');
    expect(content).toContain('required');
  });

  test('ContactForm has submit functionality', () => {
    const componentPath = path.join(process.cwd(), 'src/components/ContactForm.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for submit function
    expect(content).toContain('handleSubmit');
    expect(content).toContain('onSubmit');
    expect(content).toContain('formData');
  });
});
