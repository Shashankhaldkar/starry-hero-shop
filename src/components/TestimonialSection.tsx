
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  product: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    comment: "The quality of these t-shirts is outstanding! The Cosmic Guardian design gets so many compliments, and the fabric is super comfortable.",
    product: "Cosmic Guardian - Oversized Tee"
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    comment: "I love the Dark Knight graphic print tee. The colors are vibrant and haven't faded after multiple washes. Will definitely buy more!",
    product: "Dark Knight - Graphic Print"
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
    rating: 5,
    comment: "The Green Rage hoodie is incredible! The design details are amazing and it's perfect for cooler evenings. Shipping was fast too!",
    product: "Green Rage - Graphic Hoodie"
  }
];

export function TestimonialSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-indigo-900 to-purple-900 relative">
      {/* Comic-style speech bubbles background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-10 left-[20%] w-40 h-40 border-8 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-[30%] w-60 h-60 border-8 border-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Hero Testimonials</h2>
        <p className="text-white/80 text-center mb-12">What our superheroes are saying</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-b from-indigo-800/60 to-purple-800/40 backdrop-blur-sm p-6 rounded-xl border-2 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 relative"
            >
              {/* Comic-style speech pointer */}
              <div className="absolute -bottom-3 left-10 w-6 h-6 bg-indigo-800 rotate-45 border-r-2 border-b-2 border-purple-500/30"></div>
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-white mb-6 italic">"<span className="text-purple-300">{testimonial.comment}</span>"</p>

              {/* Customer info */}
              <div className="flex items-center mt-8">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full opacity-70"></div>
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-white/50 relative z-10"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-white font-medium">{testimonial.name}</p>
                  <p className="text-xs text-purple-300">on {testimonial.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
