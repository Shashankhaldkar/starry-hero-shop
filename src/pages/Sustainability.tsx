
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Recycle, Heart, Globe } from 'lucide-react';

const Sustainability = () => {
  const initiatives = [
    {
      icon: <Leaf className="w-8 h-8 text-green-400" />,
      title: "Organic Materials",
      description: "We use 100% organic cotton and eco-friendly materials in our superhero apparel."
    },
    {
      icon: <Recycle className="w-8 h-8 text-blue-400" />,
      title: "Recycled Packaging",
      description: "All our packaging is made from recycled materials and is 100% recyclable."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-400" />,
      title: "Fair Trade",
      description: "We partner with fair trade manufacturers to ensure ethical production practices."
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-400" />,
      title: "Carbon Neutral",
      description: "We offset our carbon footprint through verified environmental projects."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text">
              Sustainability
            </h1>
          </div>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Being a hero means protecting our planet. Discover how we're making fashion more sustainable.
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Our Environmental Mission</h2>
          <p className="text-green-200 text-lg leading-relaxed">
            At HeroicThreads, we believe that true heroes protect the planet. That's why we're committed to sustainable practices 
            throughout our entire supply chain. From organic materials to carbon-neutral shipping, every decision we make considers 
            our environmental impact. Join us in being an eco-hero while looking stylish.
          </p>
        </div>

        {/* Initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {initiatives.map((initiative, index) => (
            <Card key={index} className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {initiative.icon}
                  <CardTitle className="text-white">{initiative.title}</CardTitle>
                </div>
                <CardDescription className="text-purple-300">
                  {initiative.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Impact in 2024</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">50,000+</div>
              <div className="text-purple-300">Pounds of CO2 Offset</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-purple-300">Organic Cotton Used</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">25,000+</div>
              <div className="text-purple-300">Recycled Packages Sent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-purple-300">Waste Reduction Goal</div>
            </div>
          </div>
        </div>

        {/* Future Goals */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Our 2025 Goals</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Zero Waste</h3>
                <p className="text-green-200 text-sm">Achieve zero waste to landfill in all our operations</p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Renewable Energy</h3>
                <p className="text-blue-200 text-sm">Power all facilities with 100% renewable energy</p>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-green-900/30 border border-purple-500/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Circular Fashion</h3>
                <p className="text-purple-200 text-sm">Launch take-back program for old garments</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sustainability;
