import type { Metadata } from "next";
import "@/styles/globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import AuthButton from "@/components/AuthButton";

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
      <body>
        <LanguageProvider>
          <AuthButton />
          <LanguageSwitcher />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
