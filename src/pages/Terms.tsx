
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Terms of Service
            </h1>
            <p className="text-purple-300">Last updated: January 1, 2024</p>
          </div>

          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-300 space-y-4">
              <p>
                By accessing and using HeroicThreads, you accept and agree to be bound by the terms and 
                provision of this agreement. If you do not agree to abide by the above, please do not 
                use this service.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Use License</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-300 space-y-4">
              <p>Permission is granted to temporarily download one copy of the materials on HeroicThreads for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Product Information</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-300 space-y-4">
              <p>We strive to provide accurate product information, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Product descriptions and specifications</li>
                <li>Pricing and availability</li>
                <li>Shipping information</li>
                <li>Size and color options</li>
              </ul>
              <p>However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Orders and Payment</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-300 space-y-4">
              <p>By placing an order, you agree that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You are legally capable of entering into binding contracts</li>
                <li>All information you provide is accurate and complete</li>
                <li>You authorize us to charge your payment method</li>
                <li>We may cancel orders for any reason</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Returns and Refunds</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-300 space-y-4">
              <p>We offer returns within 30 days of purchase, subject to our return policy:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Items must be unworn and in original condition</li>
                <li>Original tags must be attached</li>
                <li>Customer is responsible for return shipping costs</li>
                <li>Refunds will be processed within 5-7 business days</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-300">
              <p>Questions about these Terms of Service should be sent to us at:</p>
              <p className="mt-2">
                Email: legal@heroicthreads.com<br />
                Phone: +1 (234) 567-890
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
