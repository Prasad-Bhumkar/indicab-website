# Deployment Guide

## Overview

This document outlines the deployment process for the IndiCab platform across different environments.

## Environments

### Development
- URL: `http://localhost:3000`
- Branch: `develop`
- Auto-deploy: No

### Staging
- URL: `https://staging.indicab.com`
- Branch: `staging`
- Auto-deploy: Yes (Netlify)

### Production
- URL: `https://indicab.com`
- Branch: `main`
- Auto-deploy: Yes (Vercel)

## Prerequisites

1. **Node.js**
   - Version: 18.x or higher
   - Use nvm for version management

2. **Package Manager**
   - npm 9.x or higher

3. **Environment Variables**
   ```env
   # Required
   MONGODB_URI=mongodb://...
   JWT_SECRET=your-secret
   STRIPE_SECRET_KEY=sk_...
   
   # Optional
   REDIS_URL=redis://...
   SENTRY_DSN=https://...
   ```

4. **Cloud Services Access**
   - AWS credentials
   - Vercel account
   - Netlify account
   - MongoDB Atlas access

## Build Process

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Type Checking**
   ```bash
   npm run type-check
   ```

3. **Run Tests**
   ```bash
   npm run test
   npm run test:e2e
   ```

4. **Build Application**
   ```bash
   npm run build
   ```

## Deployment Steps

### Local Development

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Run with HTTPS**
   ```bash
   npm run dev:https
   ```

### Staging (Netlify)

1. **Connect Repository**
   - Connect GitHub repository to Netlify
   - Select `staging` branch

2. **Configure Build Settings**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
     
   [build.environment]
     NODE_VERSION = "18"
   ```

3. **Set Environment Variables**
   - Add all required variables in Netlify dashboard
   - Enable branch-specific variables

4. **Deploy**
   - Automatic deployment on push to `staging`
   - Manual deployment via Netlify CLI:
     ```bash
     netlify deploy
     ```

### Production (Vercel)

1. **Connect Repository**
   - Connect GitHub repository to Vercel
   - Select `main` branch

2. **Configure Project**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/next"
       }
     ]
   }
   ```

3. **Set Environment Variables**
   - Add production variables in Vercel dashboard
   - Enable preview environments

4. **Deploy**
   - Automatic deployment on push to `main`
   - Manual deployment via Vercel CLI:
     ```bash
     vercel --prod
     ```

## Infrastructure

### CDN Configuration

1. **Cloudflare Setup**
   - Enable caching
   - Configure SSL/TLS
   - Set up page rules

2. **Cache Rules**
   ```json
   {
     "version": 1,
     "rules": [
       {
         "description": "Static assets",
         "expression": "/*.{jpg,png,css,js}",
         "actions": {
           "cache_level": "cache_everything",
           "edge_cache_ttl": 86400
         }
       }
     ]
   }
   ```

### Database

1. **MongoDB Atlas**
   - M10 cluster (production)
   - M0 cluster (staging)
   - Backup enabled
   - Monitoring configured

2. **Redis Cache**
   - Redis Cloud
   - 30MB plan
   - Persistence enabled

### Media Storage

1. **AWS S3**
   - Separate buckets for each environment
   - CloudFront distribution
   - Lifecycle policies

## Monitoring

### Application Monitoring

1. **Sentry**
   - Error tracking
   - Performance monitoring
   - Release tracking

2. **Datadog**
   - Infrastructure monitoring
   - APM
   - Log management

### Health Checks

1. **Endpoints**
   - `/api/health`: Basic health check
   - `/api/health/db`: Database connectivity
   - `/api/health/cache`: Redis connectivity

2. **Monitoring Setup**
   ```typescript
   // health-check.ts
   export async function healthCheck() {
     return {
       status: 'healthy',
       timestamp: new Date().toISOString(),
       services: {
         database: await checkDatabase(),
         redis: await checkRedis(),
         s3: await checkS3()
       }
     };
   }
   ```

## Backup and Recovery

### Database Backups

1. **Automated Backups**
   - Daily snapshots
   - 7-day retention
   - Cross-region replication

2. **Manual Backups**
   ```bash
   # Create backup
   mongodump --uri $MONGODB_URI --out ./backup
   
   # Restore backup
   mongorestore --uri $MONGODB_URI ./backup
   ```

### Disaster Recovery

1. **Recovery Point Objective (RPO)**
   - Database: 24 hours
   - File storage: Immediate
   - Application state: Stateless

2. **Recovery Time Objective (RTO)**
   - Critical systems: 1 hour
   - Non-critical systems: 4 hours

## Security

### SSL/TLS Configuration

1. **Certificate Management**
   - Auto-renewal via Let's Encrypt
   - Forced HTTPS
   - HSTS enabled

2. **Security Headers**
   ```typescript
   // next.config.mjs
   const securityHeaders = [
     {
       key: 'Strict-Transport-Security',
       value: 'max-age=63072000; includeSubDomains; preload'
     },
     {
       key: 'X-Frame-Options',
       value: 'SAMEORIGIN'
     }
   ];
   ```

### Access Control

1. **IP Restrictions**
   - Admin panel: Whitelist IPs
   - API rate limiting
   - Geo-blocking as needed

2. **Authentication**
   - JWT with short expiry
   - Refresh token rotation
   - MFA for admin access

## Rollback Procedures

### Application Rollback

1. **Vercel Rollback**
   ```bash
   vercel rollback
   ```

2. **Manual Rollback**
   ```bash
   git checkout <previous-version>
   npm run build
   npm run deploy
   ```

### Database Rollback

1. **Point-in-Time Recovery**
   - Available for last 7 days
   - Requires manual intervention
   - Test restore process monthly

## Maintenance

### Regular Tasks

1. **Daily**
   - Monitor error rates
   - Check system health
   - Review security alerts

2. **Weekly**
   - Update dependencies
   - Review performance metrics
   - Backup verification

3. **Monthly**
   - Security scanning
   - Load testing
   - Disaster recovery testing

### Update Process

1. **Dependencies**
   ```bash
   # Check outdated packages
   npm outdated
   
   # Update packages
   npm update
   
   # Security audit
   npm audit
   ```

2. **System Updates**
   - Schedule maintenance window
   - Notify users in advance
   - Follow change management process

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version
   - Verify environment variables
   - Review build logs

2. **Performance Issues**
   - Check database indexes
   - Review cache hit rates
   - Monitor API response times

3. **Memory Leaks**
   - Use heap snapshots
   - Monitor memory usage
   - Review component lifecycles

## Contact Information

### Emergency Contacts

- **DevOps Team**: devops@indicab.com
- **Security Team**: security@indicab.com
- **On-Call Support**: +91-XXXXXXXXXX

### Escalation Matrix

1. **Level 1**: Development Team
2. **Level 2**: DevOps Team
3. **Level 3**: System Architects
4. **Level 4**: CTO 