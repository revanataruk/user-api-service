API Layanan Pengguna (User Service API)
Deskripsi Proyek
Proyek ini adalah sebuah layanan API sederhana yang dibangun sebagai Final Project Bootcamp. API ini menyediakan fungsionalitas dasar untuk manajemen pengguna, termasuk registrasi, login dengan autentikasi JWT, pengelolaan data pengguna, serta implementasi soft delete.

Proyek ini di-deploy secara lokal dan dijalankan di latar belakang menggunakan PM2, serta dapat diakses secara publik melalui terowongan Ngrok.

Fitur Utama
🔑 Registrasi dan Login Pengguna.

🔐 Autentikasi menggunakan JSON Web Token (JWT).

👤 Mendapatkan dan Memperbarui Data Pengguna (Endpoint terproteksi).

🔄 Mengubah Status Pengguna (Aktif / Tidak Aktif).

🗑️ Implementasi Soft Delete pada data pengguna.

🚀 Dijalankan secara persisten menggunakan PM2.

Teknologi yang Digunakan
Backend: Node.js, Express.js

Database: PostgreSQL

ORM: Sequelize

Autentikasi: JSON Web Token (jsonwebtoken)

Password Hashing: bcrypt.js

Process Manager: PM2

Tunneling: Ngrok

Instalasi & Setup Lokal
Untuk menjalankan proyek ini di lingkungan lokal, ikuti langkah-langkah berikut:

Clone repository ini:

Bash

git clone https://github.com/NAMA_ANDA/NAMA_REPO_ANDA.git
Masuk ke direktori proyek:

Bash

cd nama-folder-proyek
Install semua dependency yang dibutuhkan:

Bash

npm install
Setup Database:

Pastikan Anda sudah menginstall dan menjalankan PostgreSQL.

Buat sebuah database baru di pgAdmin dengan nama user_api_dev (atau nama lain yang sesuai).

Buat file .env:

Salin isi dari file .env.example di bawah ini ke dalam sebuah file baru bernama .env.

Sesuaikan nilainya dengan konfigurasi database lokal Anda.

Menjalankan Aplikasi
Untuk mode development:

Bash

node app.js
Server akan berjalan di http://localhost:3000.

Untuk mode produksi lokal dengan PM2:

Bash

# Menjalankan aplikasi di background
pm2 start app.js --name "user-api"

# Memantau status
pm2 list
Contoh File .env
Buat file .env di root direktori dan isi seperti berikut:

# Konfigurasi Database
DB_USER=postgres
DB_PASS=password_database_anda
DB_NAME=user_api_dev
DB_HOST=localhost
DB_DIALECT=postgres

# Konfigurasi Aplikasi & JWT
PORT=3000
JWT_SECRET=ini_adalah_kunci_rahasia_jwt_anda
Dokumentasi Endpoint API
Berikut adalah daftar endpoint yang tersedia:

1. Registrasi Pengguna
Endpoint: POST /api/register

Deskripsi: Mendaftarkan pengguna baru.

Body (raw/json):

JSON

{
    "fullName": "Nama Lengkap Anda",
    "email": "email@anda.com",
    "password": "passwordrahasia"
}
Respon Sukses (201 Created):

JSON

{
    "message": "User registered successfully!",
    "user": {
        "id": 1,
        "fullName": "Nama Lengkap Anda",
        "email": "email@anda.com"
    }
}
2. Login Pengguna
Endpoint: POST /api/login

Deskripsi: Melakukan login dan mendapatkan JWT Token.

Body (raw/json):

JSON

{
    "email": "email@anda.com",
    "password": "passwordrahasia"
}
Respon Sukses (200 OK):

JSON

{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
3. Mendapatkan Data Pengguna
Endpoint: GET /api/users/:id

Deskripsi: Mendapatkan detail satu pengguna.

Autentikasi: Memerlukan Bearer Token.

Respon Sukses (200 OK):

JSON

{
    "id": 1,
    "fullName": "Nama Lengkap Anda",
    "email": "email@anda.com",
    "status": "Active"
}
4. Update Data Pengguna
Endpoint: PUT /api/users/:id

Deskripsi: Memperbarui data pengguna (contoh: nama lengkap).

Autentikasi: Memerlukan Bearer Token.

Body (raw/json):

JSON

{
    "fullName": "Nama Baru Saya"
}
Respon Sukses (200 OK):

JSON

{
    "message": "User updated successfully",
    "user": { ... }
}
5. Hapus Pengguna (Soft Delete)
Endpoint: DELETE /api/users/:id

Deskripsi: Melakukan soft delete pada pengguna. Data tidak hilang dari database, hanya ditandai sebagai terhapus.

Autentikasi: Memerlukan Bearer Token.

Respon Sukses (200 OK):

JSON

{
    "message": "User successfully soft-deleted."
}
