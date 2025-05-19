
import { Button } from "@/components/ui/button";

export const AboutHero = () => {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-starry-purple/20 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Heroic Threads</h1>
          <p className="text-xl text-starry-neutral mb-8">
            Crafting superhero-inspired apparel for fans who want to showcase their love for iconic characters.
          </p>
          <Button 
            className="bg-starry-purple hover:bg-starry-vividPurple"
            size="lg"
          >
            Explore Our Story
          </Button>
        </div>
      </div>
    </section>
  );
};
