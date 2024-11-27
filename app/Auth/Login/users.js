// app/Auth/Login/UsersFetcher.js
import fs from 'fs';
import path from 'path';

// Fungsi untuk mengambil data pengguna dari file JSON
export async function fetchUsers() {
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileData);
}