
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutStory } from '@/components/about/AboutStory';
import { AboutValues } from '@/components/about/AboutValues';
import { AboutTeam } from '@/components/about/AboutTeam';
import { AboutFAQ } from '@/components/about/AboutFAQ';
import { AboutContact } from '@/components/about/AboutContact';

const About = () => {
  return (
    <div className="min-h-screen bg-starry-darkPurple text-white">
      <Header />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutValues />
        <AboutTeam />
        <AboutFAQ />
        <AboutContact />
      </main>
      <Footer />
    </div>
  );
};

export default About;
