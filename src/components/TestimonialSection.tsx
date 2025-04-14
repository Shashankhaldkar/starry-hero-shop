
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
    <section className="py-16 bg-gradient-to-b from-starry-charcoal to-starry-darkPurple">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Heroes Love Our Tees</h2>
        <p className="text-starry-neutral text-center mb-12">What our customers are saying</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-gradient-to-b from-starry-darkPurple/60 to-starry-darkPurple/40 backdrop-blur-sm p-6 rounded-xl border border-starry-purple/10 hover:border-starry-purple/30 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-starry-orange fill-starry-orange"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              
              {/* Testimonial text */}
              <p className="text-starry-softPurple mb-6 italic">"{testimonial.comment}"</p>
              
              {/* Customer info */}
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="text-white font-medium">{testimonial.name}</p>
                  <p className="text-xs text-starry-neutral">on {testimonial.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
