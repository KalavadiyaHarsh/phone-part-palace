
import React from "react";
import { Link } from "react-router-dom";
import { Apple, ShoppingBag } from "lucide-react";

const brands = [
  { id: "apple", name: "Apple", logo: "https://www.apple.com/ac/globalnav/7/en_US/images/be15095f-5a20-57d0-ad14-cf4c638e223a/globalnav_apple_image__b5er5ngrzxqq_large.svg", icon: <Apple className="h-6 w-6" /> },
  { id: "samsung", name: "Samsung", logo: "https://download.logo.wine/logo/Samsung/Samsung-Logo.wine.png" },
  { id: "xiaomi", name: "Mi", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/1024px-Xiaomi_logo_%282021-%29.svg.png" },
  { id: "oneplus", name: "OnePlus", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/OnePlus_logo.svg/1280px-OnePlus_logo.svg.png" },
  { id: "oppo", name: "OPPO", logo: "https://logos-world.net/wp-content/uploads/2020/06/Oppo-Logo.png" },
  { id: "vivo", name: "Vivo", logo: "https://logos-world.net/wp-content/uploads/2020/11/Vivo-Logo.png" },
  { id: "realme", name: "Realme", logo: "https://logos-world.net/wp-content/uploads/2020/11/Realme-Symbol.png" },
  { id: "motorola", name: "Motorola", logo: "https://logos-world.net/wp-content/uploads/2020/07/Motorola-Logo.png" },
  { id: "nokia", name: "Nokia", logo: "https://logos-world.net/wp-content/uploads/2020/08/Nokia-Logo.png" },
  { id: "lg", name: "LG", logo: "https://logos-world.net/wp-content/uploads/2020/05/LG-Logo.png" },
  { id: "google", name: "Google", logo: "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png" },
  { id: "micromax", name: "Micromax", logo: "https://logos-world.net/wp-content/uploads/2020/11/Micromax-Logo.png" },
];

const BrandSection: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, brandId: string) => {
    // Use fallback icon when image fails to load
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite callback loop
    target.style.display = "none"; // Hide the broken image
    
    // Find parent element and append a fallback icon
    const parent = target.parentElement;
    if (parent) {
      const fallback = document.createElement("div");
      fallback.className = "flex items-center justify-center";
      fallback.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><path d="M5 8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v0Z"></path><path d="M5 14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v0Z"></path><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v0Z"></path></svg>`;
      parent.appendChild(fallback);
    }
  };

  return (
    <section className="py-10 bg-white">
      <div className="container px-4">
        <h2 className="text-2xl font-bold text-center mb-8 relative">
          <span className="px-4 bg-white relative z-10">TOP BRANDS</span>
          <span className="absolute left-0 right-0 top-1/2 h-px bg-gray-200 -z-0"></span>
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/brand/${brand.id}`}
              className="flex flex-col items-center border border-gray-200 rounded-lg p-4 hover:border-brand-orange transition-colors"
            >
              <div className="h-12 flex items-center justify-center mb-2">
                {brand.icon ? (
                  brand.icon
                ) : (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-8 object-contain"
                    onError={(e) => handleImageError(e, brand.id)}
                  />
                )}
              </div>
              <span className="text-sm font-medium text-center">{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
