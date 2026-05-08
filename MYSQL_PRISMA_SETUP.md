# 🚀 Setup dengan MySQL + Prisma (Lebih Gampang!)

Panduan lengkap menggunakan **MySQL + Prisma** yang jauh lebih mudah daripada MongoDB!

## ✨ Kenapa MySQL + Prisma?

✅ **MySQL sudah built-in di Laragon** - Tinggal klik Start!
✅ **Prisma ORM super mudah** - Gak perlu nulis SQL manual
✅ **Auto-complete & Type-safe** - Lebih aman dari typo
✅ **Prisma Studio** - GUI gratis untuk manage database
✅ **Migration otomatis** - Gak perlu bikin table manual
✅ **Familiar** - Kalau udah pernah pakai MySQL, langsung paham

---

## ⚡ Quick Start (5 Menit)

### 1️⃣ Pastikan MySQL Jalan di Laragon

```bash
# Buka Laragon
# Klik "Start All"
# MySQL akan jalan otomatis di port 3306
```

✅ MySQL sudah jalan!

---

### 2️⃣ Copy Project ke Laragon

```bash
cd C:\laragon\www
git clone https://github.com/KhatarMalayki/carisa-petshop-cms.git
cd carisa-petshop-cms
```

---

### 3️⃣ Install Dependencies (Backend MySQL)

```bash
# Install backend dengan Prisma
cd server-mysql
npm install
```

---

### 4️⃣ Setup Environment

```bash
# Copy .env
copy .env.example .env
```

**Isi .env:**
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# MySQL di Laragon (default tanpa password)
DATABASE_URL="mysql://root:@localhost:3306/carisa_petshop"

# Jika MySQL pakai password:
# DATABASE_URL="mysql://root:password@localhost:3306/carisa_petshop"

JWT_SECRET=carisa-secret-2026
```

---

### 5️⃣ Buat Database & Run Migration

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migration (otomatis bikin database & tables)
npm run prisma:migrate

# Ketik nama migration: "init"
```

✅ **Database & tables otomatis terbuat!**

---

### 6️⃣ Jalankan Backend

```bash
# Di folder server-mysql
npm run dev
```

✅ Backend jalan di: http://localhost:5000

---

### 7️⃣ Jalankan Frontend

**Buka terminal baru:**
```bash
cd C:\laragon\www\carisa-petshop-cms\client
npm install
npm start
```

✅ Frontend jalan di: http://localhost:3000

---

### 8️⃣ Buat Admin User

**Pakai Postman:**
- Method: `POST`
- URL: `http://localhost:5000/api/auth/register`
- Body (JSON):
```json
{
  "username": "admin",
  "email": "admin@carisa.id",
  "password": "admin123",
  "role": "admin"
}
```

**Atau pakai curl:**
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"email\":\"admin@carisa.id\",\"password\":\"admin123\",\"role\":\"admin\"}"
```

---

### 9️⃣ Login ke Admin

- Buka: http://localhost:3000/admin
- Email: `admin@carisa.id`
- Password: `admin123`

---

## 🎉 Selesai!

Sekarang kamu punya:
- ✅ MySQL database (gampang dikelola)
- ✅ Prisma ORM (gak perlu nulis SQL)
- ✅ Prisma Studio (GUI gratis)
- ✅ Backend API jalan
- ✅ Frontend React jalan
- ✅ Admin panel siap pakai

---

## 🎯 Keuntungan Prisma

### 1. Gak Perlu Nulis SQL Manual

**Tanpa Prisma (SQL manual):**
```sql
SELECT * FROM posts 
WHERE status = 'published' 
ORDER BY createdAt DESC 
LIMIT 10;
```

**Dengan Prisma:**
```javascript
const posts = await prisma.post.findMany({
  where: { status: 'published' },
  orderBy: { createdAt: 'desc' },
  take: 10
});
```

### 2. Auto-complete & Type-safe

```javascript
// Prisma tahu semua field yang ada
const post = await prisma.post.create({
  data: {
    title: "...",
    slug: "...",
    // Auto-complete muncul!
  }
});
```

### 3. Relasi Mudah

```javascript
// Get post dengan author
const post = await prisma.post.findUnique({
  where: { id: 1 },
  include: {
    author: true  // Otomatis join!
  }
});
```

### 4. Migration Otomatis

```bash
# Ubah schema.prisma
# Jalankan migration
npm run prisma:migrate

# Prisma otomatis update database!
```

---

## 🛠️ Prisma Studio (GUI Database)

**Buka GUI untuk manage database:**
```bash
cd server-mysql
npm run prisma:studio
```

Buka: http://localhost:5555

✨ **Fitur Prisma Studio:**
- ✅ Lihat semua data
- ✅ Edit data langsung
- ✅ Tambah data baru
- ✅ Delete data
- ✅ Filter & search
- ✅ Gak perlu phpMyAdmin!

---

## 📊 Database Schema

Prisma schema ada di: `server-mysql/prisma/schema.prisma`

```prisma
model Post {
  id             Int       @id @default(autoincrement())
  title          String
  slug           String    @unique
  content        String    @db.LongText
  status         String    @default("draft")
  
  authorId       Int
  author         User      @relation(fields: [authorId], references: [id])
}
```

**Gampang dibaca & diubah!**

---

## 🔄 Cara Update Schema

### 1. Edit schema.prisma

```prisma
model Post {
  id      Int    @id @default(autoincrement())
  title   String
  // Tambah field baru
  views   Int    @default(0)
}
```

### 2. Run Migration

```bash
npm run prisma:migrate
# Ketik nama: "add_views_field"
```

✅ **Database otomatis update!**

---

## 📝 Contoh Query Prisma

### Create
```javascript
const post = await prisma.post.create({
  data: {
    title: "Tips Merawat Kucing",
    slug: "tips-merawat-kucing",
    content: "...",
    authorId: 1
  }
});
```

### Read
```javascript
// Get all
const posts = await prisma.post.findMany();

// Get by ID
const post = await prisma.post.findUnique({
  where: { id: 1 }
});

// Get with filter
const posts = await prisma.post.findMany({
  where: {
    status: 'published',
    category: 'tips-anabul'
  }
});
```

### Update
```javascript
const post = await prisma.post.update({
  where: { id: 1 },
  data: {
    title: "New Title",
    status: "published"
  }
});
```

### Delete
```javascript
await prisma.post.delete({
  where: { id: 1 }
});
```

### Count
```javascript
const total = await prisma.post.count({
  where: { status: 'published' }
});
```

---

## 🔍 Troubleshooting

### ❌ Error: Can't reach database server

**Solusi:**
```bash
# Pastikan MySQL jalan di Laragon
# Klik "Start All"

# Test connection
mysql -u root -p
# (Enter jika gak ada password)
```

### ❌ Error: Database does not exist

**Solusi:**
```bash
# Buat database manual
mysql -u root -p
CREATE DATABASE carisa_petshop;
exit;

# Atau biarkan Prisma yang bikin
npm run prisma:migrate
```

### ❌ Error: Prisma Client not generated

**Solusi:**
```bash
npm run prisma:generate
```

### ❌ Error: Migration failed

**Solusi:**
```bash
# Reset database
npx prisma migrate reset

# Run migration lagi
npm run prisma:migrate
```

---

## 🆚 Perbandingan: MongoDB vs MySQL+Prisma

| Feature | MongoDB | MySQL + Prisma |
|---------|---------|----------------|
| **Setup** | Install MongoDB | ✅ Built-in Laragon |
| **Learning Curve** | Medium | ✅ Easy |
| **Query** | MongoDB syntax | ✅ JavaScript native |
| **GUI** | MongoDB Compass | ✅ Prisma Studio (gratis) |
| **Type Safety** | ❌ No | ✅ Yes |
| **Auto-complete** | ❌ No | ✅ Yes |
| **Migration** | Manual | ✅ Automatic |
| **Relasi** | Manual populate | ✅ Auto join |
| **Familiar** | NoSQL | ✅ SQL (lebih umum) |

---

## 📂 Struktur Folder

```
carisa-petshop-cms/
├── server-mysql/              # Backend MySQL + Prisma
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── routes/                # API routes
│   ├── middleware/            # Auth middleware
│   ├── index.js               # Server entry
│   └── package.json
│
├── client/                    # Frontend React (sama)
└── uploads/                   # Uploaded images
```

---

## 🚀 Deploy ke Production

### 1. Build Frontend
```bash
cd client
npm run build
```

### 2. Setup Production Database
```bash
# Update .env
DATABASE_URL="mysql://user:password@host:3306/database"

# Run migration
npm run prisma:migrate
```

### 3. Start Server
```bash
cd server-mysql
NODE_ENV=production node index.js
```

---

## 💡 Tips Prisma

### 1. Seed Database
Buat file `prisma/seed.js` untuk data awal:
```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.service.createMany({
    data: [
      { name: "Pet Grooming", slug: "pet-grooming", ... },
      { name: "Pet Hotel", slug: "pet-hotel", ... },
    ]
  });
}

main();
```

Run: `npm run prisma:seed`

### 2. Backup Database
```bash
# Export
mysqldump -u root carisa_petshop > backup.sql

# Import
mysql -u root carisa_petshop < backup.sql
```

### 3. Prisma Format
```bash
# Format schema.prisma
npx prisma format
```

---

## 📞 Butuh Bantuan?

- **Prisma Docs**: https://www.prisma.io/docs
- **GitHub**: https://github.com/KhatarMalayki/carisa-petshop-cms
- **Email**: admin@carisa.id

---

## 🎉 Kesimpulan

**MySQL + Prisma** jauh lebih gampang karena:
- ✅ MySQL sudah ada di Laragon
- ✅ Prisma ORM mudah dipelajari
- ✅ Gak perlu nulis SQL manual
- ✅ Type-safe & auto-complete
- ✅ Prisma Studio gratis
- ✅ Migration otomatis

**Recommended untuk pemula!** 🚀

---

**Happy Coding with Prisma! 🎉**
