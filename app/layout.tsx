import "./globals.css";
import { Geist, Geist_Mono as GeistMono } from "next/font/google";
import Providers from "./providers";
import { ReactNode } from "react";

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const geistMono = GeistMono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata = {
  title: "Your App",
  description: "Your Description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="bg-gray-600 min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
