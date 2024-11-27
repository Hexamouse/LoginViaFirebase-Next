// app/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect otomatis ke halaman login
    router.push('/Auth/Login');
  }, [router]);

  return null; // Tidak ada tampilan, karena langsung di-redirect
}