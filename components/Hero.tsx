"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#f5eee6] pt-6 md:pt-10 pb-0">
      <div className="relative mx-auto w-[95%] max-w-[1500px] overflow-hidden rounded-[2rem] md:rounded-[3rem]">

        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/hero.jpg"
            alt="Luxury Jewelry"
            className="h-full w-full object-cover object-right animate-[slowZoom_18s_ease-in-out_infinite_alternate]"
          />
        </div>

        {/* Left Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex h-[500px] md:h-[680px] items-center">

          <div className="w-full md:w-1/2 px-8 md:px-16 lg:px-24">

            <p className="mb-2 tracking-[0.45em] text-xs uppercase text-white/80">
              EST. 2025
            </p>

            <p className="mb-8 tracking-[0.35em] text-sm uppercase text-white">
              GLEAMVERVE
            </p>

            <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl leading-[1] text-white">
              Elegance
              <br />
              You Wear.
              <br />
              Confidence
              <br />
              You Feel.
            </h1>

            <p className="mt-8 max-w-md text-base md:text-lg leading-8 text-white/80">
              A curated collection of timeless jewelry inspired by modern
              femininity.
            </p>

            <Link
              href="/collections"
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#5a422a]"
            >
              Explore Collections

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}