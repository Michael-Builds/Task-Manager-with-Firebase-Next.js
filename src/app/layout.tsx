import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { TasksProvider } from "@/lib/task";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "A modern todo application built with Next.js and Firebase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} font-outfit antialiased`}
      >
        <AuthProvider>
          <TasksProvider>
            {children}
            <Analytics/>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  fontFamily: 'var(--font-outfit)',
                },
                success: {
                  style: {
                    background: '#10b981',
                  },
                },
                error: {
                  style: {
                    background: '#ef4444',
                  },
                },
              }}
            />
          </TasksProvider>
        </AuthProvider>
      </body>
    </html>
  );
}