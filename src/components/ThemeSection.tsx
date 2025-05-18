import { useState, useEffect } from "react";
import { getProductThemes } from "@/api/productsData";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface Theme {
  id: string;
  name: string;
  image: string;
}

export function ThemeSection() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchThemes = async () => {
      setIsLoading(true);
      const fetchedThemes = await getProductThemes();
      setThemes(
        fetchedThemes.map((theme, index) => ({
          id: theme.toLowerCase().replace(/\s+/g, "-"),
          name: theme,
          image: `https://source.unsplash.com/600x400/?${theme}&${index}`,
        }))
      );
      setIsLoading(false);
    };

    fetchThemes();
  }, []);

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Shop By Theme</h2>
      {isLoading ? (
        <div className="text-center">Loading themes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((theme) => (
            <Card key={theme.id} className="bg-gray-900/50 border-gray-700 group cursor-pointer hover:border-gray-500 transition-all overflow-hidden">
              <Link to={`/shop?theme=${encodeURIComponent(theme.name)}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={theme.image}
                    alt={theme.name}
                    className="w-full h-64 object-cover brightness-75 group-hover:brightness-100 transition-all group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all">
                    <h3 className="text-white text-xl font-bold text-center px-4">{theme.name}</h3>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

