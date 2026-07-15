import Link from "next/link";

const collections = [
  {
    title: "Rings",
    image: "/images/collections/Rings.jpg",
  },
  {
    title: "Necklaces",
    image: "/images/collections/Necklaces.jpg",
  },
  {
    title: "Bracelets",
    image: "/images/collections/Bracelet.jpg",
  },
  {
    title: "Bangles",
    image: "/images/collections/Bangles.jpg",
  },
  {
    title: "Studs",
    image: "/images/collections/Studs.jpg",
  },
   {
    title: "Pendants",
    image: "/images/collections/Pendants.jpg",
  },
  {
    title: "Cuff",
    image: "/images/collections/cuff.jpg",
  },
  {
    title: "combo",
    image: "/images/collections/combo.jpg",
  },
  {
    title: "hoops",
    image: "/images/collections/hoops.jpg",
  },
];

export default function Collections() {
  return (
 <section className="bg-[#f5eee6] px-4 md:px-20 pt-20 pb-2">

      <div className="mb-4 md:mb-6">

        <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-[#5a422a] mb-3">
          Collections
        </p>

        <h2 className="text-2xl md:text-5xl text-[#5a422a] font-serif">
          Curated for every moment.
        </h2>

      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-6">

        {collections.map((item) => (
          <Link
            href={`/collections/${item.title.toLowerCase()}`}
            key={item.title}
            className="group relative overflow-hidden rounded-2xl md:rounded-[2rem] block"
          >

            <img
            src={item.image}
            alt={item.title}
           className="h-[235px] md:h-[380px] w-full object-cover group-hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">

              <h3 className="text-white text-lg md:text-3xl font-serif mb-2">
                {item.title}
              </h3>

              <button className="text-xs md:text-base text-white border border-white px-4 md:px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
                Explore
              </button>

            </div>

          </Link>
        ))}

      </div>

    </section>
  );
}