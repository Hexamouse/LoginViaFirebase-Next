import fs from 'fs';
import path from 'path';

export async function fetchUsers() {
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileData);
}
