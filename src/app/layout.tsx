import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "@/dashboardWrapper";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Birth Management",
  description: "Gestion des actes de naissances",
  icons: {
      icon: '/kinshasa.png', // ou favicon.ico
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <DashboardWrapper>
          {children}
          <Toaster />
        </DashboardWrapper>
      </body>
    </html>
  );
}
