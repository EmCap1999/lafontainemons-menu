# Nginx Deployment

Production deployment guide for the frontend application.

## Prerequisites

- Ubuntu/Debian server with sudo access
- Node.js 24+
- Nginx installed
- Domain configured (carte.lafontainemons.be)
- Backend running (Docker)

## Deployment

### 1. Build Frontend

```bash
cd frontend
NODE_ENV=production yarn generate-env
yarn build:prod
```

### 2. Deploy Files

```bash
sudo mkdir -p /var/www/carte.lafontainemons.be
sudo chown -R $USER:$USER /var/www/carte.lafontainemons.be
cp -r dist/frontend/browser/* /var/www/carte.lafontainemons.be/
```

### 3. Configure Nginx

Create `/etc/nginx/sites-available/carte.lafontainemons.be`:

```nginx
server {
    listen 80;
    server_name carte.lafontainemons.be;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name carte.lafontainemons.be;

    ssl_certificate /etc/letsencrypt/live/carte.lafontainemons.be/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/carte.lafontainemons.be/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;

    root /var/www/carte.lafontainemons.be;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    access_log /var/log/nginx/carte.lafontainemons.be.access.log;
    error_log /var/log/nginx/carte.lafontainemons.be.error.log;
}
```

### 4. Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/carte.lafontainemons.be /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Setup

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d carte.lafontainemons.be
sudo systemctl enable certbot.timer
```

## Update Script

```bash
#!/bin/bash
cd /path/to/project/frontend
NODE_ENV=production yarn generate-env
yarn build:prod
cp -r dist/frontend/browser/* /var/www/carte.lafontainemons.be/
sudo systemctl reload nginx
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 502 Bad Gateway | Check backend is running |
| 404 for API calls | Verify proxy config |
| SSL errors | `sudo certbot renew` |

### Debug

```bash
sudo nginx -t
sudo tail -f /var/log/nginx/carte.lafontainemons.be.error.log
curl http://localhost:8080/api/sections
```

## Live Site

https://carte.lafontainemons.be
