import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Heart } from "lucide-react";
import "./globals.css";

// Importăm Provider-ul care va ține datele în memorie pentru toată aplicația
import { DashboardProvider } from "@/lib/context/DashboardContext";
import PikachuChat from "@/app/components/shared/PikachuChat"; 

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Queen&King Cardio | Performanță & Nutriție AI",
  description: "Monitorizează-ți caloriile.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ro" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#030303] text-white selection:bg-fuchsia-500 selection:text-white overflow-x-hidden flex flex-col min-h-screen relative`}>
        
        {/* Învelim tot conținutul în DashboardProvider */}
        <DashboardProvider>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          
          <PikachuChat />
        </DashboardProvider>

        <footer className="w-full py-6 border-t border-white/5 bg-black/20 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-500 font-medium z-40 mt-auto backdrop-blur-md">
          <span className="flex items-center gap-2">
            Made with <Heart className="text-fuchsia-500 fill-fuchsia-500 animate-pulse" size={16} /> by 
            <span className="text-white font-bold tracking-widest uppercase text-xs ml-1">Alina & Artur</span>
          </span>
        </footer>

      </body>
    </html>
  );
}