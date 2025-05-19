
export const AboutStory = () => {
  return (
    <section className="py-16 bg-starry-charcoal">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800&h=600" 
              alt="Our Team" 
              className="rounded-lg w-full"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-starry-neutral mb-4">
              Heroic Threads was born out of a passion for superheroes and quality apparel. What started as a small operation in 2015 has grown into a beloved brand for superhero enthusiasts across the globe.
            </p>
            <p className="text-starry-neutral mb-4">
              Our founder, Alex Chen, began designing t-shirts as a hobby while studying graphic design. When friends and fellow fans started requesting custom designs, Alex realized there was a gap in the market for high-quality, thoughtfully designed superhero apparel that went beyond generic merchandise.
            </p>
            <p className="text-starry-neutral mb-4">
              Today, Heroic Threads partners with artists and designers from various universes to create unique, officially licensed products that celebrate the rich tapestry of superhero culture.
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-starry-neutral">
                To be the premier destination for superhero fans looking for unique, high-quality apparel that helps them express their connection to the characters and stories they love.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
