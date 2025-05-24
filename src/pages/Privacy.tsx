
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Privacy Policy
            </h1>
            <p className="text-purple-300">Last updated: January 1, 2024</p>
          </div>

          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-300 space-y-4">
              <p>We collect information you provide directly to us, such as when you:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Create an account or make a purchase</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us for customer support</li>
                <li>Participate in surveys or promotions</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-300 space-y-4">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process transactions and send order confirmations</li>
                <li>Provide customer service and support</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Improve our products and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-300 space-y-4">
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With your explicit consent</li>
                <li>To trusted service providers who assist in our operations</li>
                <li>To comply with legal requirements</li>
                <li>To protect our rights and safety</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-300 space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-300">
              <p>If you have questions about this Privacy Policy, please contact us at:</p>
              <p className="mt-2">
                Email: privacy@heroicthreads.com<br />
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

export default Privacy;
