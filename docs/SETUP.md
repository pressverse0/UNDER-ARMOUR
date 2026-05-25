# Under Armour - Setup & Installation Guide

## Prerequisites

Before starting, ensure you have installed:

- **PHP 8.2+** - [Download](https://www.php.net/downloads)
- **Composer** - [Download](https://getcomposer.org/download/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **MySQL 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download](https://git-scm.com/downloads)

## Project Structure

```
UNDER-ARMOUR/
├── backend/                    # Laravel API
├── under-armour/               # React Frontend
├── docs/                       # Documentation
└── README.md                   # Main documentation
```

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd UNDER-ARMOUR/backend
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Generate Application Key

```bash
php artisan key:generate
```

### 4. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
APP_NAME="Under Armour"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=under_armour
DB_USERNAME=root
DB_PASSWORD=your_password

STRIPE_PUBLIC_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:8000
```

### 5. Create Database

```bash
mysql -u root -p
CREATE DATABASE under_armour;
EXIT;
```

### 6. Run Migrations

```bash
php artisan migrate
```

### 7. Seed Sample Data (Optional)

```bash
php artisan db:seed
```

### 8. Start Backend Server

```bash
php artisan serve
```

Backend available at: `http://localhost:8000`

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd UNDER-ARMOUR/under-armour
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Frontend available at: `http://localhost:5173`

## Verify Installation

### Test Backend API

```bash
# Get all products
curl http://localhost:8000/api/products

# Search products
curl "http://localhost:8000/api/products/search?q=shoes"

# Get new arrivals
curl http://localhost:8000/api/products/new-arrivals
```

### Test Frontend

Open `http://localhost:5173` in your browser and verify:
- ✅ Products load correctly
- ✅ Navigation works
- ✅ Cart functionality works
- ✅ No console errors

## Stripe Integration

### 1. Create Stripe Account

Visit [Stripe Dashboard](https://dashboard.stripe.com) and sign up.

### 2. Get API Keys

- Navigate to Developers → API Keys
- Copy your test keys

### 3. Update .env

```env
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### 4. Test Payments

Use Stripe test card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Expiry**: Any future date
- **CVC**: Any 3 digits

## Common Commands

### Backend

```bash
# Start development server
php artisan serve

# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Seed database
php artisan db:seed

# Run tests
php artisan test

# Clear cache
php artisan cache:clear
```

### Frontend

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve

# Type check
npm run typecheck
```

## Troubleshooting

### Backend Issues

**Database Connection Error**
```
Error: SQLSTATE[HY000] [2002] Connection refused
```
Solution: Ensure MySQL is running and credentials in `.env` are correct.

**Permission Denied**
```
Error: Permission denied for storage/logs
```
Solution:
```bash
chmod -R 775 storage bootstrap/cache
```

**Port Already in Use**
```
Error: Address already in use
```
Solution:
```bash
php artisan serve --port=8001
```

### Frontend Issues

**Module Not Found**
```
Error: Cannot find module '@/components'
```
Solution:
```bash
npm install
npm run dev
```

**Port Already in Use**
```
Error: Port 5173 is already in use
```
Solution:
```bash
npm run dev -- --port 5174
```

## Development Workflow

### 1. Start Both Servers

Terminal 1 (Backend):
```bash
cd UNDER-ARMOUR/backend
php artisan serve
```

Terminal 2 (Frontend):
```bash
cd UNDER-ARMOUR/under-armour
npm run dev
```

### 2. Make Changes

- Edit backend files in `backend/app/`
- Edit frontend files in `under-armour/src/`
- Changes auto-reload in development

### 3. Test Changes

- Test API endpoints with curl or Postman
- Test frontend in browser
- Check console for errors

### 4. Commit Changes

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Database Management

### View Database

```bash
mysql -u root -p under_armour
SHOW TABLES;
DESCRIBE products;
```

### Reset Database

```bash
php artisan migrate:refresh
php artisan db:seed
```

### Backup Database

```bash
mysqldump -u root -p under_armour > backup.sql
```

### Restore Database

```bash
mysql -u root -p under_armour < backup.sql
```

## Production Deployment

### Backend Deployment

1. Set environment to production:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   ```

2. Run migrations:
   ```bash
   php artisan migrate --force
   ```

3. Cache configuration:
   ```bash
   php artisan config:cache
   php artisan route:cache
   ```

4. Optimize autoloader:
   ```bash
   composer install --optimize-autoloader --no-dev
   ```

### Frontend Deployment

1. Build for production:
   ```bash
   npm run build
   ```

2. Deploy `dist/` folder to web server

3. Configure web server to serve `index.html` for all routes

## Environment Variables

### Backend (.env)

```env
# Application
APP_NAME=Under Armour
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=under_armour
DB_USERNAME=root
DB_PASSWORD=

# Cache
CACHE_DRIVER=file

# Queue
QUEUE_CONNECTION=sync

# Mail
MAIL_MAILER=log

# Stripe
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Frontend
FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:8000
```

## Next Steps

1. ✅ Complete backend setup
2. ✅ Complete frontend setup
3. ✅ Configure Stripe
4. ✅ Test all features
5. ✅ Deploy to production

---

For API documentation, see [API.md](./API.md)
For architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md)
