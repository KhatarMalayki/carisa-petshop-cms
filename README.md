# Carisa Petshop - React/Node.js CMS

Website Carisa Petshop yang dibangun dengan React dan Node.js, menggantikan WordPress dengan fitur admin panel lengkap.

## 🚀 Fitur Utama

### Frontend (React)
- ✅ Homepage dengan design mirip carisa.id
- ✅ Halaman Layanan (Pet Grooming, Pet Hotel, Pet Care, Pet Shop)
- ✅ Halaman Lokasi Cabang (BSD, Sentraland, Legok, Bintaro)
- ✅ Blog/Tips Anabul dengan kategori
- ✅ Form Booking Online
- ✅ Responsive Design
- ✅ SEO Friendly

### Backend (Node.js + Express + MongoDB)
- ✅ RESTful API
- ✅ Authentication & Authorization (JWT)
- ✅ CRUD untuk Posts, Pages, Services, Locations
- ✅ Booking Management
- ✅ Image Upload
- ✅ MongoDB Database

### Admin Panel (seperti /wp-admin)
- ✅ Dashboard dengan statistik
- ✅ Manage Posts (Create, Edit, Delete, Publish)
- ✅ Manage Pages
- ✅ Manage Services
- ✅ Manage Locations
- ✅ Manage Bookings
- ✅ Rich Text Editor (React Quill)
- ✅ Image Upload
- ✅ User Authentication

## 📦 Teknologi

**Frontend:**
- React 18
- React Router DOM
- Axios
- React Quill (Rich Text Editor)
- React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (File Upload)
- bcryptjs (Password Hashing)

## 🛠️ Instalasi

### Prerequisites
- Node.js (v16 atau lebih baru)
- MongoDB (local atau cloud)
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd carisa-petshop
```

### 2. Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd client
npm install
cd ..
```

### 3. Setup Environment Variables

Buat file `.env` di root folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/carisa-petshop
JWT_SECRET=your-secret-key-change-this
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 4. Setup MongoDB

**Option 1: MongoDB Local**
- Install MongoDB di komputer
- Jalankan MongoDB service

**Option 2: MongoDB Atlas (Cloud)**
- Buat account di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Buat cluster baru
- Copy connection string ke `.env`

### 5. Create Admin User

Jalankan server dulu, lalu register admin via API:

```bash
# Jalankan server
npm run server

# Di terminal lain, register admin
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@carisa.id",
    "password": "admin123",
    "role": "admin"
  }'
```

Atau gunakan Postman/Insomnia untuk register.

### 6. Jalankan Aplikasi

**Development Mode (Backend + Frontend):**
```bash
npm run dev
```

**Atau jalankan terpisah:**

Backend:
```bash
npm run server
```

Frontend (terminal baru):
```bash
npm run client
```

**Akses:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:3000/admin

## 📱 Struktur Folder

```
carisa-petshop/
├── client/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       │   ├── admin/      # Admin pages
│       │   ├── Home.js
│       │   ├── Blog.js
│       │   └── ...
│       ├── utils/          # API utilities
│       └── App.js
├── server/                 # Node.js Backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   └── index.js           # Server entry
├── uploads/               # Uploaded images
├── .env                   # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Admin Panel

### Login
- URL: http://localhost:3000/admin/login
- Email: admin@carisa.id
- Password: admin123 (ganti setelah login pertama)

### Fitur Admin:
1. **Dashboard** - Statistik dan quick actions
2. **Posts** - Manage blog posts/tips anabul
3. **Pages** - Manage static pages
4. **Services** - Manage layanan (grooming, hotel, dll)
5. **Locations** - Manage cabang/lokasi
6. **Bookings** - Manage booking pelanggan

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:slug` - Get single post
- `POST /api/posts` - Create post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)

### Pages
- `GET /api/pages` - Get all pages
- `GET /api/pages/:slug` - Get single page
- `POST /api/pages` - Create page (protected)
- `PUT /api/pages/:id` - Update page (protected)
- `DELETE /api/pages/:id` - Delete page (protected)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:slug` - Get single service
- `POST /api/services` - Create service (protected)
- `PUT /api/services/:id` - Update service (protected)
- `DELETE /api/services/:id` - Delete service (protected)

### Locations
- `GET /api/locations` - Get all locations
- `GET /api/locations/:slug` - Get single location
- `POST /api/locations` - Create location (protected)
- `PUT /api/locations/:id` - Update location (protected)
- `DELETE /api/locations/:id` - Delete location (protected)

### Bookings
- `GET /api/bookings` - Get all bookings (protected)
- `POST /api/bookings` - Create booking (public)
- `PUT /api/bookings/:id` - Update booking (protected)
- `DELETE /api/bookings/:id` - Delete booking (protected)

### Upload
- `POST /api/upload` - Upload image (protected)

## 🚀 Deployment

### Build Production

```bash
# Build frontend
cd client
npm run build

# Set environment
export NODE_ENV=production
```

### Deploy Options:

**1. Vercel (Frontend) + Railway (Backend)**
- Frontend: Deploy ke Vercel
- Backend: Deploy ke Railway
- Database: MongoDB Atlas

**2. Heroku (Full Stack)**
```bash
heroku create carisa-petshop
heroku addons:create mongolab
git push heroku main
```

**3. VPS (DigitalOcean, AWS, dll)**
- Setup Node.js
- Setup MongoDB
- Setup Nginx reverse proxy
- Setup PM2 untuk process management

## 📝 Changelog

### Version 1.0.0 (2026-05-08)
- ✅ Initial release
- ✅ Frontend React dengan design mirip carisa.id
- ✅ Backend Node.js + Express + MongoDB
- ✅ Admin panel lengkap (seperti WordPress)
- ✅ CRUD Posts, Pages, Services, Locations
- ✅ Booking system
- ✅ Authentication & Authorization
- ✅ Image upload
- ✅ Responsive design
- ✅ Pushed to GitHub: https://github.com/KhatarMalayki/carisa-petshop-cms

## 🎯 Cara Menggunakan

### Quick Start

1. **Clone & Install**
```bash
git clone https://github.com/KhatarMalayki/carisa-petshop-cms.git
cd carisa-petshop-cms
npm install
cd client && npm install && cd ..
```

2. **Setup Database**
- Install MongoDB atau gunakan MongoDB Atlas
- Copy `.env.example` ke `.env` dan sesuaikan

3. **Jalankan**
```bash
npm run dev
```

4. **Buat Admin User**
```bash
# Register via API atau gunakan Postman
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@carisa.id","password":"admin123","role":"admin"}'
```

5. **Login ke Admin**
- Buka http://localhost:3000/admin
- Login dengan email & password yang dibuat

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 👨‍💻 Developer

Developed with ❤️ for Carisa Petshop

## 📞 Support

Untuk pertanyaan atau bantuan:
- Email: admin@carisa.id
- WhatsApp: [Your WhatsApp]

---

**Catatan:** Jangan lupa ganti password admin dan JWT_SECRET di production!
