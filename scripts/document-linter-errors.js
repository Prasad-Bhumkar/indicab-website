const { exec } = require('child_process');
const fs = require('fs');

// Function to run the linter and capture its output
function runLinter(command = 'bun biome lint') {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Linter execution failed:', stderr || error.message);
                reject(stderr || error.message);
            } else {
                resolve(stdout);
            }
        });
    });
}

// Function to categorize linter errors
function categorizeErrors(linterOutput) {
    const categories = {};
    const lines = linterOutput.split('\n');

    lines.forEach((line) => {
        const match = line.match(/\[(\w+)\]/); // Extract category from [category] format
        if (match) {
            const category = match[1];
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(line);
        } else {
            if (!categories['Uncategorized']) {
                categories['Uncategorized'] = [];
            }
            categories['Uncategorized'].push(line);
        }
    });

    return categories;
}

// Function to save categorized errors to a markdown file
function saveErrorsToMarkdown(categories, outputPath = 'LINTER_ERRORS.md') {
    let content = '# Linter Errors\n\n';

    for (const [category, errors] of Object.entries(categories)) {
        content += `## ${category}\n\n`;
        errors.forEach((error) => {
            content += `- ${error}\n`;
        });
        content += '\n';
    }

    fs.writeFileSync(outputPath, content, 'utf-8');
    console.log(`Linter errors documented in ${outputPath}`);
}

// Main function to execute the workflow
async function main() {
    try {
        console.log('Running linter...');
        const linterOutput = await runLinter();
        console.log('Categorizing errors...');
        const categories = categorizeErrors(linterOutput);
        console.log('Saving errors to markdown...');
        saveErrorsToMarkdown(categories);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();