import { Suspense } from "react";
import LoginForm from "./_components/form";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-zinc-50">
      <div className="w-full md:w-fit">
        <div className="flex items-center md:justify-center rounded-xl lg:border border-zinc-200">
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
