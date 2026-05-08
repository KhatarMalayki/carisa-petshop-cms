# 🚀 Setup Carisa Petshop CMS dengan Laragon

Panduan lengkap menjalankan project ini menggunakan Laragon di Windows.

## 📋 Prerequisites

- ✅ Laragon (sudah terinstall)
- ✅ Node.js (akan diinstall via Laragon)
- ✅ MongoDB (akan diinstall via Laragon)

---

## 🔧 Step 1: Install Node.js di Laragon

1. **Buka Laragon**

2. **Install Node.js**
   - Klik kanan icon Laragon di system tray
   - Menu → Tools → Quick add → Node.js
   - Pilih versi terbaru (v18 atau v20)
   - Tunggu sampai selesai download & install

3. **Verify Node.js**
   ```bash
   # Buka Laragon Terminal (Cmder)
   node --version
   npm --version
   ```

---

## 🍃 Step 2: Install MongoDB di Laragon

### Option A: Install via Laragon (Recommended)

1. **Download MongoDB**
   - Klik kanan icon Laragon
   - Menu → Tools → Quick add → MongoDB
   - Atau download manual dari: https://www.mongodb.com/try/download/community

2. **Extract MongoDB**
   - Extract ke folder: `C:\laragon\bin\mongodb\mongodb-6.0`
   - Struktur folder:
     ```
     C:\laragon\bin\mongodb\
     └── mongodb-6.0\
         └── bin\
             ├── mongod.exe
             └── mongo.exe
     ```

3. **Start MongoDB**
   - Laragon akan auto-detect MongoDB
   - Klik "Start All" di Laragon
   - MongoDB akan jalan di port 27017

### Option B: MongoDB Atlas (Cloud - Gratis)

Jika tidak mau install MongoDB lokal:

1. Buat account di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Buat cluster gratis
3. Whitelist IP: `0.0.0.0/0` (allow all)
4. Buat database user
5. Copy connection string
6. Paste ke `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carisa-petshop
   ```

---

## 📂 Step 3: Setup Project

### 1. Clone/Copy Project ke Laragon

```bash
# Buka Laragon Terminal (Cmder)
cd C:\laragon\www

# Clone dari GitHub
git clone https://github.com/KhatarMalayki/carisa-petshop-cms.git

# Atau copy folder project yang sudah ada
# Paste ke: C:\laragon\www\carisa-petshop-cms
```

### 2. Install Dependencies

```bash
cd carisa-petshop-cms

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Setup Environment Variables

```bash
# Copy .env.example ke .env
copy .env.example .env

# Edit .env
notepad .env
```

**Isi .env:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/carisa-petshop
JWT_SECRET=carisa-secret-key-2026-change-this
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

---

## 🚀 Step 4: Jalankan Aplikasi

### Option A: Jalankan Terpisah (Recommended untuk Development)

**Terminal 1 - Backend:**
```bash
cd C:\laragon\www\carisa-petshop-cms
npm run server
```

**Terminal 2 - Frontend:**
```bash
cd C:\laragon\www\carisa-petshop-cms\client
npm start
```

### Option B: Jalankan Bersamaan

```bash
cd C:\laragon\www\carisa-petshop-cms
npm run dev
```

**Catatan:** Jika `npm run dev` error, install dulu:
```bash
npm install concurrently --save-dev
```

---

## 👤 Step 5: Buat Admin User

### Via Laragon Terminal:

```bash
# Pastikan backend sudah jalan
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"email\":\"admin@carisa.id\",\"password\":\"admin123\",\"role\":\"admin\"}"
```

### Via Postman (Lebih Mudah):

1. **Download Postman** (jika belum ada)
2. **Create Request:**
   - Method: `POST`
   - URL: `http://localhost:5000/api/auth/register`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "username": "admin",
       "email": "admin@carisa.id",
       "password": "admin123",
       "role": "admin"
     }
     ```
3. **Send**

### Via Browser (Thunder Client Extension di VS Code):

1. Install extension "Thunder Client"
2. Buat request seperti di Postman

---

## 🌐 Step 6: Akses Aplikasi

### Frontend (Public)
- **Homepage**: http://localhost:3000
- **Blog**: http://localhost:3000/tips-anabul
- **Layanan**: http://localhost:3000/layanan
- **Lokasi**: http://localhost:3000/lokasi
- **Booking**: http://localhost:3000/booking

### Admin Panel
- **Login**: http://localhost:3000/admin/login
- **Dashboard**: http://localhost:3000/admin
- **Email**: admin@carisa.id
- **Password**: admin123

### Backend API
- **Health Check**: http://localhost:5000/api/health
- **API Docs**: Lihat [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 🔍 Troubleshooting

### ❌ Error: MongoDB connection failed

**Solusi:**
```bash
# Check MongoDB status di Laragon
# Klik "Start All" di Laragon

# Atau start manual
cd C:\laragon\bin\mongodb\mongodb-6.0\bin
mongod --dbpath C:\laragon\data\mongodb
```

### ❌ Error: Port 5000 already in use

**Solusi:**
```bash
# Ganti port di .env
PORT=5001

# Atau kill process yang pakai port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### ❌ Error: Port 3000 already in use

**Solusi:**
```bash
# React akan otomatis tanya mau pakai port lain
# Ketik: y

# Atau kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### ❌ Error: npm install gagal

**Solusi:**
```bash
# Clear npm cache
npm cache clean --force

# Install ulang
rm -rf node_modules package-lock.json
npm install
```

### ❌ Error: Cannot find module

**Solusi:**
```bash
# Install dependencies yang kurang
npm install

# Untuk client
cd client
npm install
```

---

## 🎯 Tips Laragon

### 1. Auto Start Services

- Buka Laragon
- Menu → Preferences → General
- ✅ Check "Auto start Laragon"
- ✅ Check "Auto start services"

### 2. Quick Terminal

- Klik kanan icon Laragon
- "Terminal" atau tekan `Ctrl + Alt + T`

### 3. MongoDB GUI (Optional)

Install MongoDB Compass untuk GUI:
- Download: https://www.mongodb.com/try/download/compass
- Connect ke: `mongodb://localhost:27017`

### 4. VS Code Integration

```bash
# Buka project di VS Code dari Laragon Terminal
cd C:\laragon\www\carisa-petshop-cms
code .
```

---

## 📊 Struktur Folder di Laragon

```
C:\laragon\
├── bin\
│   ├── nodejs\
│   │   └── node-18\
│   └── mongodb\
│       └── mongodb-6.0\
├── data\
│   └── mongodb\          # MongoDB data
└── www\
    └── carisa-petshop-cms\    # Project kita
        ├── server\
        ├── client\
        ├── uploads\
        └── ...
```

---

## 🔄 Development Workflow

### 1. Start Development

```bash
# Buka Laragon Terminal
cd C:\laragon\www\carisa-petshop-cms

# Terminal 1: Backend
npm run server

# Terminal 2: Frontend (buka terminal baru)
cd client
npm start
```

### 2. Edit Code

- Edit file di VS Code
- Browser auto-reload (React Hot Reload)
- Backend auto-restart (nodemon)

### 3. Test API

- Gunakan Postman atau Thunder Client
- Atau test langsung di browser

### 4. Check Database

- Buka MongoDB Compass
- Connect: `mongodb://localhost:27017`
- Database: `carisa-petshop`

---

## 🚀 Production Build

### Build Frontend

```bash
cd C:\laragon\www\carisa-petshop-cms\client
npm run build
```

Build akan ada di: `client/build/`

### Test Production Build

```bash
# Set environment
set NODE_ENV=production

# Start server
cd C:\laragon\www\carisa-petshop-cms
node server/index.js
```

Akses: http://localhost:5000

---

## 📝 Checklist Setup

- [ ] Laragon terinstall
- [ ] Node.js terinstall di Laragon
- [ ] MongoDB terinstall/running
- [ ] Project di `C:\laragon\www\`
- [ ] Dependencies terinstall (`npm install`)
- [ ] `.env` sudah dikonfigurasi
- [ ] Backend jalan di port 5000
- [ ] Frontend jalan di port 3000
- [ ] Admin user sudah dibuat
- [ ] Bisa login ke admin panel

---

## 🎉 Selesai!

Sekarang kamu bisa:
- ✅ Develop dengan Laragon
- ✅ Edit code dengan hot reload
- ✅ Test API dengan Postman
- ✅ Manage database dengan Compass
- ✅ Deploy ke production

---

## 📞 Butuh Bantuan?

- **GitHub Issues**: https://github.com/KhatarMalayki/carisa-petshop-cms/issues
- **Email**: admin@carisa.id
- **Dokumentasi**:
  - [README.md](README.md)
  - [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
  - [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Happy Coding with Laragon! 🚀**
