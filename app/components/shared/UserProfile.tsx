"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function UserProfile() {
  const router = useRouter();
  const [initial, setInitial] = useState('U');

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.full_name) {
        setInitial(user.user_metadata.full_name.charAt(0).toUpperCase());
      } else if (user?.email) {
        setInitial(user.email.charAt(0).toUpperCase());
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth'); // Îl trimitem la pagina de login creată anterior
  };

  return (
    <button
      onClick={handleLogout}
      title="Deconectare"
      className="h-12 w-12 rounded-full bg-gradient-to-tr from-fuchsia-600 to-purple-600 p-[2px] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(217,70,239,0.3)] group"
    >
      <div className="h-full w-full bg-black rounded-full flex items-center justify-center overflow-hidden relative">
        {/* Litera inițială */}
        <span className="text-white font-black text-lg group-hover:opacity-0 transition-opacity absolute">
          {initial}
        </span>
        {/* Iconița de Logout pe hover */}
        <LogOut className="text-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity absolute" size={20} />
      </div>
    </button>
  );
}