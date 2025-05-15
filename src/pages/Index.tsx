
import React from "react";
import HeroBanner from "@/components/HeroBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandSection from "@/components/BrandSection";
import TrustSection from "@/components/TrustSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroBanner />
      <FeaturedProducts />
      <BrandSection />
      <TrustSection />
    </div>
  );
};

export default Index;
