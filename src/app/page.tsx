import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#fffef8,_#e7edf5_52%,_#cdd9e8)] px-4 py-10">
      <div className="w-full max-w-4xl">
        <div className="mx-auto mb-8 max-w-md text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
            React Calculator
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Fast math, minimal UI.
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
            A clean four-function calculator with keyboard support and
            phone-style interactions.
          </p>
        </div>

        <div className="flex justify-center">
          <Calculator />
        </div>
      </div>
    </main>
  );
}
