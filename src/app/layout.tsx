import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeLeap Network",
  description:
    "CodeLeap Network is a front-end application built as part of a technical challenge, showcasing CRUD operations, clean architecture, and modern React best practices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      <html lang="en">
        <body className={cn("antialiased bg-[#DDDDDD]", inter.className)}>
          <Providers>{children}</Providers>
          <Toaster position="top-center" />
        </body>
      </html>
    </CookiesProvider>
  );
}
