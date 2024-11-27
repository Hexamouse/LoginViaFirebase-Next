'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full py-3 shadow-lg">
      <div className="container mx-auto text-center px-4">
        {/* Copyright */}
        <p className="text-x font-normal mb-4 text-[#A388EE]">
          &copy; {new Date().getFullYear()} Dzikri Maulana. All rights reserved.
        </p>
      </div>
    </footer>
  );
}