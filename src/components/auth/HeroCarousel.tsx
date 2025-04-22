
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Hero image placeholders
const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80",
    alt: "Superhero 1: Woman with laptop",
    caption: "Unleash your inner hero.",
  },
  {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
    alt: "Superhero 2: The Matrix",
    caption: "Enter the Matrix with StarryHero.",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
    alt: "Superhero 3: Woman in white shirt",
    caption: "Join forces with amazing heroes.",
  },
  {
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
    alt: "Superhero 4: Robot hero",
    caption: "Every hero is unique.",
  },
];

export const HeroCarousel = () => {
  // Pick 3 random images for each render
  const [carouselImages] = useState(() => {
    const shuffled = [...HERO_IMAGES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  });

  return (
    <div className="hidden md:flex flex-col justify-center items-center bg-starry-darkPurple px-4 py-8 min-w-[300px] w-1/2">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {carouselImages.map((img) => (
            <CarouselItem key={img.src}>
              <img
                src={img.src}
                alt={img.alt}
                className="rounded-lg w-full h-52 object-cover drop-shadow-xl mb-2 hover-scale transition-transform duration-200"
                style={{ background: "linear-gradient(90deg, #517fa4 0%, #243949 100%)" }}
              />
              <div className="text-md font-semibold text-starry-purple text-center">
                {img.caption}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-6 text-sm text-starry-purple text-center font-mono opacity-75">
        Welcome, future hero!
      </div>
    </div>
  );
};
