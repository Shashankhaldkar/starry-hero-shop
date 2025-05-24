
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Star, Zap } from 'lucide-react';

const GiftCards = () => {
  const giftCardOptions = [
    { amount: 25, popular: false },
    { amount: 50, popular: true },
    { amount: 100, popular: false },
    { amount: 150, popular: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Gift Cards
            </h1>
          </div>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Give the gift of heroic style. Perfect for any superhero fan!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {giftCardOptions.map((option) => (
              <Card key={option.amount} className={`bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 relative ${option.popular ? 'ring-2 ring-purple-400' : ''}`}>
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-2xl">${option.amount}</CardTitle>
                  <CardDescription className="text-purple-300">
                    Perfect for {option.amount === 25 ? 'accessories' : option.amount === 50 ? 'a new tee' : option.amount === 100 ? 'a full outfit' : 'everything'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                    Purchase Gift Card
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">How Gift Cards Work</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-white font-medium mb-2">Choose Amount</h3>
                <p className="text-purple-300 text-sm">Select the perfect gift card value for your hero</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-white font-medium mb-2">Send to Recipient</h3>
                <p className="text-purple-300 text-sm">Gift card is delivered instantly via email</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-white font-medium mb-2">Shop & Enjoy</h3>
                <p className="text-purple-300 text-sm">Use the gift card on any HeroicThreads purchase</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GiftCards;
