const collections = [
  {
    title: "Rings",
    image: "/images/rings.jpg",
  },
  {
    title: "Necklaces",
    image: "/images/necklaces.jpg",
  },
  {
    title: "Bracelets",
    image: "/images/bracelets.jpg",
  },
  {
    title: "Accessories",
    image: "/images/accessories.jpg",
  },
];

export default function Collections() {
  return (
    <section className="bg-[#f5eee6] px-6 md:px-20 py-28">

      <div className="mb-16">

        <p className="uppercase tracking-[0.3em] text-sm text-[#5a422a] mb-4">
          Collections
        </p>

        <h2 className="text-4xl md:text-6xl text-[#5a422a] font-serif">
          Curated for every moment.
        </h2>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {collections.map((item) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-[2rem]"
          >

            <img
              src={item.image}
              alt={item.title}
              className="h-[500px] w-full object-cover group-hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-8 left-8">

              <h3 className="text-white text-3xl font-serif mb-2">
                {item.title}
              </h3>

              <button className="text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
                Explore
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}