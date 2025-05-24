
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, Globe, Package } from 'lucide-react';

const Shipping = () => {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "5-7 business days",
      cost: "Free on orders $50+",
      icon: <Package className="w-6 h-6 text-blue-400" />
    },
    {
      name: "Express Shipping",
      time: "2-3 business days",
      cost: "$9.99",
      icon: <Truck className="w-6 h-6 text-purple-400" />
    },
    {
      name: "Overnight Shipping",
      time: "1 business day",
      cost: "$19.99",
      icon: <Clock className="w-6 h-6 text-yellow-400" />
    },
    {
      name: "International Shipping",
      time: "7-14 business days",
      cost: "Varies by destination",
      icon: <Globe className="w-6 h-6 text-green-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Truck className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Shipping Information
            </h1>
          </div>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Fast, reliable shipping to get your superhero gear to you quickly
          </p>
        </div>

        {/* Shipping Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {shippingOptions.map((option, index) => (
            <Card key={index} className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 text-center">
              <CardHeader>
                <div className="flex justify-center mb-2">
                  {option.icon}
                </div>
                <CardTitle className="text-white text-lg">{option.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-purple-300 font-medium">{option.time}</div>
                  <div className="text-purple-400 text-sm">{option.cost}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Policy */}
          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Shipping Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-300 space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">Processing Time</h3>
                <p className="text-sm">Orders are typically processed within 1-2 business days. Custom orders may take additional time.</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Order Tracking</h3>
                <p className="text-sm">You'll receive a tracking number via email once your order ships. Track your package anytime.</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Delivery Attempts</h3>
                <p className="text-sm">If delivery fails, the carrier will leave a notice. Packages are held for pickup for up to 7 days.</p>
              </div>
            </CardContent>
          </Card>

          {/* International Shipping */}
          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-400" />
                International Shipping
              </CardTitle>
            </CardHeader>
            <CardContent className="text-purple-300 space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">Available Countries</h3>
                <p className="text-sm">We ship to most countries worldwide. Shipping costs and delivery times vary by destination.</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Customs & Duties</h3>
                <p className="text-sm">International customers are responsible for any customs duties, taxes, or fees imposed by their country.</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Restricted Items</h3>
                <p className="text-sm">Some products may be restricted in certain countries. We'll notify you if items can't be shipped to your location.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30 mt-8">
          <CardHeader>
            <CardTitle className="text-white text-center">Shipping FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-medium mb-2">When will my order ship?</h3>
                <p className="text-purple-300 text-sm">Most orders ship within 1-2 business days. You'll receive an email with tracking information once your order is on its way.</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Can I change my shipping address?</h3>
                <p className="text-purple-300 text-sm">Contact us immediately if you need to change your shipping address. Changes may not be possible once the order has shipped.</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">What if my package is lost?</h3>
                <p className="text-purple-300 text-sm">We'll work with the carrier to locate your package. If it can't be found, we'll send a replacement or provide a full refund.</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Do you offer expedited shipping?</h3>
                <p className="text-purple-300 text-sm">Yes! We offer express (2-3 days) and overnight (1 day) shipping options for urgent orders.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;
