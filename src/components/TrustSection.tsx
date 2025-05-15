
import React from "react";
import { ShieldCheck, RefreshCcw, CreditCard, Truck } from "lucide-react";

const trustFeatures = [
  {
    icon: <ShieldCheck size={48} className="text-brand-orange" />,
    title: "Quality Products",
    description: "Premium quality spare parts for all major brands",
  },
  {
    icon: <RefreshCcw size={48} className="text-brand-orange" />,
    title: "Easy Replacement",
    description: "Simple return process if you're not satisfied",
  },
  {
    icon: <CreditCard size={48} className="text-brand-orange" />,
    title: "Payment Security",
    description: "Multiple secure payment options available",
  },
  {
    icon: <Truck size={48} className="text-brand-orange" />,
    title: "Free* Home Delivery",
    description: "Free shipping on orders above ₹500",
  },
];

const TrustSection: React.FC = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container px-4">
        <h2 className="text-2xl font-bold text-center mb-8 relative">
          <span className="px-4 bg-gray-50 relative z-10">WHY TRUST MPARTS STORE</span>
          <span className="absolute left-0 right-0 top-1/2 h-px bg-gray-200 -z-0"></span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
