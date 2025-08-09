# 🌐 Nginx Frontend Deployment

This guide covers the complete deployment process for the La Fontaine Mons frontend application using Nginx as a web server and reverse proxy.

## 📋 Prerequisites

- Ubuntu/Debian server with sudo access
- Node.js 22+ for building the frontend
- Nginx installed
- Domain name configured (e.g., `carte.lafontainemons.be`)
- Backend API running (Docker recommended)

---

## 🚀 Deployment Steps

### 1. Build Production Frontend

```bash
# Navigate to frontend directory
cd frontend

# Generate environment file from root .env (TypeScript)
NODE_ENV=production npm run generate-env

# Build production Angular app with TypeScript
npm run build:prod

# Verify build output
ls -la dist/frontend/browser/
```

### 2. Prepare Web Directory

```bash
# Create web directory
sudo mkdir -p /var/www/carte.lafontainemons.be

# Set ownership
sudo chown -R $USER:$USER /var/www/carte.lafontainemons.be

# Copy built files
cp -r dist/frontend/browser/* /var/www/carte.lafontainemons.be/
```

### 3. Configure Nginx

Create the Nginx site configuration:

```bash
sudo nano /etc/nginx/sites-available/carte.lafontainemons.be
```

**Configuration content:**

```nginx
# HTTP Server (redirects to HTTPS)
server {
    listen 80;
    listen [::]:80;
    server_name carte.lafontainemons.be;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name carte.lafontainemons.be;

    # SSL Configuration (managed by Certbot)
    ssl_certificate /etc/letsencrypt/live/carte.lafontainemons.be/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/carte.lafontainemons.be/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Document root
    root /var/www/carte.lafontainemons.be;
    index index.html;

    # Angular SPA Configuration
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # API Proxy to Backend
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # CORS headers
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
        add_header Access-Control-Allow-Headers "Content-Type, Authorization";
    }

    # Error handling
    error_page 404 /index.html;
    
    # Logging
    access_log /var/log/nginx/carte.lafontainemons.be.access.log;
    error_log /var/log/nginx/carte.lafontainemons.be.error.log;
}
```

### 4. Enable Site and Test Configuration

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/carte.lafontainemons.be /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🔒 SSL/TLS Setup with Let's Encrypt

### Install Certbot

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

### Obtain SSL Certificate

```bash
# Get SSL certificate for your domain
sudo certbot --nginx -d carte.lafontainemons.be

# Enable automatic renewal
sudo systemctl enable certbot.timer
```

### Verify SSL Configuration

```bash
# Check certificate status
sudo certbot certificates

# Test renewal process
sudo certbot renew --dry-run
```

---

## 🔧 Environment Configuration

The deployment uses a **TypeScript environment generator** that creates configuration from the root `.env` file:

### Development Environment
- **TypeScript generation**: `npm run generate-env` creates `src/environments/environment.ts`
- **API calls**: Direct to `localhost:${BACKEND_PORT}`
- **Features**: Hot reload, source maps, type checking

### Production Environment  
- **Environment**: `NODE_ENV=production npm run generate-env`
- **API proxy**: Nginx routes `/api/*` → `localhost:3001/*`
- **Optimizations**: TypeScript compilation, tree-shaking, minification
- **Caching**: Long-term asset caching with immutable headers

### Environment Variables Used
```typescript
// Generated from root .env by scripts/generate-env.ts
export const environment = {
  production: true,  // from NODE_ENV
  apiUrl: '${FRONTEND_URL}/api',  // Nginx proxy in production
  frontendUrl: '${FRONTEND_URL}'
}
```

---

## 📊 Monitoring and Maintenance

### Log Monitoring

```bash
# Monitor Nginx access logs
sudo tail -f /var/log/nginx/carte.lafontainemons.be.access.log

# Monitor Nginx error logs
sudo tail -f /var/log/nginx/carte.lafontainemons.be.error.log

# Check Nginx status
sudo systemctl status nginx
```

### Performance Verification

```bash
# Test frontend accessibility
curl https://carte.lafontainemons.be

# Test API proxy
curl https://carte.lafontainemons.be/api/sections

# Verify HTTPS redirect
curl -I http://carte.lafontainemons.be
```

### Updates and Maintenance

```bash
# Update frontend (automated script)
#!/bin/bash
cd /path/to/project/frontend

# Generate production environment from .env
NODE_ENV=production npm run generate-env

# Build TypeScript Angular application  
npm run build:prod

# Deploy built assets
cp -r dist/frontend/browser/* /var/www/carte.lafontainemons.be/

# Reload Nginx
sudo systemctl reload nginx
echo "Frontend updated successfully!"
```

### TypeScript Build Process

The frontend uses a complete TypeScript build pipeline:

```bash
# 1. Environment Generation (TypeScript)
NODE_ENV=production npm run generate-env
# → Creates src/environments/environment.ts from root .env

# 2. Angular TypeScript Build
npm run build:prod  
# → Compiles TypeScript to optimized JavaScript
# → Includes type checking, tree-shaking, minification

# 3. Output Structure
dist/frontend/browser/
├── index.html              # Main SPA entry point
├── main-[hash].js          # Compiled TypeScript bundle
├── styles-[hash].css       # Compiled SCSS styles
└── assets/                 # Static assets
```

---

## 🚨 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **502 Bad Gateway** | Check if backend is running on port 3001 |
| **404 for API calls** | Verify `/api/` proxy configuration |
| **SSL Certificate errors** | Run `sudo certbot renew` |
| **Static files not loading** | Check file permissions and paths |

### Debug Commands

```bash
# Check Nginx configuration syntax
sudo nginx -t

# Verify site is enabled
ls -la /etc/nginx/sites-enabled/

# Check port availability
sudo ss -tlnp | grep :80
sudo ss -tlnp | grep :443

# Test backend connectivity
curl http://localhost:3001/sections
```

---

## 🔗 Related Services

### Backend API
- **Port**: 3001
- **Status**: `docker ps | grep backend`
- **Logs**: `docker logs -f lafontaine-backend-dev`

### Database
- **Port**: 5432
- **Status**: `docker ps | grep postgres`
- **Connection**: Via backend service

---

## 📈 Performance Optimizations

### Nginx Optimizations
- **Gzip compression** enabled
- **Static file caching** with long expires headers
- **HTTP/2** support for faster loading
- **SSL session reuse** for improved HTTPS performance

### Angular Optimizations
- **Ahead-of-Time (AOT)** compilation
- **Tree-shaking** for smaller bundles
- **Lazy loading** for better initial load times
- **Service Worker** ready (if needed)

---

## ✅ Deployment Checklist

- [ ] Frontend built with `NODE_ENV=production`
- [ ] Files copied to `/var/www/carte.lafontainemons.be/`
- [ ] Nginx configuration created and enabled
- [ ] SSL certificate obtained and configured
- [ ] Backend API accessible on port 3001
- [ ] DNS pointing to server IP
- [ ] HTTPS redirect working
- [ ] API proxy functional (`/api/*` routes)
- [ ] Logs monitoring set up
- [ ] Automatic SSL renewal enabled

---

## 🌐 Live Site

**Production URL**: https://carte.lafontainemons.be

**Features**:
- ✅ HTTPS with Let's Encrypt SSL
- ✅ Automatic HTTP → HTTPS redirect
- ✅ API proxy to backend
- ✅ Static file caching
- ✅ Responsive design
- ✅ Real-time menu loading