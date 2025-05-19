
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export const AboutContact = () => {
  return (
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
  );
};
