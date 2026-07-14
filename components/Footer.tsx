import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#efe6dc] border-t border-[#e3d4c3] mt-0">

      {/* Newsletter */}

      <section className="max-w-7xl mx-auto px-6 md:px-20 py-14 border-b border-[#d9c8b8]">

        <div className="text-center max-w-3xl mx-auto">

          <p className="uppercase tracking-[0.35em] text-xs text-[#5a422a]/60 mb-4">
            Newsletter
          </p>

          <h2 className="font-[var(--font-heading)] text-4xl md:text-5xl text-[#5a422a]">
            Stay in the Loop
          </h2>

          <p className="mt-6 text-[#5a422a]/70 leading-8">
            Be the first to discover new collections,
            exclusive offers, and timeless inspiration.
          </p>

          <form className="mt-10 flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-[#d9c8b8] bg-white px-6 py-4 outline-none focus:border-[#5a422a]"
            />

            <button
              type="submit"
              className="rounded-full bg-[#5a422a] px-8 py-4 text-white hover:opacity-90 transition"
            >
              Subscribe
            </button>

          </form>

        </div>

      </section>

      {/* Footer */}

      <div className="max-w-7xl mx-auto px-6 md:px-20 py-12">

        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 md:gap-16">

          {/* Brand */}

          <div>

            <p className="uppercase tracking-[0.4em] text-[10px] text-[#5a422a]/60 mb-3">
              EST. 2025
            </p>

            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl tracking-[0.12em] text-[#5a422a] leading-none">
              GLEAMVERVE
            </h2>

            <p className="mt-6 text-[#5a422a]/70 leading-8">
              Timeless jewelry curated for modern elegance,
              confidence, and everyday luxury.
            </p>

          </div>

          {/* Shop */}

          <div>

            <h3 className="font-serif text-xl text-[#5a422a] mb-6">
              Shop
            </h3>

            <div className="space-y-4">

              <Link
                href="/collections"
                className="block text-[#5a422a]/70 hover:text-[#5a422a] hover:translate-x-1 transition-all duration-300"
              >
                Collections
              </Link>

              <Link
                href="/"
                className="block text-[#5a422a]/70 hover:text-[#5a422a] hover:translate-x-1 transition-all duration-300"
              >
                Best Sellers
              </Link>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="font-serif text-xl text-[#5a422a] mb-6">
              Company
            </h3>

            <div className="space-y-4">

              <Link
                href="/about"
                className="block text-[#5a422a]/70 hover:text-[#5a422a] hover:translate-x-1 transition-all duration-300"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="block text-[#5a422a]/70 hover:text-[#5a422a] hover:translate-x-1 transition-all duration-300"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* Connect */}

          <div>

            <h3 className="font-serif text-xl text-[#5a422a] mb-6">
              Connect
            </h3>

            <div className="space-y-5">

              <a
                 href="https://instagram.com/gleamverve"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-3 text-[#5a422a]/70 hover:text-[#5a422a] transition-all duration-300"
                >
              <svg
               xmlns="http://www.w3.org/2000/svg"
               width="18"
               height="18"
                viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
              strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" />
        </svg>

           Instagram
        </a>

              <a
                href="mailto:hello@gleamverve.com"
                className="flex items-center gap-3 text-[#5a422a]/70 hover:text-[#5a422a] transition-all duration-300"
              >
                <Mail size={18} />
                hello@gleamverve.com
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-12 pt-6 border-t border-[#d9c8b8] flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-sm text-[#5a422a]/60">
            © 2025 GleamVerve. All rights reserved.
          </p>

          <div className="flex gap-8">

            <Link
              href="/privacy"
              className="text-sm text-[#5a422a]/60 hover:text-[#5a422a] transition"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-sm text-[#5a422a]/60 hover:text-[#5a422a] transition"
            >
              Terms
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}