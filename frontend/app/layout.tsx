import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Context from "@/context/Context";
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/Navbar";
import AuthContext from "@/context/AuthContext";
const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TalentSwipe",
  description: "Tinder des logicielles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}> 
      <body
        
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen `}
      >
        <Context>
          <AuthContext>
            <main className="flex flex-col min-h-screen ">
              <Navbar /> 
              {children}
            </main>
          </AuthContext>
        </Context>
        <Toaster />
      </body>
    </html>
  );
}
