import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { ViewProvider } from "@/components/ViewContext";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evan AuCoin",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full overflow-hidden`}>
      <body className="h-full overflow-hidden bg-white antialiased">
        <ViewProvider>
          <Navbar />
          {children}
        </ViewProvider>
      </body>
    </html>
  );
}
