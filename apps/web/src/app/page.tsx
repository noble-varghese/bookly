import Image from "next/image";


const popularBooks = [
  {
    title: "Anxious People",
    author: "Fredrik Backman",
    coverUrl: "/api/placeholder/200/300"
  },
  {
    title: "A Man Called Ove",
    author: "Fredrik Backman",
    coverUrl: "/api/placeholder/200/300"
  },
  // Add more books as needed
]

export default function Home() {
  return (
    <div className="p-8">
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-regular text-bookly-brown mb-2">POPULAR BESTELLERS</h2>
            <p className="text-gray-500 text-sm">We picked up the most popular books for you, based on your taste. Check it!</p>
          </div>
          <button className="px-6 py-2 bg-[#F4B266] text-white rounded-lg hover:bg-[#e5a55f] transition-colors">
            Watch full list
          </button>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-4">
          {popularBooks.map((book, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={book.coverUrl}
                alt={book.title}
                width={200}
                height={200}
                className="rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
