# 📚 API Documentation - Carisa Petshop CMS

Base URL: `http://localhost:5000/api` (development)

## 🔐 Authentication

Semua endpoint yang memerlukan authentication harus menyertakan JWT token di header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 👤 Authentication Endpoints

### Register User
```http
POST /api/auth/register
```

**Body:**
```json
{
  "username": "admin",
  "email": "admin@carisa.id",
  "password": "admin123",
  "role": "admin"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "email": "admin@carisa.id",
    "role": "admin"
  }
}
```

### Login
```http
POST /api/auth/login
```

**Body:**
```json
{
  "email": "admin@carisa.id",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "email": "admin@carisa.id",
    "role": "admin"
  }
}
```

### Get Current User
```http
GET /api/auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "email": "admin@carisa.id",
    "role": "admin"
  }
}
```

---

## 📝 Posts Endpoints

### Get All Posts
```http
GET /api/posts?status=published&category=tips-anabul&limit=10&page=1
```

**Query Parameters:**
- `status` (optional): `draft` | `published`
- `category` (optional): string
- `limit` (optional): number (default: 10)
- `page` (optional): number (default: 1)

**Response:**
```json
{
  "posts": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Tips Merawat Kucing",
      "slug": "tips-merawat-kucing",
      "content": "<p>Content here...</p>",
      "excerpt": "Short description",
      "featuredImage": "/uploads/image.jpg",
      "category": "tips-anabul",
      "author": {
        "_id": "507f1f77bcf86cd799439012",
        "username": "admin"
      },
      "status": "published",
      "publishedAt": "2026-05-08T10:00:00.000Z",
      "createdAt": "2026-05-08T09:00:00.000Z",
      "updatedAt": "2026-05-08T10:00:00.000Z"
    }
  ],
  "total": 25,
  "page": 1,
  "pages": 3
}
```

### Get Single Post
```http
GET /api/posts/:slug
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Tips Merawat Kucing",
  "slug": "tips-merawat-kucing",
  "content": "<p>Full content here...</p>",
  "excerpt": "Short description",
  "featuredImage": "/uploads/image.jpg",
  "category": "tips-anabul",
  "author": {
    "_id": "507f1f77bcf86cd799439012",
    "username": "admin"
  },
  "status": "published",
  "publishedAt": "2026-05-08T10:00:00.000Z",
  "createdAt": "2026-05-08T09:00:00.000Z",
  "updatedAt": "2026-05-08T10:00:00.000Z"
}
```

### Create Post (Protected)
```http
POST /api/posts
```

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "title": "Tips Merawat Kucing",
  "slug": "tips-merawat-kucing",
  "content": "<p>Content here...</p>",
  "excerpt": "Short description",
  "featuredImage": "/uploads/image.jpg",
  "category": "tips-anabul",
  "status": "published"
}
```

### Update Post (Protected)
```http
PUT /api/posts/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Body:** Same as Create Post

### Delete Post (Protected)
```http
DELETE /api/posts/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

---

## 📄 Pages Endpoints

### Get All Pages
```http
GET /api/pages?status=published
```

### Get Single Page
```http
GET /api/pages/:slug
```

### Create Page (Protected)
```http
POST /api/pages
```

**Body:**
```json
{
  "title": "About Us",
  "slug": "about-us",
  "content": "<p>Content here...</p>",
  "template": "default",
  "status": "published"
}
```

### Update Page (Protected)
```http
PUT /api/pages/:id
```

### Delete Page (Protected)
```http
DELETE /api/pages/:id
```

---

## 🛠️ Services Endpoints

### Get All Services
```http
GET /api/services
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Pet Grooming",
    "slug": "pet-grooming",
    "description": "Layanan grooming lengkap",
    "price": "Mulai dari Rp 50.000",
    "features": [
      "Mandi & Blow Dry",
      "Potong Kuku",
      "Pembersihan Telinga"
    ],
    "icon": "🐾",
    "image": "/uploads/grooming.jpg",
    "order": 1,
    "active": true,
    "createdAt": "2026-05-08T09:00:00.000Z"
  }
]
```

### Get Single Service
```http
GET /api/services/:slug
```

### Create Service (Protected)
```http
POST /api/services
```

**Body:**
```json
{
  "name": "Pet Grooming",
  "slug": "pet-grooming",
  "description": "Layanan grooming lengkap",
  "price": "Mulai dari Rp 50.000",
  "features": ["Mandi & Blow Dry", "Potong Kuku"],
  "order": 1,
  "active": true
}
```

### Update Service (Protected)
```http
PUT /api/services/:id
```

### Delete Service (Protected)
```http
DELETE /api/services/:id
```

---

## 📍 Locations Endpoints

### Get All Locations
```http
GET /api/locations
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Cabang BSD",
    "slug": "cabang-bsd",
    "address": "Jl. Griya Loka Raya...",
    "mapUrl": "https://maps.app.goo.gl/...",
    "phone": "021-xxx-xxxx",
    "whatsapp": "628xxx",
    "hours": "24 Jam",
    "services": ["Grooming", "Pet Hotel", "Pet Shop"],
    "active": true,
    "createdAt": "2026-05-08T09:00:00.000Z"
  }
]
```

### Get Single Location
```http
GET /api/locations/:slug
```

### Create Location (Protected)
```http
POST /api/locations
```

### Update Location (Protected)
```http
PUT /api/locations/:id
```

### Delete Location (Protected)
```http
DELETE /api/locations/:id
```

---

## 📅 Bookings Endpoints

### Get All Bookings (Protected)
```http
GET /api/bookings?status=pending&limit=20&page=1
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "bookings": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "customerName": "John Doe",
      "phone": "08123456789",
      "email": "john@example.com",
      "petName": "Fluffy",
      "petType": "kucing",
      "service": "Pet Grooming",
      "location": "Cabang BSD",
      "bookingDate": "2026-05-10T10:00:00.000Z",
      "notes": "Kucing takut air",
      "status": "pending",
      "createdAt": "2026-05-08T09:00:00.000Z"
    }
  ],
  "total": 50,
  "page": 1,
  "pages": 3
}
```

### Create Booking (Public)
```http
POST /api/bookings
```

**Body:**
```json
{
  "customerName": "John Doe",
  "phone": "08123456789",
  "email": "john@example.com",
  "petName": "Fluffy",
  "petType": "kucing",
  "service": "Pet Grooming",
  "location": "Cabang BSD",
  "bookingDate": "2026-05-10T10:00:00.000Z",
  "notes": "Kucing takut air"
}
```

### Update Booking (Protected)
```http
PUT /api/bookings/:id
```

**Body:**
```json
{
  "status": "confirmed"
}
```

**Status Options:**
- `pending`
- `confirmed`
- `completed`
- `cancelled`

### Delete Booking (Protected)
```http
DELETE /api/bookings/:id
```

---

## 📤 Upload Endpoint

### Upload Image (Protected)
```http
POST /api/upload
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body:**
```
image: <file>
```

**Response:**
```json
{
  "url": "/uploads/1715164800000-123456789.jpg",
  "filename": "1715164800000-123456789.jpg"
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "No authentication token, access denied"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## 🧪 Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@carisa.id","password":"admin123"}'
```

### Get Posts
```bash
curl http://localhost:5000/api/posts?status=published
```

### Create Post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Post",
    "slug": "test-post",
    "content": "<p>Test content</p>",
    "status": "published"
  }'
```

---

## 📝 Notes

- Semua timestamps dalam format ISO 8601
- File upload maksimal 5MB
- Supported image formats: JPEG, JPG, PNG, GIF, WEBP
- Rate limiting: 100 requests per 15 minutes (bisa dikonfigurasi)

---

**Happy Coding! 🚀**
