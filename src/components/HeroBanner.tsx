
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BannerItem {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  image: string;
  bgColor?: string;
}

const banners: BannerItem[] = [
  {
    id: 1,
    title: "CHARGE SMART",
    subtitle: "PAY LESS",
    cta: "SHOP NOW",
    ctaLink: "/category/accessories",
    image: "https://images.unsplash.com/photo-1492107376256-4026437554b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
  },
  {
    id: 2,
    title: "NEW PRODUCT LAUNCH",
    subtitle: "RD 009T LCD Separator Machine",
    cta: "ORDER NOW",
    ctaLink: "/products/rd-009t-lcd-separator-machine",
    image: "https://images.unsplash.com/photo-1602526429747-ac387a91d43b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
  },
];

const HeroBanner: React.FC = () => {
  const [currentBanner, setCurrentBanner] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentBanner(index);
  };

  return (
    <div className="relative w-full overflow-hidden hero-gradient">
      <div className="container relative">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`flex flex-col md:flex-row items-center transition-opacity duration-500 p-6 md:p-0 ${
              index === currentBanner ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
            style={{
              backgroundColor: banner.bgColor || "transparent",
            }}
          >
            <div className="md:w-1/2 md:pr-8 z-10 text-center md:text-left mb-6 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                <span className="text-gray-900">{banner.title.split(" ")[0]}</span>{" "}
                <span className="text-brand-blue">{banner.title.split(" ")[1]}</span>
              </h1>
              <h2 className="text-xl md:text-3xl font-semibold mb-4 text-brand-blue">
                {banner.subtitle}
              </h2>
              <Button 
                asChild 
                className="rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white px-6"
              >
                <Link to={banner.ctaLink}>{banner.cta}</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                style={{ maxHeight: "400px" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Banner navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentBanner 
                ? "bg-brand-orange w-6" 
                : "bg-gray-300"
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
