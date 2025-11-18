import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
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
            Sign in to your workspace
          </h1>
        </div>

        <div className="w-full rounded-xl bg-[#171717] p-6 shadow-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-sm">
              <label htmlFor="email" className="font-medium text-zinc-200">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="h-10 rounded-md border border-zinc-800 bg-black px-3 text-sm text-zinc-50 outline-none ring-offset-0 placeholder:text-zinc-500 focus:border-[#542CDE] focus:ring-2 focus:ring-[#542CDE] focus:ring-offset-0"
              />
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-[#542CDE] px-4 text-sm font-medium text-white transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#542CDE] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Continue
            </button>

            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <div className="h-px flex-1 bg-zinc-800" />
              <span>OR</span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>

            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-zinc-700 bg-black px-4 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Image
                src="/google.svg"
                alt="Google"
                width={16}
                height={16}
              />
              <span>Continue with Google</span>
            </button>
          </form>
        </div>

        <p className="text-xs text-zinc-500">
          <Link
            href="/terms-of-service"
            className="text-zinc-400 underline-offset-4 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="text-zinc-400 underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
        </p>
      </main>
    </div>
  );
}
