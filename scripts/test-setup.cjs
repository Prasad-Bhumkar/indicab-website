// Configure test environment
process.env.NODE_ENV = 'test'
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'CommonJS'
  }
})