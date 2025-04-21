
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Account = () => (
  <div className="min-h-screen bg-starry-darkPurple text-white">
    <Header />
    <main>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>
        {/* Account management such as profile, orders, wishlist */}
        <p>View and manage your account details, orders, and wishlist.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Account;
