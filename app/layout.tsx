import type { Metadata } from "next";
import { plus_jakarta_sans } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karang Taruna",
  description: "Unofficial website of youth organization from magerjo village",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plus_jakarta_sans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
