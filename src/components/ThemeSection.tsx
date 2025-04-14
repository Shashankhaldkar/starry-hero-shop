
import { themes } from "@/data/products";

export function ThemeSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-starry-darkPurple to-starry-charcoal">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Explore Themes</h2>
        <p className="text-starry-neutral text-center mb-10">Discover t-shirts inspired by your favorite universes</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <a 
              key={theme.id} 
              href={`/theme/${theme.id}`}
              className="group relative overflow-hidden rounded-xl h-60 flex items-end transition-transform hover:-translate-y-2 duration-300"
            >
              {/* Theme image with gradient overlay */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-starry-darkPurple via-starry-darkPurple/70 to-transparent z-10"></div>
                <img 
                  src={theme.image} 
                  alt={theme.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Theme name */}
              <div className="relative z-20 w-full p-6">
                <h3 className="text-xl font-bold text-white mb-1">{theme.name}</h3>
                <div className="w-10 h-1 bg-starry-purple rounded-full transform origin-left transition-all duration-300 group-hover:w-20 group-hover:bg-starry-orange"></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
