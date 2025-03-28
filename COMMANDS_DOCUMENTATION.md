# IndiCab Project - Commands Documentation

## Table of Contents
1. [NPM Scripts](#npm-scripts)
2. [API Endpoints](#api-endpoints) 
3. [Utility Scripts](#utility-scripts)
4. [Troubleshooting](#troubleshooting)

## NPM Scripts

### `dev`
Starts development server with hot reload  
**Usage:** `npm run dev`  
**Options:**
- `--port=3000` (default: 3000)
- `--host=0.0.0.0` (bind to all interfaces)

### `build`
Creates production build  
**Usage:** `npm run build`  
**Output:** `.next/` directory

### `start`
Runs production server  
**Prerequisite:** Must run `build` first

## API Endpoints

### `POST /api/auth`
**Description:** User authentication  
**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepass"
}
```

**Responses:**
- 200 Success:
```json 
{"token": "jwt_token"}
```
- 401 Unauthorized:
```json
{"error": "Invalid credentials"}
```

## Utility Scripts

### `test-api.ts`
Tests User API endpoints  
**Usage:** `ts-node scripts/test-api.ts`

## Troubleshooting

### Common Issues
1. **Port in use**:
   ```bash
   kill $(lsof -t -i:3000)
   ```
2. **Build failures**:
   - Run `npm ci`
   - Check `npm run type-check`

*Last Updated: 2023-11-15*