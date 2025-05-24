
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Evolution of Superhero Fashion in Comics",
      excerpt: "From golden age to modern day, explore how superhero costumes have influenced mainstream fashion and our daily wardrobe choices.",
      category: "Fashion",
      author: "Alex Parker",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=500",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Building Your Hero Wardrobe: Essential Pieces",
      excerpt: "Discover the must-have items every superhero fan needs in their closet, from subtle nods to bold statements.",
      category: "Style Guide",
      author: "Sam Wilson",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=500",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Sustainable Superhero: Eco-Friendly Comic Apparel",
      excerpt: "Learn about our commitment to sustainable fashion and how you can be an environmental hero while looking stylish.",
      category: "Sustainability",
      author: "Diana Prince",
      date: "2024-01-05",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=500",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Comic-Con Style: What to Wear to Conventions",
      excerpt: "Your ultimate guide to convention fashion - from cosplay alternatives to comfortable con-going outfits.",
      category: "Events",
      author: "Peter Parker",
      date: "2023-12-28",
      image: "https://images.unsplash.com/photo-1606115757624-6b777193bd7f?auto=format&fit=crop&q=80&w=500",
      readTime: "8 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            HeroicThreads Blog
          </h1>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Stories, style guides, and superhero fashion inspiration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 hover:border-purple-400/50 transition-all group">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-purple-600/50 text-purple-200">
                    {post.category}
                  </Badge>
                  <span className="text-purple-400 text-sm">{post.readTime}</span>
                </div>
                <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-purple-300">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-purple-400 text-sm">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2 text-purple-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                <Button variant="ghost" className="w-full text-purple-300 hover:text-white hover:bg-purple-600/20">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
