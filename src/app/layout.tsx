import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Ensure Inter is imported
import "@/styles/globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import AuthButton from "@/components/AuthButton";

import Footer from "@/components/Footer";
import GoogleAdsense from "@/components/GoogleAdsense";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conversation Reflection Tool",
  description: "Improve your communication with tailored reflection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <LanguageProvider>
          <div style={{ position: 'relative', width: '100%', maxWidth: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
               {/* Language Switcher moved or styled */}
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
               <LanguageSwitcher />
               <AuthButton />
            </div>
          </div>
          <GoogleAdsense />
          <div style={{ flex: 1 }}>
            {children}
          </div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
