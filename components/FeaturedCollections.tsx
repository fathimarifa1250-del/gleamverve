"use client";

import Link from "next/link";

const collections = [
  {
    name: "Rings",
    image: "/images/categories/rings.jpg",
    href: "/collections/rings",
  },
  {
    name: "Necklaces",
    image: "/images/categories/necklaces.jpg",
    href: "/collections/necklaces",
  },
  {
    name: "Bracelets",
    image: "/images/categories/bracelets.jpg",
    href: "/collections/bracelets",
  },
  {
    name: "Bangles",
    image: "/images/categories/bangles.jpg",
    href: "/collections/bangles",
  },
  {
    name: "Studs",
    image: "/images/categories/studs.jpg",
    href: "/collections/studs",
  },
    {
    name: "Pendants",
    image: "/images/categories/Pendants.jpg",
    href: "/collections/Pendants",
  },
  {
    name: "Cuff",
    image: "/images/categories/cuff.jpg",
    href: "/collections/cuff",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="pt-16 md:pt-24 pb-4 md:pb-6 px-6 md:px-20 bg-[#f5eee6]">

      <div className="text-center mb-14">

        <p className="uppercase tracking-[0.35em] text-xs text-[#5a422a]/60 mb-3">
          Discover
        </p>

        <h2 className="font-[var(--font-heading)] text-4xl md:text-5xl text-[#5a422a]">
          Shop by Collection
        </h2>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">

        {collections.map((collection) => (
          <Link
            key={collection.name}
            href={collection.href}
            className="group"
          >
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">

              <div className="aspect-square overflow-hidden">

                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

              </div>

              <div className="py-5 text-center">

                <h3 className="font-[var(--font-heading)] text-2xl text-[#5a422a]">
                  {collection.name}
                </h3>

              </div>

            </div>
          </Link>
        ))}

      </div>

      <div className="text-center mt-6">

        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-[#5a422a] hover:gap-4 transition-all"
        >
          View All Collections →
        </Link>

      </div>
<div className="flex justify-center mt-8">
  <div className="w-20 h-px bg-[#d8c8b8]" />
</div>
    </section>
  );
}