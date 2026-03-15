import React from 'react';
import { HealthAnalysis } from '@/src/types';
import { Trash2, Loader2 } from 'lucide-react';

interface HealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: HealthAnalysis | null;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export default function HealthModal({ isOpen, onClose, data, onDelete, isDeleting }: HealthModalProps) {
  if (!isOpen || !data) return null;

  // Funcție de protecție în caz că AI-ul a trimis o dată calendaristică invalidă
  const safeDate = !isNaN(Date.parse(data.analysis_date)) ? new Date(data.analysis_date).toLocaleDateString('ro-RO') : data.analysis_date;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 w-8 h-8 flex items-center justify-center rounded-full transition-all"
        >
          ✕
        </button>
        
        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Detalii Analize Medicale</h2>
        <p className="text-fuchsia-400 font-medium mb-8 text-sm uppercase tracking-widest">
          Extras pe: {safeDate}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl flex-1 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Scor General</span>
            <span className="text-4xl font-black text-white">{data.general_score} <span className="text-xl text-gray-500 font-medium">/ 100</span></span>
          </div>
          
          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl flex-1 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Evoluție față de Trecut</span>
            <span className={`text-2xl font-black capitalize tracking-wide
              ${data.evolution_status === 'imbunatatire' ? 'text-emerald-400' : ''}
              ${data.evolution_status === 'inrautatire' ? 'text-red-400' : ''}
              ${data.evolution_status === 'stagnare' ? 'text-yellow-400' : ''}
            `}>
              {data.evolution_status}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-fuchsia-500 inline-block"></span> 
           Parametri Măsurați
        </h3>
        
        <div className="space-y-4">
          {Array.isArray(data.parameters_details) && data.parameters_details.length > 0 ? data.parameters_details.map((param, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl border border-white/5 gap-4">
              <div className="flex-1">
                <span className="block font-bold text-gray-200 text-lg mb-1">{param.nume}</span>
                <span className="text-xs font-medium text-gray-400 bg-black/50 px-2 py-1 rounded-md inline-block">Referință: {param.interval_referinta}</span>
                
                {param.evolutie && param.evolutie !== 'necunoscut' && (
                  <span className={`text-[10px] font-black uppercase tracking-widest mt-3 block flex items-center gap-1
                    ${param.evolutie === 'inrautatire' ? 'text-red-400' : ''}
                    ${param.evolutie === 'imbunatatire' ? 'text-emerald-400' : ''}
                    ${param.evolutie === 'stagnare' ? 'text-gray-400' : ''}
                  `}>
                    {param.evolutie === 'inrautatire' ? '⚠️ Înrăutățire' : param.evolutie === 'imbunatatire' ? '✅ Îmbunătățire' : '➖ Stagnare'}
                  </span>
                )}
              </div>
              
              <div className="flex items-center sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                <span className="text-2xl font-black text-white text-right">
                  {param.valoare} <span className="text-sm font-medium text-gray-500 ml-1">{param.unitate}</span>
                </span>
                
                <span className={`px-4 py-1.5 rounded-xl text-xs font-bold w-24 text-center tracking-wide uppercase
                  ${param.status === 'normal' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : ''}
                  ${param.status === 'scazut' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : ''}
                  ${param.status === 'ridicat' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : ''}
                `}>
                  {param.status}
                </span>
              </div>
            </div>
          )) : (
            <div className="text-gray-400 text-sm font-medium italic bg-white/5 p-4 rounded-xl">Nu au putut fi extrași parametri specifici pentru acest document. (Format AI atipic)</div>
          )}
        </div>

        {onDelete && (
          <div className="mt-10 pt-6 border-t border-white/10 flex justify-end">
            <button
              onClick={() => onDelete(data.id)}
              disabled={isDeleting}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-bold transition-all disabled:opacity-50 tracking-wide uppercase text-sm"
            >
              {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
              {isDeleting ? 'Se șterge...' : 'Șterge Analiza'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}