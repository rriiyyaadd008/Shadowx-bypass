# ShadowX Hosting Guide

This guide helps you deploy ShadowX on any hosting platform using environment variables for configuration.

## Environment Variables

### Required
- `SOLAR_API_KEY` - Your Solar API key for bypassing shortlinks

### Optional Hosting Configuration
- `PORT` - Server port (default: 5000)
- `HOST` - Server host (default: 0.0.0.0)
- `NODE_ENV` - Environment mode (development/production)
- `BASE_URL` - Full base URL of your site (e.g., https://mysite.com)

### Security & Performance
- `CORS_ORIGIN` - Allowed CORS origins (default: *)
- `RATE_LIMIT_WINDOW_MS` - Rate limit window in milliseconds (default: 900000 = 15 minutes)
- `RATE_LIMIT_MAX` - Max requests per window (default: 100)

### SSL Configuration (Optional)
- `SSL_ENABLED` - Enable SSL (true/false)
- `SSL_CERT_PATH` - Path to SSL certificate
- `SSL_KEY_PATH` - Path to SSL private key

## Quick Start

Use the universal start script for any platform:
```bash
# Copy environment configuration
cp example.env .env
# Edit .env with your settings (especially SOLAR_API_KEY)

# For development
NODE_ENV=development node start.js

# For production
npm run build
NODE_ENV=production node start.js
```

## Platform-Specific Deployment

### Replit
```bash
# Set SOLAR_API_KEY in Secrets
npm run build
node start.js
```

### Heroku
```bash
# Set environment variables
heroku config:set SOLAR_API_KEY=your_key_here
heroku config:set NODE_ENV=production
heroku config:set BASE_URL=https://yourapp.herokuapp.com

# Deploy
git push heroku main
```

### Vercel
```json
// vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server/index.js"
    }
  ]
}
```

### Railway
```bash
# Set environment variables in Railway dashboard
SOLAR_API_KEY=your_key_here
NODE_ENV=production
BASE_URL=https://yourapp.railway.app
```

### DigitalOcean App Platform
```yaml
# .do/app.yaml
name: shadowx
services:
- name: web
  source_dir: /
  github:
    repo: your-repo
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: SOLAR_API_KEY
    value: your_key_here
    type: SECRET
```

### Docker
```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t shadowx .
docker run -p 5000:5000 -e SOLAR_API_KEY=your_key shadowx
```

### VPS/Dedicated Server
```bash
# Install dependencies
npm ci
npm run build

# Create systemd service
sudo nano /etc/systemd/system/shadowx.service
```

```ini
[Unit]
Description=ShadowX Shortlink Bypasser
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/shadowx
ExecStart=/usr/bin/node dist/index.js
Restart=on-failure
Environment=NODE_ENV=production
Environment=SOLAR_API_KEY=your_key_here
Environment=PORT=5000
Environment=HOST=0.0.0.0

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl enable shadowx
sudo systemctl start shadowx
```

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure `SOLAR_API_KEY`
- [ ] Set appropriate `CORS_ORIGIN` for security
- [ ] Configure rate limiting based on expected traffic
- [ ] Set up SSL if using custom domain
- [ ] Configure monitoring and logging
- [ ] Set up backup strategy for configuration
- [ ] Test all endpoints after deployment

## Monitoring

The application logs important information:
- Server startup with host, port, and environment
- API request logs with timing and status codes
- Rate limiting violations
- CORS policy violations

## Troubleshooting

### Common Issues
1. **Port already in use**: Change `PORT` environment variable
2. **CORS errors**: Set `CORS_ORIGIN` to your domain
3. **Rate limiting**: Adjust `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW_MS`
4. **API failures**: Verify `SOLAR_API_KEY` is correct

### Health Check Endpoint
```bash
curl http://your-domain/api/config
# Should return website configuration
```