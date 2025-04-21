
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Shop = () => (
  <div className="min-h-screen bg-starry-darkPurple text-white">
    <Header />
    <main>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Shop</h1>
        {/* Content for all products, filtering, and sorting would appear here */}
        <p>Browse all our t-shirts and find your favorite superhero styles!</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Shop;
