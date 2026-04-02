import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MessageCircle } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maa Sudama Tempo Service | Smart Logistics",
  description: "Reliable and precise corporate logistics infrastructure built for speed and accountability in the NCR region.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.className} min-h-screen bg-charcoal-950 text-white antialiased selection:bg-brand-500 selection:text-white`}>
        {children}
        
        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/917703976645?text=Hi%2C%20I%20am%20looking%20for%20logistics%20services..." 
          target="_blank" 
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all flex items-center justify-center group"
          aria-label="Contact us on WhatsApp"
        >
           <MessageCircle className="w-8 h-8" />
           <span className="absolute right-full mr-4 glass-panel text-white text-sm font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
             Chat with us
           </span>
        </a>
      </body>
    </html>
  );
}
