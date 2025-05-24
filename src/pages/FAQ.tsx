
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      id: "item-1",
      question: "What sizes do you offer?",
      answer: "We offer sizes from XS to 3XL for most items. Our size chart provides detailed measurements to help you find the perfect fit. If you're between sizes, we recommend sizing up for a more comfortable fit."
    },
    {
      id: "item-2",
      question: "How do I care for my superhero apparel?",
      answer: "Most of our items are machine washable in cold water. Turn graphic tees inside out before washing to preserve the print. Avoid bleach and tumble dry on low heat. For best results, air dry when possible."
    },
    {
      id: "item-3",
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Items must be unworn, unwashed, and have original tags attached. Customer is responsible for return shipping costs unless the item was defective or incorrect."
    },
    {
      id: "item-4",
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by destination. Customers are responsible for any customs duties or taxes imposed by their country."
    },
    {
      id: "item-5",
      question: "Are your products officially licensed?",
      answer: "Many of our products feature officially licensed designs from major comic publishers. We also create original superhero-inspired designs that don't infringe on any copyrights."
    },
    {
      id: "item-6",
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive an email with tracking information. You can also log into your account to view order status and tracking details."
    },
    {
      id: "item-7",
      question: "Do you offer custom designs?",
      answer: "We occasionally offer custom design services for bulk orders. Contact our customer service team for more information about custom options and minimum order quantities."
    },
    {
      id: "item-8",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted."
    },
    {
      id: "item-9",
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days within the US. Express shipping (2-3 days) and overnight shipping are also available. International orders typically take 7-14 business days."
    },
    {
      id: "item-10",
      question: "Do you have a loyalty program?",
      answer: "Yes! Our Heroes Rewards program offers points for every purchase, exclusive discounts, early access to new products, and special member-only events. Sign up for free when you create an account."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, and policies
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white text-center">Common Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-purple-500/30">
                    <AccordionTrigger className="text-white hover:text-purple-300 text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-purple-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30 mt-8">
            <CardHeader>
              <CardTitle className="text-white text-center">Still Have Questions?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-purple-300 mb-6">
                Can't find what you're looking for? Our customer service team is here to help!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <h3 className="text-white font-medium mb-2">Email Support</h3>
                  <p className="text-purple-300 text-sm">help@heroicthreads.com</p>
                  <p className="text-purple-400 text-xs">Response within 24 hours</p>
                </div>
                <div className="text-center">
                  <h3 className="text-white font-medium mb-2">Phone Support</h3>
                  <p className="text-purple-300 text-sm">+1 (234) 567-890</p>
                  <p className="text-purple-400 text-xs">Mon-Fri 9AM-6PM EST</p>
                </div>
                <div className="text-center">
                  <h3 className="text-white font-medium mb-2">Live Chat</h3>
                  <p className="text-purple-300 text-sm">Available on website</p>
                  <p className="text-purple-400 text-xs">Mon-Fri 9AM-9PM EST</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
