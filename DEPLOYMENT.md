# Deployment Guide

## Overview
This guide covers deployment of the E-Commerce Product Screen to various platforms.

---

## 🔧 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All features working locally
- [ ] `.env` file configured correctly
- [ ] No console errors
- [ ] All dependencies installed on production
- [ ] Backend API running and accessible
- [ ] CORS enabled on backend
- [ ] Tests passing (if applicable)

---

## 🏗️ Build for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized `build/` folder with:
- Minified JavaScript
- Optimized images
- Source maps (disabled in production)
- Hash-named chunk files

### Build Size

Check build size:
```bash
npm run build -- --stats
```

---

## 🌐 Deployment Platforms

### 1. Vercel (Recommended - Easiest)

**Advantages:**
- Automatic deployments from GitHub
- Zero-config deployment
- Fast CDN
- Built-in analytics

**Steps:**

```bash
# Option 1: Using CLI
npm install -g vercel
vercel

# Option 2: Using Web Dashboard
# 1. Go to vercel.com
# 2. Click "New Project"
# 3. Import GitHub repository
# 4. Configure build settings
# 5. Deploy
```

**Vercel Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "env": {
    "REACT_APP_API_URL": "@react_app_api_url",
    "REACT_APP_API_TIMEOUT": "10000"
  }
}
```

**Add to Vercel Dashboard:**
1. Settings → Environment Variables
2. Add `REACT_APP_API_URL` with production API URL

---

### 2. Netlify

**Advantages:**
- Easy setup with GitHub
- Automatic deploys on push
- Built-in form handling
- Free tier available

**Steps:**

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect GitHub account
5. Configure build settings:

   - Build command: `npm run build`
   - Publish directory: `build`

6. Add environment variables:
   - `REACT_APP_API_URL`
   - `REACT_APP_API_TIMEOUT`

7. Deploy

**Automatic Deployments:**
Every push to main branch automatically deploys.

---

### 3. GitHub Pages

**Advantages:**
- Free hosting
- GitHub integration
- Good for static sites

**Steps:**

```bash
# Update package.json
{
  "homepage": "https://username.github.io/repo-name"
}

# Install gh-pages
npm install --save-dev gh-pages

# Add deploy scripts to package.json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}

# Deploy
npm run deploy
```

**Note:** GitHub Pages doesn't support environment variables. Set API URL in code.

---

### 4. AWS S3 + CloudFront

**Advantages:**
- Highly scalable
- Global CDN
- Pay-per-use
- Enterprise support

**Steps:**

1. Create S3 bucket:
```bash
aws s3 mb s3://my-ecommerce-bucket
```

2. Build and upload:
```bash
npm run build
aws s3 sync build/ s3://my-ecommerce-bucket
```

3. Enable static website hosting in AWS Console

4. Create CloudFront distribution

5. Configure environment variables:
   - Create `.env.production` in build process
   - Or set via build environment

---

### 5. Heroku

**Note:** Heroku is free tier discontinued. Consider alternatives.

---

### 6. Docker Deployment

**Create Dockerfile:**

```dockerfile
# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

**Build and run:**

```bash
docker build -t ecommerce-app .
docker run -e REACT_APP_API_URL=http://api.example.com -p 3000:3000 ecommerce-app
```

---

## 🌍 Production Environment Configuration

### Update API Endpoints

**Create `.env.production`:**

```env
REACT_APP_API_URL=https://api.yourdomain.com/api
REACT_APP_API_TIMEOUT=15000
REACT_APP_ENV=production
```

### Ensure Backend Supports CORS

Backend must allow requests from your frontend domain:

```javascript
const cors = require('cors');

app.use(cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true,
  methods: ['GET', 'DELETE', 'POST', 'PUT']
}));
```

---

## 🔒 Security Configuration

### 1. HTTPS

Always use HTTPS in production.

- Use Let's Encrypt for free SSL
- Configure HTTPS redirects
- Set Strict-Transport-Security header

### 2. CSP Headers

Add Content Security Policy:

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.yourdomain.com
```

### 3. CORS Configuration

Whitelist specific origins:

```javascript
cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
})
```

---

## 📊 Monitoring & Analytics

### 1. Error Tracking (Sentry)

```bash
npm install @sentry/react
```

Initialize in `src/index.js`:

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://your-sentry-dsn@sentry.io/project",
  environment: process.env.REACT_APP_ENV,
});
```

### 2. Analytics (Google Analytics)

```bash
npm install react-ga4
```

### 3. Performance Monitoring

- Monitor API response times
- Track load times
- Monitor error rates
- Track user interactions

---

## 🚀 Continuous Integration/Deployment (CI/CD)

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build application
        run: npm run build
        env:
          REACT_APP_API_URL: ${{ secrets.REACT_APP_API_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          production: true
```

---

## 📈 Post-Deployment

### 1. Verify Deployment

- Visit deployed URL
- Test all features
- Check console for errors
- Verify API connectivity
- Test on mobile

### 2. Monitor Performance

Track:
- Page load time
- API response time
- Error rate
- User interactions
- Conversion metrics

### 3. Set Up Alerts

Alert on:
- High error rate
- API downtime
- Slow response time
- Failed deployments

---

## 🔄 Rollback Plan

If deployment has issues:

### Vercel Rollback
```bash
vercel rollback
```

### Netlify Rollback
1. Go to Deployments
2. Select previous successful deployment
3. Click "Publish deployed version"

### GitHub Pages Rollback
```bash
git revert <commit-hash>
npm run deploy
```

---

## 📋 Deployment Checklist

**Before Deployment:**
- [ ] All features tested
- [ ] No console errors
- [ ] Optimized build created
- [ ] Environment variables configured
- [ ] Backend API accessible
- [ ] CORS enabled
- [ ] Backup created (if migrating)

**During Deployment:**
- [ ] Deploy to staging first
- [ ] Run smoke tests
- [ ] Monitor logs
- [ ] Test from different locations

**After Deployment:**
- [ ] Verify all features work
- [ ] Check performance
- [ ] Monitor error tracking
- [ ] Update status page
- [ ] Document deployment

---

## 🆘 Troubleshooting Deployment

### Issue: 404 on Refresh

**Cause:** Client-side routing issues

**Solution:**
Configure server to serve `index.html` for all routes:

**Vercel:** Automatic
**Netlify:** Add `/build /index.html 200` to `_redirects`
**AWS S3:** Edit error handling to serve index.html

### Issue: Environment Variables Not Working

**Solution:**
- Ensure variable names start with `REACT_APP_`
- Restart build process
- Verify in deployment logs

### Issue: CORS Errors

**Solution:**
- Enable CORS in backend
- Check allowed origins
- Verify API URL in .env

### Issue: Slow Performance

**Solution:**
- Check bundle size: `npm run build -- --stats`
- Enable CDN
- Implement lazy loading
- Optimize images

---

## 📞 Support

For deployment issues:
1. Check deployment logs
2. Review error tracking (Sentry)
3. Check backend logs
4. Test locally first
5. Contact platform support

---

**Happy deploying! 🚀**
