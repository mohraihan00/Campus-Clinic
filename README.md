# Campus Clinic

Sistem Antrian dan Reservasi Klinik Kampus berbasis web dengan arsitektur modern yang memisahkan **Backend (Laravel)** dan **Frontend (React)**. Sistem ini ditujukan sebagai tugas akhir dari mata kuliah Web Framework dari kelompok 1 ganjil.

## Deskripsi

Campus Clinic adalah aplikasi web untuk mengelola antrian dan reservasi pasien di klinik kampus. Aplikasi ini memungkinkan:

- **Pasien**: Mendaftar, login, membuat reservasi, dan melihat status antrian
- **Dokter**: Melihat daftar pasien, mengelola antrian, dan update status pemeriksaan
- **Admin**: Mengelola data dokter, pasien, dan laporan klinik
- **Staff**: Membantu operasional sehari-hari klinik

## Tech Stack

### Backend
- **Framework**: Laravel 12
- **PHP**: ^8.2
- **Database**: SQLite / MySQL / PostgreSQL
- **Authentication**: Laravel Sanctum

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **State Management**: React Query
- **HTTP Client**: Axios


## Cara Menjalankan

### Prasyarat
- PHP >= 8.2
- Composer
- Node.js >= 18
- npm atau yarn

### 1. Clone Repository
```bash
git clone https://github.com/mohraihan00/Campus-Clinic.git
cd Campus-Clinic
```

### 2. Setup Backend (Laravel)
```bash
# Masuk ke folder backend
cd backend

# Install dependencies
composer install

# Copy file environment
cp .env.example .env

# Generate application key
php artisan key:generate

# Jalankan migrasi database
php artisan migrate

# (Opsional) Jalankan seeder untuk data dummy
php artisan db:seed

# Jalankan server backend
php artisan serve
```
Backend akan berjalan di: `http://localhost:8000`

### 3. Setup Frontend (React)
```bash
# Buka terminal baru, masuk ke folder frontend
cd frontend

# Install dependencies
npm install

# Jalankan development server
npm run dev
```
Frontend akan berjalan di: `http://localhost:5173`

## API Endpoints

Base URL: `http://localhost:8000/api`

| Method | Endpoint           | Deskripsi              |
|--------|-------------------|------------------------|
| POST   | /register         | Registrasi user baru   |
| POST   | /login            | Login user             |
| POST   | /logout           | Logout user            |
| GET    | /user             | Get current user       |
| GET    | /doctors          | Daftar dokter          |
| GET    | /reservations     | Daftar reservasi       |
| POST   | /reservations     | Buat reservasi baru    |
| GET    | /queue/current    | Antrian saat ini       |

## Build untuk Production

### Frontend
```bash
cd frontend
npm run build
```
Hasil build akan berada di folder `frontend/dist/`

