# Setup Instructions - Under Armour E-Commerce Platform

## Current Status

✅ **Frontend**: Node.js and npm installed, package.json fixed
✅ **Backend**: Laravel structure ready, composer.json configured
❌ **PHP**: Not installed on system
❌ **Composer**: Not installed on system

---

## Prerequisites Installation

### 1. Install PHP 8.2+

**Windows**:
- Download from: https://windows.php.net/download/
- Or use Chocolatey: `choco install php`
- Or use XAMPP/WAMP/LARAVEL VALET

**Verify Installation**:
```bash
php -v
```

### 2. Install Composer

**Windows**:
- Download installer from: https://getcomposer.org/download/
- Run the installer
- Or use Chocolatey: `choco install composer`

**Verify Installation**:
```bash
composer -v
```

### 3. Install MySQL 8.0+

**Windows**:
- Download from: https://dev.mysql.com/downloads/mysql/
- Or use Chocolatey: `choco install mysql`
- Or use XAMPP/WAMP

**Verify Installation**:
```bash
mysql --version
```

---

## Backend Setup (After PHP/Composer Installation)

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Install PHP Dependencies
```bash
composer install
```

### Step 3: Setup Environment
```bash
cp .env.example .env
```

### Step 4: Generate Application Key
```bash
php artisan key:generate
```

### Step 5: Create Database
```bash
mysql -u root -p
CREATE DATABASE under_armour;
EXIT;
```

### Step 6: Run Migrations
```bash
php artisan migrate
```

### Step 7: Start Backend Server
```bash
php artisan serve
```

**Backend will be available at**: `http://localhost:8000`

---

## Frontend Setup

### Step 1: Navigate to Frontend
```bash
cd under-armour
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

**Frontend will be available at**: `http://localhost:5173`

---

## Running Both Servers

### Terminal 1 (Backend):
```bash
cd backend
php artisan serve
```

### Terminal 2 (Frontend):
```bash
cd under-armour
npm run dev
```

---

## Troubleshooting

### PHP Not Found
- Ensure PHP is installed and added to PATH
- Restart terminal after installation
- Check: `php -v`

### Composer Not Found
- Ensure Composer is installed and added to PATH
- Restart terminal after installation
- Check: `composer -v`

### MySQL Connection Error
- Ensure MySQL is running
- Check credentials in `.env`
- Verify database exists: `CREATE DATABASE under_armour;`

### npm install Hangs
- Try: `npm install --no-optional`
- Or: `npm cache clean --force` then `npm install`
- Check internet connection

### Port Already in Use
- Backend: `php artisan serve --port=8001`
- Frontend: `npm run dev -- --port 5174`

---

## API Testing

Once both servers are running:

### Get Products
```bash
curl http://localhost:8000/api/products
```

### Search Products
```bash
curl "http://localhost:8000/api/products/search?q=shoes"
```

### Get New Arrivals
```bash
curl http://localhost:8000/api/products/new-arrivals
```

---

## Next Steps

1. ✅ Install PHP, Composer, MySQL
2. ✅ Run backend setup commands
3. ✅ Run frontend setup commands
4. ✅ Start both servers
5. ✅ Open http://localhost:5173 in browser
6. ✅ Test API endpoints

---

**For detailed documentation**, see:
- [Setup Guide](./docs/SETUP.md)
- [API Reference](./docs/API.md)
- [Architecture](./docs/ARCHITECTURE.md)
