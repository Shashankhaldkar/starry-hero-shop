
export const AboutTeam = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & Design Director",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    },
    {
      name: "Sarah Johnson",
      role: "Creative Lead",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
    },
    {
      name: "Marcus Lee",
      role: "Production Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    },
    {
      name: "Priya Patel",
      role: "Customer Experience",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    },
  ];

  return (
    <section className="py-16 bg-starry-charcoal">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Meet Our Team</h2>
        <p className="text-starry-neutral text-center max-w-2xl mx-auto mb-12">
          The superheroes behind Heroic Threads who work tirelessly to bring you the best in superhero apparel.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-starry-darkPurple/40 rounded-lg overflow-hidden group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-starry-purple">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
