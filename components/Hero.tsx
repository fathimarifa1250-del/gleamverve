export default function Hero() {
  return (
    <section className="min-h-screen bg-[#f5eee6] flex items-center px-6 md:px-20">

      <div className="grid md:grid-cols-2 gap-12 items-center w-full">

        <div>
          <p className="uppercase tracking-[0.3em] text-sm mb-4 text-[#5a422a]">
            GleamVerve
          </p>

          <h1 className="text-5xl md:text-7xl leading-tight mb-6 text-[#5a422a] font-serif">
            Timeless elegance,
            softly spoken.
          </h1>

          <p className="text-lg opacity-80 mb-8 max-w-md text-[#5a422a]">
            Curated jewelry and accessories crafted for quiet luxury and feminine elegance.
          </p>

          <button className="bg-[#5a422a] text-white px-8 py-4 rounded-full hover:opacity-90 transition">
            Explore Collection
          </button>
        </div>

        <div>
          <img
            src="/images/hero.jpg"
            alt="Jewelry"
            className="rounded-[2rem] object-cover w-full h-[700px]"
          />
        </div>

      </div>

    </section>
  );
}