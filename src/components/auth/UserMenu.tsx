'use client';

import { User } from 'lucide-react';

export default function UserMenu() {
  return (
    <button className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white">
      <User size={16} />
    </button>
  );
}