'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { supabase } from '@/src/lib/supabase';
import { HealthAnalysis } from '@/src/types';
import HealthModal from '@/src/components/modals/HealthModal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SanatatePage() {
  const { userId } = useAuth();
  const [history, setHistory] = useState<HealthAnalysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<HealthAnalysis | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  const fetchHistory = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('health_analyses')
      .select('*')
      .eq('user_id', userId)
      .order('analysis_date', { ascending: true });

    if (data && !error) {
      setHistory(data as HealthAnalysis[]);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    if (!userId) {
      alert("Eroare: Utilizatorul nu a fost complet încărcat. Așteaptă o secundă și reîncearcă!");
      return;
    }
    
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    
    const previousScore = history.length > 0 ? history[history.length - 1].general_score.toString() : '';
    if (previousScore) formData.append('previousScore', previousScore);

    // Extragem parametrii anteriori pentru comparație AI detaliată per-analiză
    const previousParams = history.length > 0 ? JSON.stringify(history[history.length - 1].parameters_details) : '';
    if (previousParams) formData.append('previousParams', previousParams);

    try {
      const response = await fetch('/api/analyze-health', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Eroare server (${response.status}): ${errText}`);
      }

      const result = await response.json();
      if (result.success) {
        await fetchHistory(); // Reîncărcăm datele pentru a actualiza graficul
        alert('Analizele au fost trimise cu succes!');
      } else {
        alert('Eroare la procesare: ' + result.error);
      }
    } catch (error) {
      console.error(error);
      const err = error as Error;
      alert(`A apărut o eroare: ${err.message}`);
    } finally {
      setLoading(false);
      // Resetăm input-ul pentru a permite reîncărcarea aceluiași fișier
      e.target.value = '';
    }
  };

  const handleDotClick = (data: any) => {
    setSelectedAnalysis(data.payload);
    setIsModalOpen(true);
  };

  const handleDeleteAnalysis = async (id: string) => {
    if (!confirm('Ești sigur că vrei să ștergi această analiză? Această acțiune este ireversibilă.')) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('health_analyses').delete().eq('id', id);
      if (error) throw error;
      
      await fetchHistory(); // Reîncărcăm graficul
      setIsModalOpen(false);
      setSelectedAnalysis(null);
    } catch (error) {
      console.error(error);
      alert('A apărut o eroare la ștergerea analizei.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Componenta personalizată pentru punctele de pe grafic
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    let fill = "#d946ef"; // Fuchsia implicit
    
    if (payload.evolution_status === 'imbunatatire') fill = "#10b981"; // Emerald
    if (payload.evolution_status === 'inrautatire') fill = "#ef4444"; // Roșu

    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={6} 
        fill={fill} 
        stroke="#0a0a0a" 
        strokeWidth={3} 
        onClick={() => handleDotClick(props)} 
        className="cursor-pointer hover:r-8 transition-all duration-200"
      />
    );
  };

  // Formatarea datelor pentru grafic
  const chartData = history.map(item => ({
    ...item,
    formattedDate: new Date(item.analysis_date).toLocaleDateString('ro-RO', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 text-white relative z-10">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-white">Evoluție Sănătate</h1>
        <p className="text-gray-400 mt-2 font-medium">Încarcă analizele medicale pentru a-ți urmări progresul în timp.</p>
      </div>

      {/* Secțiunea de Încărcare (Glassmorphism) */}
      <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl p-10 rounded-3xl border border-white/5 shadow-2xl flex flex-col items-center justify-center gap-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-600/10 blur-[100px] pointer-events-none" />
        <label className="cursor-pointer bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] text-white px-8 py-4 rounded-2xl font-bold tracking-wide transition-all duration-300 relative z-10 text-center">
          {loading ? 'Se analizează inteligent documentul...' : 'Încarcă Analize Noi (Imagine / PDF)'}
          <input 
            type="file" 
            accept="image/*,application/pdf" 
            onChange={handleFileUpload} 
            className="hidden" 
            disabled={loading}
          />
        </label>
        <p className="text-sm text-gray-500 relative z-10 font-medium tracking-wide">Inteligența artificială va extrage și interpreta automat rezultatele.</p>
      </div>

      {history.length > 0 && (
        <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
          <h2 className="text-xl font-bold text-white mb-8 tracking-wide">
            Grafic Scenariu General <span className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">(Apasă pe puncte pentru detalii)</span>
          </h2>
          <div className="h-96 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="formattedDate" allowDuplicatedCategory={true} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} dy={15} />
                <YAxis domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#d946ef', fontWeight: 'bold' }}
                  labelStyle={{ color: '#9ca3af', marginBottom: '8px', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="general_score" 
                  stroke="#ffffff20" 
                  strokeWidth={3}
                  dot={<CustomDot />}
                  activeDot={<CustomDot r={8} />}
                  name="Scor Sănătate"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <HealthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedAnalysis} 
        onDelete={handleDeleteAnalysis}
        isDeleting={isDeleting}
      />
    </div>
  );
}