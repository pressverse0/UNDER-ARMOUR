# Docker Setup & Deployment Guide

## Overview

This project includes complete Docker configuration for containerized development and production deployment.

### Services Included

- **Backend API** (PHP 8.2-FPM + Laravel 11)
- **Nginx** (Web server & reverse proxy)
- **MySQL 8.0** (Database)
- **Redis 7** (Cache & queue)
- **Mailpit** (Email testing)
- **Frontend** (Node.js + React)

---

## Prerequisites

- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)
- Git

---

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/Mostafa-SAID7/UNDER-ARMOUR.git
cd UNDER-ARMOUR
```

### 2. Setup Environment
```bash
cp .env.example .env
```

### 3. Build and Start Containers
```bash
docker-compose up -d
```

### 4. Run Database Migrations
```bash
docker-compose exec backend php artisan migrate
```

### 5. Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost/api
- **Mailpit**: http://localhost:8025
- **MySQL**: localhost:3306

---

## Docker Compose Services

### Backend Service

**Image**: Custom PHP 8.2-FPM image
**Port**: 9000 (internal)
**Environment**: Production-ready configuration

```bash
# View logs
docker-compose logs -f backend

# Execute command
docker-compose exec backend php artisan tinker

# Run migrations
docker-compose exec backend php artisan migrate

# Seed database
docker-compose exec backend php artisan db:seed
```

### Nginx Service

**Image**: nginx:alpine
**Ports**: 80 (HTTP), 443 (HTTPS)
**Configuration**: `backend/docker/nginx/conf.d/app.conf`

```bash
# View logs
docker-compose logs -f nginx

# Reload configuration
docker-compose exec nginx nginx -s reload
```

### MySQL Service

**Image**: mysql:8.0
**Port**: 3306
**Configuration**: `backend/docker/mysql/my.cnf`

```bash
# Access MySQL CLI
docker-compose exec mysql mysql -u under_armour -p

# Backup database
docker-compose exec mysql mysqldump -u under_armour -p under_armour > backup.sql

# Restore database
docker-compose exec mysql mysql -u under_armour -p under_armour < backup.sql
```

### Redis Service

**Image**: redis:7-alpine
**Port**: 6379

```bash
# Access Redis CLI
docker-compose exec redis redis-cli

# Check memory usage
docker-compose exec redis redis-cli info memory

# Flush cache
docker-compose exec redis redis-cli FLUSHALL
```

### Mailpit Service

**Image**: axllent/mailpit:latest
**Ports**: 1025 (SMTP), 8025 (Web UI)
**URL**: http://localhost:8025

All emails sent during development are captured here.

### Frontend Service

**Image**: Custom Node.js image
**Port**: 5173
**Mode**: Development with hot reload

```bash
# View logs
docker-compose logs -f frontend

# Rebuild frontend
docker-compose up -d --build frontend
```

---

## Common Commands

### Start Services
```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d backend

# Start with logs
docker-compose up
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop specific service
docker-compose stop backend
```

### View Logs
```bash
# View all logs
docker-compose logs

# Follow logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100
```

### Execute Commands
```bash
# Run artisan command
docker-compose exec backend php artisan <command>

# Run npm command
docker-compose exec frontend npm <command>

# Access shell
docker-compose exec backend sh
docker-compose exec frontend sh
```

### Database Operations
```bash
# Run migrations
docker-compose exec backend php artisan migrate

# Rollback migrations
docker-compose exec backend php artisan migrate:rollback

# Seed database
docker-compose exec backend php artisan db:seed

# Fresh migration
docker-compose exec backend php artisan migrate:fresh --seed
```

### Build & Rebuild
```bash
# Build images
docker-compose build

# Rebuild specific service
docker-compose build backend

# Rebuild and restart
docker-compose up -d --build
```

---

## Environment Configuration

### Root .env File
```env
DB_DATABASE=under_armour
DB_USERNAME=under_armour
DB_PASSWORD=password
REDIS_PASSWORD=null
```

### Backend .env.docker
Located at `backend/.env.docker` - automatically used in Docker

Key settings:
- `APP_ENV=production`
- `DB_HOST=mysql` (Docker service name)
- `CACHE_DRIVER=redis`
- `QUEUE_CONNECTION=redis`
- `MAIL_HOST=mailpit`

---

## Production Deployment

### 1. Build Production Images
```bash
docker-compose build --no-cache
```

### 2. Set Production Environment
```bash
# Update .env with production values
DB_PASSWORD=<strong-password>
REDIS_PASSWORD=<strong-password>
APP_KEY=<generated-key>
STRIPE_PUBLIC_KEY=<your-key>
STRIPE_SECRET_KEY=<your-key>
```

### 3. Deploy to Server
```bash
# Push images to registry
docker tag under-armour-backend:latest myregistry/under-armour-backend:latest
docker push myregistry/under-armour-backend:latest

# Pull and run on server
docker-compose pull
docker-compose up -d
```

### 4. Run Migrations
```bash
docker-compose exec backend php artisan migrate --force
```

### 5. Optimize for Production
```bash
docker-compose exec backend php artisan config:cache
docker-compose exec backend php artisan route:cache
docker-compose exec backend php artisan view:cache
```

---

## Health Checks

All services include health checks:

```bash
# View health status
docker-compose ps

# Check specific service
docker inspect under-armour-backend --format='{{.State.Health.Status}}'
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :80
lsof -i :3306

# Change port in docker-compose.yml
ports:
  - "8080:80"  # Use 8080 instead of 80
```

### Database Connection Error
```bash
# Check MySQL is running
docker-compose ps mysql

# Check logs
docker-compose logs mysql

# Restart MySQL
docker-compose restart mysql
```

### Frontend Not Building
```bash
# Clear node_modules and reinstall
docker-compose exec frontend rm -rf node_modules
docker-compose exec frontend npm install

# Rebuild
docker-compose up -d --build frontend
```

### Permission Issues
```bash
# Fix storage permissions
docker-compose exec backend chmod -R 755 storage bootstrap/cache
docker-compose exec backend chown -R www-data:www-data storage bootstrap/cache
```

### Out of Disk Space
```bash
# Clean up Docker
docker system prune -a

# Remove unused volumes
docker volume prune
```

---

## Monitoring

### View Resource Usage
```bash
docker stats
```

### View Container Details
```bash
docker-compose ps
docker inspect under-armour-backend
```

### View Network
```bash
docker network ls
docker network inspect under-armour_under-armour
```

---

## Backup & Restore

### Backup Database
```bash
docker-compose exec mysql mysqldump -u under_armour -p under_armour > backup.sql
```

### Restore Database
```bash
docker-compose exec mysql mysql -u under_armour -p under_armour < backup.sql
```

### Backup Volumes
```bash
docker run --rm -v under-armour_mysql_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/mysql_backup.tar.gz -C /data .
```

---

## Security Best Practices

### 1. Use Strong Passwords
```env
DB_PASSWORD=<generate-strong-password>
REDIS_PASSWORD=<generate-strong-password>
```

### 2. Limit Port Exposure
```yaml
# Only expose necessary ports
ports:
  - "80:80"      # Nginx
  - "443:443"    # Nginx HTTPS
  # Don't expose MySQL, Redis to public
```

### 3. Use Environment Variables
- Never commit `.env` file
- Use `.env.example` as template
- Rotate secrets regularly

### 4. Keep Images Updated
```bash
docker-compose pull
docker-compose up -d
```

### 5. Enable HTTPS
- Add SSL certificate to `backend/docker/nginx/ssl/`
- Update nginx configuration
- Redirect HTTP to HTTPS

---

## Performance Optimization

### 1. Resource Limits
```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

### 2. Caching
- Redis configured for cache and queue
- Nginx caching enabled for static files
- Browser caching headers configured

### 3. Database Optimization
- Indexes configured in `my.cnf`
- Query optimization enabled
- Connection pooling configured

---

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Docker Build & Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build images
        run: docker-compose build
      - name: Push to registry
        run: docker push myregistry/under-armour-backend:latest
```

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Laravel Docker Guide](https://laravel.com/docs/deployment#docker)
- [Nginx Configuration](https://nginx.org/en/docs/)

---

For setup instructions, see [SETUP.md](./SETUP.md)
For architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md)
