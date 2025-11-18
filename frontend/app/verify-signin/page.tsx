"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";

export default function VerifySignInPage() {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    const trimmed = value.replace(/[^0-9]/g, "");
    const input = inputRefs.current[index];
    if (input) {
      input.value = trimmed.slice(0, 1);
    }

    if (trimmed && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !event.currentTarget.value && index > 0) {
      event.preventDefault();
      const prevInput = inputRefs.current[index - 1];
      prevInput?.focus();
      if (prevInput) {
        prevInput.value = "";
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 font-sans text-zinc-50">
      <main className="flex w-full max-w-md flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Conduit logo"
            width={50}
            height={50}
            priority
          />
          <h1 className="text-center text-2xl font-semibold tracking-tight">
            Check your email
          </h1>
        </div>

        <div className="w-full rounded-xl bg-[#171717] p-6 shadow-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-center gap-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      if (el) {
                        inputRefs.current[index] = el;
                      }
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    onChange={(event) => handleChange(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    className="h-12 w-12 rounded-md border border-zinc-800 bg-black text-center text-base text-zinc-50 outline-none ring-offset-0 focus:border-[#542CDE] focus:ring-2 focus:ring-[#542CDE] focus:ring-offset-0"
                  />
                ))}
              </div>

              <p className="text-center text-sm text-zinc-400">
                Enter the 6-digit verification code we sent to your email. If
                you did not receive the code, {" "}
                <Link
                  href="#"
                  className="text-zinc-200 underline-offset-4 hover:underline"
                >
                  resend it
                </Link>
                .
              </p>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-[#542CDE] px-4 text-sm font-medium text-white transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#542CDE] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Verify
            </button>
          </form>
        </div>

        <Link
          href="/signin"
          className="inline-flex items-center text-sm text-muted-foreground hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Back
        </Link>
      </main>
    </div>
  );
}
