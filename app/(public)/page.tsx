"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center text-white">
        <Image
          src="/images/hero.jpg"
          alt="Kegiatan Karang Taruna"
          layout="fill"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-1 leading-tight tracking-tight">
            Karang Taruna
          </h1>
          <h2 className="text-lg md:text-2xl mb-8 font-semibold">
            Muda-Mudi Magerjo
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 font-light">
            Organisasi Karang Taruna Muda-Mudi Dukuh Magerjo, Nangsri,
            Manisrenggo, Klaten. Bergabunglah dengan kami menanti event
            selanjutnya!
          </p>
          <Link
            href="#tentang"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-techtona-1 rounded-lg hover:bg-techtona-2 hover:text-techtona-1 font-bold"
          >
            More Info <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="h-screen"></section>

      {/* --- Footer --- */}
      <footer className="bg-techtona-1 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Karang Taruna - M3. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
