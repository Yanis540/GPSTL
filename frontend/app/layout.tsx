import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Context from "@/context/Context";
import { ThemeToggle } from "@/components/theme-provider";

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
  title: "Tindericielle",
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
        {children}
        <ThemeToggle /> 
        </Context>
      </body>
    </html>
  );
}
