import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RachAí - Divisão de Contas",
  description: "Aplicativo para divisão de contas entre amigos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-center bg-white">
          <div className="w-full max-w-md mx-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
