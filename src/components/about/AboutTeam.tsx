
export const AboutTeam = () => {
  const teamMembers = [
    {
      name: "Shashank Haldkar",
      image: 'https://placehold.co/350x250?text=Shashank+Haldkar&font=Playfair%20Display',
    },
    {
      name: "Ethepu Deepika",
      image: 'https://placehold.co/350x250?text=Ethepu+Deepika&font=Playfair%20Display',
    },
    {
      name: "Gokilavani S",
      image: 'https://placehold.co/350x250?text=Gokilavani+S&font=Playfair%20Display',
    },
  ];

  return (
    <section className="py-16 bg-starry-charcoal">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Meet Our Team</h2>
        <p className="text-starry-neutral text-center max-w-2xl mx-auto mb-12">
          The superheroes behind StaartHero who work tirelessly to bring you the best in superhero apparel.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-starry-darkPurple/40 rounded-lg overflow-hidden group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl mb-2">{member.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
