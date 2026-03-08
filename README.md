# My Project

This repository contains a **full-stack web application** with:

- **Backend:** Laravel (PHP) + MySQL  
- **Frontend:** Next.js (React)  

---

## Project Structure
my-project/
│
├── backend/ # Laravel backend
│ ├── app/
│ ├── routes/
│ ├── database/
│ └── ...
│
├── frontend/ # Next.js frontend
│ ├── pages/
│ ├── components/
│ ├── public/
│ └── ...
│
├── .gitignore
└── README.md

## Prerequisites

- PHP >= 8.0
- Composer
- Node.js >= 18
- npm or yarn
- MySQL Database

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://https://github.com/Asif-siddiqui-1995/laravel-nextjs-admin-dashboard
cd my-project

cd backend
composer install
cp .env.example .env
php artisan key:generate

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

php artisan migrate

php artisan serve

for FrontEnd 
cd ../frontend
npm install  
npm run dev
