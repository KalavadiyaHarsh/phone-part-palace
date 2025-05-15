
import React from "react";
import { Link } from "react-router-dom";
import { Smartphone } from "lucide-react";

const brands = [
  { 
    id: "apple", 
    name: "Apple", 
    logo: "/lovable-uploads/1f77cbec-ca2f-4c8a-853f-4606eb991516.png",
    logoPosition: "0 0",
    icon: <Smartphone className="h-6 w-6" /> 
  },
  { 
    id: "oneplus", 
    name: "OnePlus", 
    logo: "/lovable-uploads/1f77cbec-ca2f-4c8a-853f-4606eb991516.png",
    logoPosition: "-100% 0"
  },
  { 
    id: "oppo", 
    name: "OPPO", 
    logo: "/lovable-uploads/1f77cbec-ca2f-4c8a-853f-4606eb991516.png",
    logoPosition: "-200% 0" 
  },
  { 
    id: "vivo", 
    name: "Vivo", 
    logo: "/lovable-uploads/1f77cbec-ca2f-4c8a-853f-4606eb991516.png",
    logoPosition: "-300% 0" 
  },
  { 
    id: "xiaomi", 
    name: "Mi", 
    logo: "/lovable-uploads/1f77cbec-ca2f-4c8a-853f-4606eb991516.png",
    logoPosition: "-400% 0" 
  },
  { 
    id: "samsung", 
    name: "Samsung", 
    logo: "/lovable-uploads/1f77cbec-ca2f-4c8a-853f-4606eb991516.png",
    logoPosition: "-500% 0" 
  },
  { 
    id: "realme", 
    name: "Realme", 
    logo: "/lovable-uploads/1f77cbec-ca2f-4c8a-853f-4606eb991516.png",
    logoPosition: "0 -100%" 
  },
  { 
    id: "google", 
    name: "Google", 
    logo: "/lovable-uploads/1f77cbec-ca2f-4c8a-853f-4606eb991516.png",
    logoPosition: "-100% -100%" 
  },
  { 
    id: "motorola", 
    name: "Motorola", 
    logo: "/lovable-uploads/1f77cbec-ca2f-4c8a-853f-4606eb991516.png",
    logoPosition: "-200% -100%" 
  },
  { 
    id: "nokia", 
    name: "Nokia", 
    logo: "/lovable-uploads/1f77cbec-ca2f-4c8a-853f-4606eb991516.png",
    logoPosition: "-300% -100%" 
  },
  { 
    id: "lg", 
    name: "LG", 
    logo: "/lovable-uploads/1f77cbec-ca2f-4c8a-853f-4606eb991516.png",
    logoPosition: "-400% -100%" 
  },
  { 
    id: "micromax", 
    name: "Micromax", 
    logo: "/lovable-uploads/1f77cbec-ca2f-4c8a-853f-4606eb991516.png",
    logoPosition: "-500% -100%" 
  },
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
      fallback.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect><line x1="2" y1="12" x2="22" y2="12"></line></svg>`;
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
              <div className="h-12 flex items-center justify-center mb-2 relative w-12">
                {brand.icon ? (
                  brand.icon
                ) : (
                  <div 
                    className="w-12 h-12 bg-no-repeat bg-cover rounded-full border border-gray-100"
                    style={{ 
                      backgroundImage: `url(${brand.logo})`,
                      backgroundPosition: brand.logoPosition,
                      backgroundSize: "600%"
                    }}
                  ></div>
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
