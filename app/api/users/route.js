// pages/api/users.js

export default function handler(req, res) {
    const users = [
      { username: 'cikunek0045', password: 'Gemscool092!' },
      { username: 'TyoAbdullah123', password: '12345' },
      { username: 'RinoFebrian123', password: '12345' },
      { username: 'ReyhanMaulana123', password: '12345' },
    ];
  
    res.status(200).json(users);
  }  