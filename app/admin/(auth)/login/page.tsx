import Image from "next/image";
import { Suspense } from "react";
import LoginForm from "./_components/form";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen flex justify-center lg:gap-16 xl:gap-32 2xl:gap-64 bg-zinc-50">
      <div className="h-full w-fit hidden lg:flex items-end justify-center">
        <div className="h-14/16 w-fit">
          <Image
            src="/images/auth-dashboard.png"
            alt="Gambar"
            width={594}
            height={847}
            style={{
              height: "100%",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
      <div className="h-full w-full md:w-fit">
        <div className="h-full flex items-center md:justify-center">
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
