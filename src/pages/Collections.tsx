
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Collections = () => (
  <div className="min-h-screen bg-starry-darkPurple text-white">
    <Header />
    <main>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Collections</h1>
        {/* Collection categories or gallery */}
        <p>Explore our curated t-shirt collections, from comic classics to new-age heroes!</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Collections;
