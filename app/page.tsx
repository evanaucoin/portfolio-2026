export default function Home() {
  return (
    <main>
      <section className="px-12 py-40">
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold leading-none tracking-tight text-zinc-900">
          Evan Aucoin
        </h1>
        <p className="mt-8 max-w-xl text-xl leading-relaxed text-zinc-400">
          Product Designer &amp; Design Engineer crafting precision-led digital
          experiences.
        </p>
      </section>

      <section id="work" className="px-12 pb-32">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
          Selected Work
        </p>
      </section>
    </main>
  );
}
