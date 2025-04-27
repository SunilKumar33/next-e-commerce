import type { Metadata } from "next";
import "../../styles/globals.css";
import { Navbar } from "../../components/NavBar";
import { Providers } from "../../components/Providers";

export const metadata: Metadata = {
  title: "E-commerce Store",
  description: "A modern e-commerce platform built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <Providers>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
