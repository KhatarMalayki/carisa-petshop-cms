# ⚡ Quick Start dengan Laragon

Panduan super cepat untuk langsung jalankan project ini di Laragon.

## 🎯 Langkah Cepat (5 Menit)

### 1️⃣ Pastikan Laragon Sudah Siap

```bash
# Buka Laragon
# Pastikan sudah ada:
✅ Node.js (v16+)
✅ MongoDB (atau pakai MongoDB Atlas)
```

**Belum ada?** Install via Laragon:
- Klik kanan icon Laragon → Tools → Quick add → Node.js
- Klik kanan icon Laragon → Tools → Quick add → MongoDB

---

### 2️⃣ Copy Project ke Laragon

```bash
# Buka Laragon Terminal (Cmder)
cd C:\laragon\www

# Clone dari GitHub
git clone https://github.com/KhatarMalayki/carisa-petshop-cms.git
cd carisa-petshop-cms
```

**Atau** copy folder project yang sudah ada ke `C:\laragon\www\`

---

### 3️⃣ Install Dependencies

```bash
# Install backend
npm install

# Install frontend
cd client
npm install
cd ..
```

⏱️ **Tunggu 2-3 menit** (tergantung internet)

---

### 4️⃣ Setup Environment

```bash
# Copy .env
copy .env.example .env
```

**Edit .env** (pakai notepad atau VS Code):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/carisa-petshop
JWT_SECRET=carisa-secret-2026
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

💡 **Pakai MongoDB Atlas?** Ganti `MONGODB_URI` dengan connection string dari Atlas.

---

### 5️⃣ Start MongoDB (jika pakai lokal)

- Buka Laragon
- Klik **"Start All"**
- MongoDB akan jalan otomatis

---

### 6️⃣ Jalankan Aplikasi

**Buka 2 Terminal:**

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

✅ **Backend**: http://localhost:5000
✅ **Frontend**: http://localhost:3000

---

### 7️⃣ Buat Admin User

**Pakai Postman** (paling mudah):

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
3. **Send** ✅

**Atau pakai curl:**
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"email\":\"admin@carisa.id\",\"password\":\"admin123\",\"role\":\"admin\"}"
```

---

### 8️⃣ Login ke Admin Panel

1. Buka: **http://localhost:3000/admin**
2. Email: `admin@carisa.id`
3. Password: `admin123`
4. **Login** ✅

---

## 🎉 Selesai!

Sekarang kamu bisa:

### Public Pages:
- 🏠 **Homepage**: http://localhost:3000
- 📝 **Blog**: http://localhost:3000/tips-anabul
- 🛠️ **Layanan**: http://localhost:3000/layanan
- 📍 **Lokasi**: http://localhost:3000/lokasi
- 📅 **Booking**: http://localhost:3000/booking

### Admin Panel:
- 🔐 **Login**: http://localhost:3000/admin/login
- 📊 **Dashboard**: http://localhost:3000/admin
- 📝 **Posts**: http://localhost:3000/admin/posts
- 📄 **Pages**: http://localhost:3000/admin/pages
- 🛠️ **Services**: http://localhost:3000/admin/services
- 📍 **Locations**: http://localhost:3000/admin/locations
- 📅 **Bookings**: http://localhost:3000/admin/bookings

---

## 🔧 Troubleshooting Cepat

### ❌ MongoDB connection failed
```bash
# Start MongoDB di Laragon
# Klik "Start All"
```

### ❌ Port already in use
```bash
# Ganti port di .env
PORT=5001
```

### ❌ npm install error
```bash
npm cache clean --force
npm install
```

### ❌ Module not found
```bash
# Install ulang
npm install
cd client && npm install
```

---

## 📚 Dokumentasi Lengkap

Butuh info lebih detail? Baca:
- 🪟 [LARAGON_SETUP.md](LARAGON_SETUP.md) - Setup lengkap Laragon
- 📖 [README.md](README.md) - Dokumentasi utama
- 📡 [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference

---

## 💡 Tips

### Auto Start
Biar gak perlu start manual tiap kali:
- Laragon → Preferences → General
- ✅ Auto start Laragon
- ✅ Auto start services

### VS Code
```bash
# Buka project di VS Code
cd C:\laragon\www\carisa-petshop-cms
code .
```

### MongoDB GUI
Install **MongoDB Compass** untuk lihat database:
- Download: https://www.mongodb.com/try/download/compass
- Connect: `mongodb://localhost:27017`

---

## 🚀 Next Steps

1. ✅ Buat beberapa posts di admin
2. ✅ Upload gambar
3. ✅ Tambah services & locations
4. ✅ Test booking form
5. ✅ Customize tampilan sesuai kebutuhan

---

**Happy Coding! 🎉**

Butuh bantuan? Buka [GitHub Issues](https://github.com/KhatarMalayki/carisa-petshop-cms/issues)
