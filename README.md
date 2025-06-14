# ShadowX - Universal Shortlink Bypasser

A modern, fast, and secure shortlink bypasser with universal hosting support.

## ⚡ Quick Start

```bash
# 1. Set up environment
cp example.env .env
# Edit .env and add your SOLAR_API_KEY

# 2. Install dependencies
npm install

# 3. Start the application
node start.js
```

The application will automatically detect your environment and run in the appropriate mode.

## 🚀 Features

- **Universal Hosting**: Deploy anywhere with environment variable configuration
- **Dual Themes**: Beautiful red and blue theme system
- **Rate Limiting**: Built-in protection against abuse
- **CORS Security**: Configurable cross-origin resource sharing
- **Health Monitoring**: `/api/health` endpoint for uptime monitoring
- **Auto-Detection**: Smart environment detection for development/production

## 🛠 Environment Variables

### Required
- `SOLAR_API_KEY` - Your Solar API key

### Optional
- `PORT` - Server port (default: 5000)
- `HOST` - Server host (default: 0.0.0.0)
- `NODE_ENV` - Environment (development/production)
- `BASE_URL` - Full application URL
- `CORS_ORIGIN` - Allowed origins (default: *)
- `RATE_LIMIT_MAX` - Requests per IP (default: 100/15min)

## 📦 Deployment

### Universal Start Script
The `start.js` file works on any platform:

```bash
# Development
NODE_ENV=development node start.js

# Production
npm run build
NODE_ENV=production node start.js
```

### Platform Examples

**Heroku**: Set environment variables and deploy
**Vercel**: Works with zero configuration
**Railway**: One-click deployment ready
**Docker**: Dockerfile included
**VPS**: SystemD service configuration provided

See `HOSTING.md` for detailed platform-specific instructions.

## 🔧 Development

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Production server
node start.js        # Universal start script
```

## 📋 API Endpoints

- `POST /api/bypass` - Bypass shortlink URLs
- `GET /api/config` - Get website configuration
- `GET /api/health` - Health check for monitoring
- `POST /api/config/update` - Update configuration (admin)

## 🛡 Security Features

- Rate limiting on API endpoints
- CORS protection
- Input validation with Zod schemas
- Environment-based configuration
- Production-ready error handling

## 📖 Documentation

- `HOSTING.md` - Complete hosting guide
- `example.env` - Environment configuration template
- `replit.md` - Technical architecture details

## ⚙ Technical Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Build**: Vite + ESBuild
- **Validation**: Zod schemas
- **State**: React Query
- **UI**: shadcn/ui components

## 🔗 Supported Services

Supports all major shortlink services including:
- Linkvertise
- Lootlabs/Admaven
- mboost, rekonise, socialwolvez
- sub2get, sub2unlock, sub4unlock
- adfoc.us, unlocknow.net
- Mediafire direct downloads
- And many more...

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

For detailed hosting instructions and platform-specific deployment guides, see [HOSTING.md](HOSTING.md).