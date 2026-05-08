const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user if not exists
  const adminExists = await prisma.user.findUnique({
    where: { email: 'admin@carisa.id' }
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        username: 'admin',
        email: 'admin@carisa.id',
        password: hashedPassword,
        role: 'admin'
      }
    });
    console.log('✅ Admin user created');
  }

  // Seed Services
  const servicesData = [
    {
      name: 'Pet Grooming',
      slug: 'pet-grooming',
      description: 'Layanan grooming lengkap untuk anak bulu kesayangan. Dari mandi, potong kuku, hingga styling bulu profesional.',
      price: 'Mulai dari Rp 50.000',
      features: JSON.stringify([
        'Mandi & Blow Dry',
        'Potong Kuku',
        'Pembersihan Telinga',
        'Styling Bulu',
        'Pembersihan Gigi',
        'Aromaterapi'
      ]),
      icon: '✂️',
      order: 1,
      active: true
    },
    {
      name: 'Pet Hotel',
      slug: 'pet-hotel',
      description: 'Penginapan nyaman dan aman untuk hewan peliharaan. Terpantau 24 jam dengan fasilitas lengkap.',
      price: 'Mulai dari Rp 75.000/hari',
      features: JSON.stringify([
        'Kandang Bersih & Nyaman',
        'Makanan 3x Sehari',
        'Monitoring 24 Jam',
        'Play Time',
        'Grooming Gratis',
        'Update Foto Harian'
      ]),
      icon: '🏨',
      order: 2,
      active: true
    },
    {
      name: 'Pet Care',
      slug: 'pet-care',
      description: 'Layanan kesehatan dan perawatan hewan. Konsultasi dokter hewan, vaksinasi, dan perawatan medis.',
      price: 'Mulai dari Rp 100.000',
      features: JSON.stringify([
        'Konsultasi Dokter Hewan',
        'Vaksinasi Lengkap',
        'Pemeriksaan Kesehatan',
        'Perawatan Luka',
        'Vitamin & Suplemen',
        'Emergency 24 Jam'
      ]),
      icon: '🏥',
      order: 3,
      active: true
    },
    {
      name: 'Pet Shop',
      slug: 'pet-shop',
      description: 'Toko perlengkapan hewan lengkap. Makanan, mainan, aksesoris, dan kebutuhan hewan peliharaan.',
      price: 'Harga Bersaing',
      features: JSON.stringify([
        'Makanan Premium',
        'Mainan Edukatif',
        'Aksesoris Lucu',
        'Kandang & Tempat Tidur',
        'Produk Kesehatan',
        'Gratis Konsultasi'
      ]),
      icon: '🛒',
      order: 4,
      active: true
    }
  ];

  for (const service of servicesData) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service
    });
  }
  console.log('✅ Services seeded');

  // Seed Locations
  const locationsData = [
    {
      name: 'Cabang BSD',
      slug: 'cabang-bsd',
      address: 'Jl. Griya Loka Raya Jl. Suplir No.F1 sektor 1.5, RW.17, BSD, Kec. Serpong, Kota Tangerang Selatan, Banten 15320',
      mapUrl: 'https://maps.app.goo.gl/EMYCuwJqdfsEbg3eA',
      phone: '021-xxx-xxxx',
      whatsapp: '628123456789',
      hours: '24 Jam Nonstop',
      services: JSON.stringify(['Grooming', 'Pet Hotel', 'Pet Shop', 'Pet Care']),
      active: true
    },
    {
      name: 'Cabang Sentraland',
      slug: 'cabang-sentraland',
      address: 'Jl. Nangka Raya No.33, Parung Panjang, Kec. Parung Panjang, Kabupaten Bogor, Jawa Barat 16360',
      mapUrl: 'https://maps.app.goo.gl/jAWV6capLwjmtoXm9',
      phone: '021-xxx-xxxx',
      whatsapp: '628123456789',
      hours: '24 Jam Nonstop',
      services: JSON.stringify(['Grooming', 'Pet Hotel', 'Pet Shop']),
      active: true
    },
    {
      name: 'Cabang Legok',
      slug: 'cabang-legok',
      address: 'Alfamart, Jl. Raya Parung Panjang, Caringin, Legok, Tangerang Regency, Banten',
      mapUrl: 'https://maps.app.goo.gl/NNZXBqaWmMxYoKkk9',
      phone: '021-xxx-xxxx',
      whatsapp: '628123456789',
      hours: '24 Jam Nonstop',
      services: JSON.stringify(['Grooming', 'Pet Shop']),
      active: true
    },
    {
      name: 'Cabang Bintaro',
      slug: 'cabang-bintaro',
      address: 'Jl. Sumatra No.135, Jombang, Kec. Ciputat, Kota Tangerang Selatan, Banten 15414',
      mapUrl: 'https://maps.app.goo.gl/ZxSq2UMDBCAwoBAG7',
      phone: '021-xxx-xxxx',
      whatsapp: '628123456789',
      hours: '24 Jam Nonstop',
      services: JSON.stringify(['Grooming', 'Pet Hotel', 'Pet Shop', 'Pet Care']),
      active: true
    }
  ];

  for (const location of locationsData) {
    await prisma.location.upsert({
      where: { slug: location.slug },
      update: location,
      create: location
    });
  }
  console.log('✅ Locations seeded');

  // Seed Posts
  const admin = await prisma.user.findUnique({
    where: { email: 'admin@carisa.id' }
  });

  if (admin) {
    const postsData = [
      {
        title: 'Carisa Petshop: Petshop Terpercaya dengan 4 Cabang & Layanan 24 Jam',
        slug: 'carisa-petshop-terpercaya-dengan-4-cabang',
        content: '<p>Mengapa Carisa Petshop Jadi Pilihan Utama Pecinta Hewan? Di tengah perkembangan pesat dunia pet care, Carisa Petshop hadir sebagai destinasi lengkap yang memenuhi semua kebutuhan hewan peliharaan dari makanan dan perlengkapan, hingga jasa grooming dan penitipan hewan 24 jam nonstop.</p><p>Dengan semangat "Karena Anak Bulu Juga Anak Sendiri", Carisa Petshop berkomitmen memberikan layanan terbaik dan penuh kasih untuk setiap hewan peliharaan.</p>',
        excerpt: 'Mengapa Carisa Petshop Jadi Pilihan Utama Pecinta Hewan? Di tengah perkembangan pesat dunia pet care, Carisa Petshop hadir sebagai destinasi lengkap...',
        category: 'tips-anabul',
        status: 'published',
        authorId: admin.id,
        publishedAt: new Date()
      },
      {
        title: 'Tips Petshop Grooming Aman Tanpa Stres untuk Anabul kamu',
        slug: 'petshop-grooming-anabul-carisa-petshop',
        content: '<p>Banyak pemilik anabul baik kucing maupun anjing masih menganggap grooming hanya sebatas memandikan, memotong bulu, atau membuat hewan terlihat wangi dan rapi. Padahal, grooming yang dilakukan dengan benar adalah bagian penting dari perawatan kesehatan fisik dan mental anabul.</p><p>Bahkan, dalam banyak kasus, grooming rutin dapat membantu mencegah penyakit serius sejak dini.</p>',
        excerpt: 'Banyak pemilik anabul baik kucing maupun anjing masih menganggap grooming hanya sebatas memandikan, memotong bulu, atau membuat hewan terlihat wangi dan rapi...',
        category: 'tips-anabul',
        status: 'published',
        authorId: admin.id,
        publishedAt: new Date()
      },
      {
        title: 'Ingin Kucingmu Panjang Umur? Ikuti Tips Perawatan Sederhana Ini!',
        slug: 'ingin-kucingmu-panjang-umur-ikuti-tips-pera',
        content: '<p>Kenapa Perawatan Tepat Bisa Membuat Kucing Panjang Umur. Setiap pemilik kucing tentu ingin anabul mereka hidup sehat, bahagia, dan menemani dalam waktu yang lama.</p><p>Namun pada kenyataannya, masih banyak pemilik kucing yang belum memahami faktor-faktor penting yang memengaruhi umur panjang hewan peliharaan ini. Mulai dari pola makan, lingkungan, hingga kebiasaan sederhana sehari-hari semuanya berperan besar.</p>',
        excerpt: 'Kenapa Perawatan Tepat Bisa Membuat Kucing Panjang Umur. Setiap pemilik kucing tentu ingin anabul mereka hidup sehat, bahagia, dan menemani dalam waktu yang lama...',
        category: 'tips-anabul',
        status: 'published',
        authorId: admin.id,
        publishedAt: new Date()
      }
    ];

    for (const post of postsData) {
      await prisma.post.upsert({
        where: { slug: post.slug },
        update: post,
        create: post
      });
    }
    console.log('✅ Posts seeded');
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
