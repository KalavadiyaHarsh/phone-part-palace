
import React from "react";
import { Link } from "react-router-dom";

const brands = [
  { id: "apple", name: "Apple", logo: "https://www.apple.com/ac/globalnav/7/en_US/images/be15095f-5a20-57d0-ad14-cf4c638e223a/globalnav_apple_image__b5er5ngrzxqq_large.svg" },
  { id: "samsung", name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png" },
  { id: "xiaomi", name: "Mi", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/2048px-Xiaomi_logo_%282021-%29.svg.png" },
  { id: "oneplus", name: "OnePlus", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/OnePlus_logo.svg/2560px-OnePlus_logo.svg.png" },
  { id: "oppo", name: "OPPO", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/OPPO_LOGO_2019.svg/2560px-OPPO_LOGO_2019.svg.png" },
  { id: "vivo", name: "Vivo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Vivo_logo_2019.svg/1024px-Vivo_logo_2019.svg.png" },
  { id: "realme", name: "Realme", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Realme_logo.svg/2560px-Realme_logo.svg.png" },
  { id: "motorola", name: "Motorola", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Motorola_logo.svg/1000px-Motorola_logo.svg.png" },
  { id: "nokia", name: "Nokia", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nokia_wordmark.svg/1280px-Nokia_wordmark.svg.png" },
  { id: "lg", name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG_logo_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png" },
  { id: "google", name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png" },
  { id: "micromax", name: "Micromax", logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Micromax_Logo_%282%29.png" },
];

const BrandSection: React.FC = () => {
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
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 object-contain"
                />
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
