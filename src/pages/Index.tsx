
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategorySection } from '@/components/CategorySection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ThemeSection } from '@/components/ThemeSection';
import { TestimonialSection } from '@/components/TestimonialSection';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { ScrollProgress } from '@/components/ui/progress-indicator';

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Toaster position="top-right" />
      <Header />
      <ScrollProgress />
      <main>
        <Hero />
        <CategorySection />
        <FeaturedProducts />
        <ThemeSection />
        <TestimonialSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
