import type { Metadata } from "next";
import "../../styles/globals.css";
import { NavBarWrapper } from "../../components/NavBarWrapper";
import { Providers } from "../../components/Providers";
import Footer from "../../components/Footer";
import WhyChooseUs from "../../components/WhyChooseUs";
import { ToastProvider } from "../../components/ToastProvider";

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
      <body className="min-h-screen bg-gray-100 flex flex-col">
        <Providers>
          <NavBarWrapper />
          <main className="container mx-auto p-4 flex-grow">{children}</main>
          <WhyChooseUs />
          <Footer />
          <ToastProvider />
        </Providers>
      </body>
    </html>
  );
}
