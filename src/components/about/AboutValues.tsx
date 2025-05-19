
export const AboutValues = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-starry-darkPurple to-starry-charcoal">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-starry-darkPurple/40 p-6 rounded-lg border border-starry-purple/10 hover:border-starry-purple/30 transition-all duration-300">
            <div className="w-12 h-12 bg-starry-purple/20 rounded-full flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-starry-purple rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality First</h3>
            <p className="text-starry-neutral">
              We use premium materials and printing techniques to ensure our t-shirts look great and last longer, even after multiple washes.
            </p>
          </div>
          <div className="bg-starry-darkPurple/40 p-6 rounded-lg border border-starry-purple/10 hover:border-starry-purple/30 transition-all duration-300">
            <div className="w-12 h-12 bg-starry-purple/20 rounded-full flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-starry-purple rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold mb-2">Authentic Designs</h3>
            <p className="text-starry-neutral">
              We collaborate with real fans and talented artists to create designs that truly capture the essence of beloved superhero characters.
            </p>
          </div>
          <div className="bg-starry-darkPurple/40 p-6 rounded-lg border border-starry-purple/10 hover:border-starry-purple/30 transition-all duration-300">
            <div className="w-12 h-12 bg-starry-purple/20 rounded-full flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-starry-purple rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold mb-2">Community Focus</h3>
            <p className="text-starry-neutral">
              We're not just selling t-shirts; we're building a community of passionate fans who share our love for superhero culture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
