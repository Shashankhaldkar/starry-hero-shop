
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategorySection } from '@/components/CategorySection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ThemeSection } from '@/components/ThemeSection';
import { TestimonialSection } from '@/components/TestimonialSection';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-starry-darkPurple text-white">
      <Header />
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
