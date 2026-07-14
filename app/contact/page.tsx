import { Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f5eee6] pt-10 md:pt-12">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 mb-4 md:mb-8">

        <p className="uppercase tracking-[0.35em] text-xs text-[#5a422a]/60 mb-3">
          Contact
        </p>

        <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl text-[#5a422a] leading-tight">
          Let's Talk.
        </h1>

        <p className="mt-4 max-w-2xl text-[#5a422a]/75 text-base md:text-lg leading-8">
          Have a question about a product, your order, or simply want to
          connect? We'd love to hear from you.
        </p>

      </section>

      {/* Contact Section */}

      <section className="max-w-7xl mx-auto px-6 md:px-20 pt-0 pb-2">

        <div className="grid md:grid-cols-2 gap-1 items-start">

          {/* Left */}

          <div>

            <div className="flex items-start gap-4 mb-10">

              <Mail className="text-[#5a422a] mt-1" size={22} />

              <div>

                <h3 className="font-serif text-2xl text-[#5a422a] mb-2">
                  Email
                </h3>

                <p className="text-[#5a422a]/70">
                  hello@gleamverve.com
                </p>

              </div>

            </div>

            <div className="flex items-start gap-4 mb-10">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5a422a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-1"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>

              <div>

                <h3 className="font-serif text-2xl text-[#5a422a] mb-2">
                  Instagram
                </h3>

                <a
                  href="https://instagram.com/gleamverve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5a422a]/70 hover:text-[#5a422a] transition"
                >
                  @gleamverve
                </a>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <Clock className="text-[#5a422a] mt-1" size={22} />

              <div>

                <h3 className="font-serif text-2xl text-[#5a422a] mb-2">
                  Response Time
                </h3>

                <p className="text-[#5a422a]/70">
                  Usually within 24 hours.
                </p>

              </div>

            </div>

          </div>

          {/* Form */}

          <form className="bg-white rounded-[2rem] p-8 shadow-sm">

            <div className="mb-5">

              <label className="block text-[#5a422a] mb-2">
                Name
              </label>

              <input
                type="text"
                className="w-full rounded-xl border border-[#e6d8ca] px-4 py-3 outline-none focus:border-[#5a422a]"
              />

            </div>

            <div className="mb-5">

              <label className="block text-[#5a422a] mb-2">
                Email
              </label>

              <input
                type="email"
                className="w-full rounded-xl border border-[#e6d8ca] px-4 py-3 outline-none focus:border-[#5a422a]"
              />

            </div>

            <div className="mb-5">

              <label className="block text-[#5a422a] mb-2">
                Message
              </label>

              <textarea
                rows={5}
                className="w-full rounded-xl border border-[#e6d8ca] px-4 py-3 outline-none resize-none focus:border-[#5a422a]"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-[#5a422a] text-white py-4 rounded-full hover:opacity-90 transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}