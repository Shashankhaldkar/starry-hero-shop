
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-starry-darkPurple text-white">
      <Header />
      <main>
        {/* Hero Section */}
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
        
        {/* Our Story Section */}
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
        
        {/* Values Section */}
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
        
        {/* Team Section */}
        <section className="py-16 bg-starry-charcoal">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Meet Our Team</h2>
            <p className="text-starry-neutral text-center max-w-2xl mx-auto mb-12">
              The superheroes behind Heroic Threads who work tirelessly to bring you the best in superhero apparel.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
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
              ].map((member, index) => (
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
        
        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-b from-starry-charcoal to-starry-darkPurple">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
            <p className="text-starry-neutral text-center max-w-2xl mx-auto mb-12">
              Find answers to common questions about our products, shipping, and company policies.
            </p>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "What makes your t-shirts different from others?",
                  answer: "Our t-shirts feature exclusive designs created by fans for fans, printed on premium fabric using high-quality printing techniques that ensure vibrant colors and durability even after multiple washes."
                },
                {
                  question: "Are your products officially licensed?",
                  answer: "Yes, we partner with official licensors to ensure our products are 100% authentic and legally approved. This guarantees the quality and authenticity of the characters and designs featured on our t-shirts."
                },
                {
                  question: "How do your sizes run?",
                  answer: "Our sizes generally run true to standard US sizing. We recommend checking our detailed size guide for precise measurements before ordering. If you're between sizes, we typically suggest sizing up for a more comfortable fit."
                },
                {
                  question: "What is your return policy?",
                  answer: "We offer a 30-day return policy for unworn items in original packaging. If you're not completely satisfied with your purchase, you can return it for a full refund or exchange. Customized items cannot be returned unless defective."
                },
                {
                  question: "How long does shipping take?",
                  answer: "Standard shipping within the US typically takes 3-5 business days. International shipping varies by location but generally takes 7-14 business days. Express shipping options are available at checkout for faster delivery."
                },
              ].map((faq, index) => (
                <div key={index} className="bg-starry-darkPurple/40 p-6 rounded-lg border border-starry-purple/10">
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-starry-neutral">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-starry-darkPurple">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                <p className="text-starry-neutral mb-8">
                  Have questions or feedback? We'd love to hear from you! Our team is available to assist you with any inquiries.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="text-starry-purple mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium">Email Us</h4>
                      <p className="text-starry-neutral">support@heroicthreads.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="text-starry-purple mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium">Call Us</h4>
                      <p className="text-starry-neutral">+1 (800) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-starry-purple mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium">Visit Us</h4>
                      <p className="text-starry-neutral">
                        123 Comic Lane, Metropolis<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="text-starry-purple mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium">Business Hours</h4>
                      <p className="text-starry-neutral">
                        Monday-Friday: 9am - 6pm EST<br />
                        Saturday: 10am - 4pm EST<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="font-medium mb-2">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-starry-neutral hover:text-starry-purple transition-colors">
                      <Instagram size={24} />
                    </a>
                    <a href="#" className="text-starry-neutral hover:text-starry-purple transition-colors">
                      <Facebook size={24} />
                    </a>
                    <a href="#" className="text-starry-neutral hover:text-starry-purple transition-colors">
                      <Twitter size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-starry-charcoal/30 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block mb-1 text-sm">Your Name</label>
                        <input 
                          type="text" 
                          id="name"
                          className="w-full p-3 bg-starry-darkPurple border border-starry-purple/20 rounded-md text-white placeholder-starry-neutral focus:border-starry-purple focus:ring-1 focus:ring-starry-purple"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-1 text-sm">Your Email</label>
                        <input 
                          type="email" 
                          id="email"
                          className="w-full p-3 bg-starry-darkPurple border border-starry-purple/20 rounded-md text-white placeholder-starry-neutral focus:border-starry-purple focus:ring-1 focus:ring-starry-purple"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block mb-1 text-sm">Subject</label>
                      <input 
                        type="text" 
                        id="subject"
                        className="w-full p-3 bg-starry-darkPurple border border-starry-purple/20 rounded-md text-white placeholder-starry-neutral focus:border-starry-purple focus:ring-1 focus:ring-starry-purple"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block mb-1 text-sm">Message</label>
                      <textarea 
                        id="message"
                        rows={4}
                        className="w-full p-3 bg-starry-darkPurple border border-starry-purple/20 rounded-md text-white placeholder-starry-neutral focus:border-starry-purple focus:ring-1 focus:ring-starry-purple"
                        placeholder="Type your message here..."
                      ></textarea>
                    </div>
                    <Button 
                      type="submit"
                      className="w-full bg-starry-purple hover:bg-starry-vividPurple"
                    >
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
