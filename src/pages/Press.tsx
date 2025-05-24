
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink, Download } from 'lucide-react';

const Press = () => {
  const pressReleases = [
    {
      id: 1,
      title: "HeroicThreads Launches Sustainable Superhero Collection",
      date: "2024-01-15",
      excerpt: "New eco-friendly line made from 100% organic cotton aims to make superhero fashion more sustainable.",
      link: "#"
    },
    {
      id: 2,
      title: "Partnership with Comic-Con International Announced",
      date: "2023-12-10",
      excerpt: "HeroicThreads becomes official merchandise partner for Comic-Con events worldwide.",
      link: "#"
    },
    {
      id: 3,
      title: "HeroicThreads Raises $5M Series A for Global Expansion",
      date: "2023-11-22",
      excerpt: "Funding will support international expansion and new product development initiatives.",
      link: "#"
    }
  ];

  const mediaKit = [
    { name: "Company Logo (PNG)", size: "2.1 MB" },
    { name: "Brand Guidelines", size: "5.3 MB" },
    { name: "Product Photos", size: "12.7 MB" },
    { name: "Founder Headshots", size: "3.2 MB" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            Press & Media
          </h1>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Latest news, press releases, and media resources about HeroicThreads
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Press Releases */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Latest Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release) => (
                <Card key={release.id} className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-purple-400 text-sm mb-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(release.date).toLocaleDateString()}
                    </div>
                    <CardTitle className="text-white hover:text-purple-300 transition-colors">
                      {release.title}
                    </CardTitle>
                    <CardDescription className="text-purple-300">
                      {release.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-600/20">
                      Read Full Release <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Media Kit */}
            <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Media Kit</CardTitle>
                <CardDescription className="text-purple-300">
                  Download our brand assets and press materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mediaKit.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                      <div>
                        <div className="text-white text-sm font-medium">{item.name}</div>
                        <div className="text-purple-400 text-xs">{item.size}</div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-purple-300 hover:text-white">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Media Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-white font-medium">Sarah Johnson</div>
                  <div className="text-purple-300 text-sm">Head of Communications</div>
                </div>
                <div>
                  <div className="text-purple-400 text-sm">Email</div>
                  <div className="text-white">press@heroicthreads.com</div>
                </div>
                <div>
                  <div className="text-purple-400 text-sm">Phone</div>
                  <div className="text-white">+1 (555) 123-4567</div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  Contact Media Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Press;
