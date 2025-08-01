import Image from "next/image";
import Link from "next/link";
import RegisterForm from "./_components/form";
import { Toaster } from "@/components/admin/ui/sonner";

import { getAllLocation } from "@/lib/data/Location";

export default async function RegisterPage() {
  const locations = await getAllLocation();

  return (
    <div className="mx-auto pt-20 h-screen">
      <div className="flex flex-col lg:flex-row h-full">
        <div className="flex-3/5 h-full hidden md:block">
          <div className="w-full h-full bg-techtona-2 py-8 relative flex px-16 items-center">
            <Image
              src="/images/hero-2.jpg"
              alt="Kegiatan Karang Taruna"
              layout="fill"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10 px-8 text-left text-white">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-2 leading-tight tracking-tight">
                Join Us!
              </h1>
              <h2 className="text-4xl mb-10 font-semibold">
                Muda-Mudi Magerjo
              </h2>
              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 font-light">
                Already Have Account?{" "}
                <Link
                  href={"/login"}
                  className="text-white ml-2 underline font-bold animate-pulse"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-2/5 overflow-y-auto px-8 lg:px-14 xl:px-24 py-16 text-techtona-1">
          <h1 className="font-bold text-4xl lg:text-5xl text-center md:text-left">
            Register
          </h1>
          <div className="mt-10 lg:mt-16">
            <RegisterForm locations={locations} />
          </div>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
