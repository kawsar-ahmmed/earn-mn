import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TelegramFloat from "./components/TelegramFloat";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium Phone Search",
  description: "Search for results by phone number",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <TelegramFloat />
      </body>
    </html>
  );
}
