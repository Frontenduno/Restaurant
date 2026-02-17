import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Asegúrate de tener este archivo con las directivas de Tailwind

// Configuramos la fuente tipográfica
const inter = Inter({ subsets: ["latin"] });

// Configuramos lo que dirá la pestaña del navegador
export const metadata: Metadata = {
  title: "Sistema de Restaurante",
  description: "Gestión operativa: Comandas y Asignación de Mesas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased text-gray-900`}>
        {/* Aquí adentro se inyectará todo el resto de tu app (Login, Recepción, etc.) */}
        {children}
      </body>
    </html>
  );
}
