"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userGender, setUserGender] = useState<string | null>(null);

  useEffect(() => {
    // Luăm userul curent din Supabase
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
      setUserName(user?.user_metadata?.full_name || null);
      
      // Extragem sexul salvat (căutăm sub cheia 'gender' sau 'sex')
      setUserGender(user?.user_metadata?.gender || user?.user_metadata?.sex || null);
    };
    
    fetchUser();

    // Ascultăm schimbările de sesiune (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
      setUserName(session?.user?.user_metadata?.full_name || null);
      setUserGender(session?.user?.user_metadata?.gender || session?.user?.user_metadata?.sex || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { userId, userName, userGender };
}