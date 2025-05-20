#!/usr/bin/env sh

# Install husky
npm install husky --save-dev

# Set up husky
npx husky install

# Make hook files executable (on Unix systems)
if [ "$(uname)" != "Windows_NT" ] && [ "$(uname)" != "MINGW"* ]; then
  chmod +x .husky/pre-commit
  chmod +x .husky/pre-push
  chmod +x .husky/post-merge
fi 