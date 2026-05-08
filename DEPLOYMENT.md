# 🚀 Deployment Guide - Carisa Petshop CMS

Panduan lengkap untuk deploy aplikasi Carisa Petshop ke production.

## 📋 Prerequisites

- Node.js v16+
- MongoDB (local atau cloud)
- Domain (opsional)
- Server/Hosting

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

**Kelebihan:**
- Gratis untuk start
- Auto-deploy dari GitHub
- Mudah setup
- SSL otomatis

#### Deploy Backend ke Railway

1. **Buat account di [Railway.app](https://railway.app)**

2. **Create New Project**
   - Connect GitHub repository
   - Pilih repo `carisa-petshop-cms`

3. **Add MongoDB**
   - Add MongoDB plugin
   - Copy connection string

4. **Set Environment Variables**
```
PORT=5000
MONGODB_URI=<railway-mongodb-url>
JWT_SECRET=<your-secret-key>
NODE_ENV=production
CLIENT_URL=https://your-vercel-app.vercel.app
```

5. **Deploy**
   - Railway akan auto-deploy
   - Copy backend URL

#### Deploy Frontend ke Vercel

1. **Buat account di [Vercel.com](https://vercel.com)**

2. **Import Project**
   - Import dari GitHub
   - Pilih repo `carisa-petshop-cms`
   - Root Directory: `client`

3. **Set Environment Variables**
```
REACT_APP_API_URL=https://your-railway-app.railway.app/api
```

4. **Deploy**
   - Vercel akan auto-build dan deploy
   - Domain: `your-app.vercel.app`

---

### Option 2: Heroku (Full Stack)

**Kelebihan:**
- Full stack dalam satu platform
- Mudah manage
- Add-ons lengkap

#### Steps:

1. **Install Heroku CLI**
```bash
npm install -g heroku
heroku login
```

2. **Create Heroku App**
```bash
heroku create carisa-petshop
```

3. **Add MongoDB**
```bash
heroku addons:create mongolab:sandbox
```

4. **Set Environment Variables**
```bash
heroku config:set JWT_SECRET=your-secret-key
heroku config:set NODE_ENV=production
```

5. **Update package.json**
```json
{
  "scripts": {
    "start": "node server/index.js",
    "heroku-postbuild": "cd client && npm install && npm run build"
  }
}
```

6. **Deploy**
```bash
git push heroku main
```

7. **Open App**
```bash
heroku open
```

---

### Option 3: VPS (DigitalOcean, AWS, Linode)

**Kelebihan:**
- Full control
- Lebih murah untuk scale
- Custom configuration

#### Setup VPS (Ubuntu 22.04)

1. **Connect to VPS**
```bash
ssh root@your-server-ip
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install MongoDB**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

4. **Install PM2**
```bash
sudo npm install -g pm2
```

5. **Clone Repository**
```bash
cd /var/www
git clone https://github.com/KhatarMalayki/carisa-petshop-cms.git
cd carisa-petshop-cms
```

6. **Install Dependencies**
```bash
npm install
cd client && npm install && npm run build && cd ..
```

7. **Setup Environment**
```bash
nano .env
```
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/carisa-petshop
JWT_SECRET=your-secret-key
NODE_ENV=production
CLIENT_URL=http://your-domain.com
```

8. **Start with PM2**
```bash
pm2 start server/index.js --name carisa-api
pm2 startup
pm2 save
```

9. **Install Nginx**
```bash
sudo apt-get install nginx
```

10. **Configure Nginx**
```bash
sudo nano /etc/nginx/sites-available/carisa
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /var/www/carisa-petshop-cms/client/build;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploads
    location /uploads {
        alias /var/www/carisa-petshop-cms/uploads;
    }
}
```

11. **Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/carisa /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

12. **Setup SSL (Let's Encrypt)**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🔐 Security Checklist

- [ ] Ganti JWT_SECRET dengan random string yang kuat
- [ ] Ganti password admin default
- [ ] Enable HTTPS/SSL
- [ ] Setup firewall (UFW)
- [ ] Disable MongoDB remote access (jika tidak perlu)
- [ ] Setup backup database
- [ ] Enable rate limiting
- [ ] Setup monitoring (PM2, New Relic, dll)

## 📊 Monitoring

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
pm2 status
```

### MongoDB Backup
```bash
# Backup
mongodump --db carisa-petshop --out /backup/$(date +%Y%m%d)

# Restore
mongorestore --db carisa-petshop /backup/20260508/carisa-petshop
```

### Auto Backup Script
```bash
nano /root/backup-db.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --db carisa-petshop --out /backup/$DATE
find /backup -type d -mtime +7 -exec rm -rf {} \;
```

```bash
chmod +x /root/backup-db.sh
crontab -e
# Add: 0 2 * * * /root/backup-db.sh
```

## 🔄 Update Deployment

### Vercel/Railway
- Push ke GitHub, auto-deploy

### Heroku
```bash
git push heroku main
```

### VPS
```bash
cd /var/www/carisa-petshop-cms
git pull origin main
npm install
cd client && npm install && npm run build && cd ..
pm2 restart carisa-api
```

## 🆘 Troubleshooting

### Port sudah digunakan
```bash
sudo lsof -i :5000
sudo kill -9 <PID>
```

### MongoDB tidak jalan
```bash
sudo systemctl status mongod
sudo systemctl restart mongod
```

### PM2 tidak start setelah reboot
```bash
pm2 startup
pm2 save
```

### Nginx error
```bash
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

## 📞 Support

Jika ada masalah deployment, hubungi:
- Email: admin@carisa.id
- GitHub Issues: https://github.com/KhatarMalayki/carisa-petshop-cms/issues

---

**Good luck with your deployment! 🚀**
