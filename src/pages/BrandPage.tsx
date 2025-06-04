import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";

// Mock data for brands
const brands = [
  { 
    id: "apple", 
    name: "Apple", 
    logo: "https://www.apple.com/ac/globalnav/7/en_US/images/be15095f-5a20-57d0-ad14-cf4c638e223a/globalnav_apple_image__b5er5ngrzxqq_large.svg",
    banner: "https://images.unsplash.com/photo-1588058365548-9ded0e2f5053?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Explore our collection of premium quality replacement parts for Apple devices. From iPhone to iPad and MacBook, we provide all the components you need to repair your Apple devices with confidence."
  },
  { 
    id: "samsung", 
    name: "Samsung", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png",
    banner: "https://images.unsplash.com/photo-1662005723038-b54bcfdc7c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Find high-quality replacement parts for all Samsung Galaxy models. Our extensive inventory includes displays, batteries, back panels, and more, ensuring your Samsung device gets the best care possible."
  },
  { 
    id: "oneplus", 
    name: "OnePlus", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OnePlus_logo.svg/2560px-OnePlus_logo.svg.png",
    banner: "https://images.unsplash.com/photo-1611791484467-cde709c72e94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Get authentic OnePlus replacement parts for all OnePlus models. We stock genuine displays, batteries, charging ports, and more to keep your OnePlus device running smoothly."
  },
  { 
    id: "oppo", 
    name: "OPPO", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/OPPO_Logo.svg/2560px-OPPO_Logo.svg.png",
    banner: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Quality OPPO replacement parts for all OPPO smartphone models. From displays to batteries and charging components, we have everything you need for OPPO device repairs."
  },
  { 
    id: "vivo", 
    name: "Vivo", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vivo_logo.svg/2560px-Vivo_logo.svg.png",
    banner: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Authentic Vivo spare parts for all Vivo smartphone models. Our inventory includes screens, batteries, cameras, and other essential components for Vivo device repairs."
  },
  { 
    id: "xiaomi", 
    name: "Mi", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/2560px-Xiaomi_logo.svg.png",
    banner: "https://images.unsplash.com/photo-1592286927505-1def25115f54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Complete range of Xiaomi (Mi) replacement parts for all models. We offer genuine displays, batteries, charging ports, and accessories for your Xiaomi device repairs."
  },
  { 
    id: "realme", 
    name: "Realme", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Realme_logo.svg/2560px-Realme_logo.svg.png",
    banner: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "High-quality Realme replacement parts for all Realme smartphone models. From displays to batteries and charging components, we ensure your Realme device gets the best care."
  },
  { 
    id: "google", 
    name: "Google", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
    banner: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Genuine Google Pixel replacement parts for all Pixel models. We stock authentic displays, batteries, cameras, and other components for Google Pixel device repairs."
  },
  { 
    id: "motorola", 
    name: "Motorola", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Motorola_logo.svg/2560px-Motorola_logo.svg.png",
    banner: "https://images.unsplash.com/photo-1565792261473-d3dc8ed8cf3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Quality Motorola replacement parts for all Motorola smartphone models. From displays to batteries and charging ports, we have everything for Motorola device repairs."
  },
  { 
    id: "nokia", 
    name: "Nokia", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nokia_wordmark.svg/2560px-Nokia_wordmark.svg.png",
    banner: "https://images.unsplash.com/photo-1565792261473-d3dc8ed8cf3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Authentic Nokia replacement parts for all Nokia smartphone models. We provide genuine displays, batteries, charging components, and accessories for Nokia device repairs."
  },
  { 
    id: "lg", 
    name: "LG", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/LG_logo_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png",
    banner: "https://images.unsplash.com/photo-1565792261473-d3dc8ed8cf3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Quality LG replacement parts for all LG smartphone models. From displays to batteries and charging components, we ensure your LG device gets professional repair support."
  },
  { 
    id: "micromax", 
    name: "Micromax", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Micromax_logo.svg/2560px-Micromax_logo.svg.png",
    banner: "https://images.unsplash.com/photo-1565792261473-d3dc8ed8cf3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Affordable Micromax replacement parts for all Micromax smartphone models. We stock displays, batteries, charging ports, and other essential components for Micromax repairs."
  },
];

// Mock product data
const products = [
  {
    id: "iphone14-backpanel",
    name: "Back Panel Cover for iPhone 14 Pro Max",
    price: 699,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115f54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Back Panels",
    slug: "back-panel-cover-for-iphone-14-pro-max",
    brand: "apple"
  },
  {
    id: "iphone14-combo",
    name: "Mobile Combo For iPhone 14 Pro Max",
    price: 8269,
    originalPrice: 9999,
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Combo Deals",
    slug: "mobile-combo-iphone-14-pro-max",
    brand: "apple"
  },
  {
    id: "note8-battery",
    name: "Mobile Battery for Samsung Note 8 Pro",
    price: 699,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1583225214464-9296029427aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    category: "Battery",
    slug: "mobile-battery-samsung-note-8-pro",
    brand: "samsung"
  },
  {
    id: "oneplus-9-display",
    name: "Display Screen for OnePlus 9 Pro",
    price: 4599,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    category: "Display",
    slug: "display-screen-oneplus-9-pro",
    brand: "oneplus"
  },
  {
    id: "oneplus-8t-battery",
    name: "Battery for OnePlus 8T",
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1583225214464-9296029427aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    category: "Battery",
    slug: "battery-oneplus-8t",
    brand: "oneplus"
  },
];

// Model data for each brand
const brandModels = {
  apple: [
    {
      name: "iPhone 14 Pro Max",
      image: "https://images.unsplash.com/photo-1665577893321-382839a362eb?q=80&w=1035&auto=format&fit=crop",
      slug: "iphone-14-pro-max"
    },
    {
      name: "iPhone 14 Pro",
      image: "https://images.unsplash.com/photo-1662444290846-a46489c66a86?q=80&w=1852&auto=format&fit=crop",
      slug: "iphone-14-pro"
    },
    {
      name: "iPhone 14 Plus",
      image: "https://images.unsplash.com/photo-1664478546384-d57ffe74a669?q=80&w=1780&auto=format&fit=crop",
      slug: "iphone-14-plus"
    },
    {
      name: "iPhone 14",
      image: "https://images.unsplash.com/photo-1665577893849-94056113f882?q=80&w=1035&auto=format&fit=crop",
      slug: "iphone-14"
    },
    {
      name: "iPhone 13 Pro Max",
      image: "https://images.unsplash.com/photo-1636051028888-77fe370d519b?q=80&w=1035&auto=format&fit=crop",
      slug: "iphone-13-pro-max"
    },
    {
      name: "iPhone 13 Pro",
      image: "https://images.unsplash.com/photo-1635069701669-4afe928f5179?q=80&w=1035&auto=format&fit=crop",
      slug: "iphone-13-pro"
    },
    {
      name: "iPhone 13",
      image: "https://images.unsplash.com/photo-1632634076846-efe9137ef8f5?q=80&w=1035&auto=format&fit=crop",
      slug: "iphone-13"
    },
    {
      name: "iPhone 13 Mini",
      image: "https://images.unsplash.com/photo-1636052081518-f3063f35a08b?q=80&w=1035&auto=format&fit=crop",
      slug: "iphone-13-mini"
    },
    {
      name: "iPhone 12 Pro Max",
      image: "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?q=80&w=1035&auto=format&fit=crop",
      slug: "iphone-12-pro-max"
    }
  ],
  samsung: [
    {
      name: "Galaxy S23 Ultra",
      image: "https://images.unsplash.com/photo-1676315527743-b1b7c60486d8?q=80&w=1035&auto=format&fit=crop",
      slug: "galaxy-s23-ultra"
    },
    {
      name: "Galaxy S23+",
      image: "https://images.unsplash.com/photo-1677099364710-4087796ead24?q=80&w=1035&auto=format&fit=crop",
      slug: "galaxy-s23-plus"
    },
    {
      name: "Galaxy S23",
      image: "https://images.unsplash.com/photo-1677099375551-68ed40600043?q=80&w=1035&auto=format&fit=crop",
      slug: "galaxy-s23"
    },
    {
      name: "Galaxy S22 Ultra",
      image: "https://images.unsplash.com/photo-1644654998346-84a40c67f645?q=80&w=1035&auto=format&fit=crop",
      slug: "galaxy-s22-ultra"
    },
    {
      name: "Galaxy S22+",
      image: "https://images.unsplash.com/photo-1644655007829-261159f4ba56?q=80&w=1035&auto=format&fit=crop",
      slug: "galaxy-s22-plus"
    },
    {
      name: "Galaxy Note 20",
      image: "https://images.unsplash.com/photo-1598327105854-c8674faddf79?q=80&w=1035&auto=format&fit=crop",
      slug: "galaxy-note-20"
    },
    {
      name: "Galaxy A53",
      image: "https://images.unsplash.com/photo-1653916986137-613f4e3f6e7e?q=80&w=1035&auto=format&fit=crop",
      slug: "galaxy-a53"
    },
    {
      name: "Galaxy A23",
      image: "https://images.unsplash.com/photo-1611740677496-3e0ef906e1e8?q=80&w=1035&auto=format&fit=crop",
      slug: "galaxy-a23"
    }
  ],
  oneplus: [
    {
      name: "OnePlus 11",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1035&auto=format&fit=crop",
      slug: "oneplus-11"
    },
    {
      name: "OnePlus 10 Pro",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1035&auto=format&fit=crop",
      slug: "oneplus-10-pro"
    },
    {
      name: "OnePlus 10T",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1035&auto=format&fit=crop",
      slug: "oneplus-10t"
    },
    {
      name: "OnePlus 9 Pro",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1035&auto=format&fit=crop",
      slug: "oneplus-9-pro"
    },
    {
      name: "OnePlus 9",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1035&auto=format&fit=crop",
      slug: "oneplus-9"
    },
    {
      name: "OnePlus 8T",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1035&auto=format&fit=crop",
      slug: "oneplus-8t"
    },
    {
      name: "OnePlus 8 Pro",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1035&auto=format&fit=crop",
      slug: "oneplus-8-pro"
    },
    {
      name: "OnePlus Nord 2T",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1035&auto=format&fit=crop",
      slug: "oneplus-nord-2t"
    }
  ],
  oppo: [
    {
      name: "OPPO Reno 8 Pro",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1035&auto=format&fit=crop",
      slug: "oppo-reno-8-pro"
    },
    {
      name: "OPPO Reno 8",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1035&auto=format&fit=crop",
      slug: "oppo-reno-8"
    },
    {
      name: "OPPO Find X5 Pro",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1035&auto=format&fit=crop",
      slug: "oppo-find-x5-pro"
    },
    {
      name: "OPPO A78",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1035&auto=format&fit=crop",
      slug: "oppo-a78"
    },
    {
      name: "OPPO A58",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1035&auto=format&fit=crop",
      slug: "oppo-a58"
    }
  ],
  vivo: [
    {
      name: "Vivo V27 Pro",
      image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1035&auto=format&fit=crop",
      slug: "vivo-v27-pro"
    },
    {
      name: "Vivo V27",
      image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1035&auto=format&fit=crop",
      slug: "vivo-v27"
    },
    {
      name: "Vivo Y35",
      image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1035&auto=format&fit=crop",
      slug: "vivo-y35"
    },
    {
      name: "Vivo Y22",
      image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1035&auto=format&fit=crop",
      slug: "vivo-y22"
    },
    {
      name: "Vivo Y20",
      image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1035&auto=format&fit=crop",
      slug: "vivo-y20"
    }
  ],
  xiaomi: [
    {
      name: "Xiaomi 13 Pro",
      image: "https://images.unsplash.com/photo-1592286927505-1def25115f54?q=80&w=1035&auto=format&fit=crop",
      slug: "xiaomi-13-pro"
    },
    {
      name: "Xiaomi 13",
      image: "https://images.unsplash.com/photo-1592286927505-1def25115f54?q=80&w=1035&auto=format&fit=crop",
      slug: "xiaomi-13"
    },
    {
      name: "Redmi Note 12 Pro",
      image: "https://images.unsplash.com/photo-1592286927505-1def25115f54?q=80&w=1035&auto=format&fit=crop",
      slug: "redmi-note-12-pro"
    },
    {
      name: "Redmi Note 12",
      image: "https://images.unsplash.com/photo-1592286927505-1def25115f54?q=80&w=1035&auto=format&fit=crop",
      slug: "redmi-note-12"
    },
    {
      name: "POCO X5 Pro",
      image: "https://images.unsplash.com/photo-1592286927505-1def25115f54?q=80&w=1035&auto=format&fit=crop",
      slug: "poco-x5-pro"
    }
  ],
  realme: [
    {
      name: "Realme 11 Pro",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1035&auto=format&fit=crop",
      slug: "realme-11-pro"
    },
    {
      name: "Realme 11",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1035&auto=format&fit=crop",
      slug: "realme-11"
    },
    {
      name: "Realme GT 3",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1035&auto=format&fit=crop",
      slug: "realme-gt-3"
    },
    {
      name: "Realme C55",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1035&auto=format&fit=crop",
      slug: "realme-c55"
    }
  ],
  google: [
    {
      name: "Pixel 8 Pro",
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=1035&auto=format&fit=crop",
      slug: "pixel-8-pro"
    },
    {
      name: "Pixel 8",
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=1035&auto=format&fit=crop",
      slug: "pixel-8"
    },
    {
      name: "Pixel 7a",
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=1035&auto=format&fit=crop",
      slug: "pixel-7a"
    },
    {
      name: "Pixel 7 Pro",
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=1035&auto=format&fit=crop",
      slug: "pixel-7-pro"
    }
  ],
  motorola: [
    {
      name: "Moto G73",
      image: "https://images.unsplash.com/photo-1565792261473-d3dc8ed8cf3b?q=80&w=1035&auto=format&fit=crop",
      slug: "moto-g73"
    },
    {
      name: "Moto G53",
      image: "https://images.unsplash.com/photo-1565792261473-d3dc8ed8cf3b?q=80&w=1035&auto=format&fit=crop",
      slug: "moto-g53"
    },
    {
      name: "Moto Edge 40",
      image: "https://images.unsplash.com/photo-1565792261473-d3dc8ed8cf3b?q=80&w=1035&auto=format&fit=crop",
      slug: "moto-edge-40"
    }
  ],
  nokia: [
    {
      name: "Nokia X30",
      image: "https://images.unsplash.com/photo-1565792261473-d3dc8ed8cf3b?q=80&w=1035&auto=format&fit=crop",
      slug: "nokia-x30"
    },
    {
      name: "Nokia G60",
      image: "https://images.unsplash.com/photo-1565792261473-d3dc8ed8cf3b?q=80&w=1035&auto=format&fit=crop",
      slug: "nokia-g60"
    },
    {
      name: "Nokia C31",
      image: "https://images.unsplash.com/photo-1565792261473-d3dc8ed8cf3b?q=80&w=1035&auto=format&fit=crop",
      slug: "nokia-c31"
    }
  ],
  lg: [
    {
      name: "LG Wing",
      image: "https://images.unsplash.com/photo-1565792261473-d3dc8ed8cf3b?q=80&w=1035&auto=format&fit=crop",
      slug: "lg-wing"
    },
    {
      name: "LG V60",
      image: "https://images.unsplash.com/photo-1565792261473-d3dc8ed8cf3b?q=80&w=1035&auto=format&fit=crop",
      slug: "lg-v60"
    }
  ],
  micromax: [
    {
      name: "Micromax In Note 2",
      image: "https://images.unsplash.com/photo-1565792261473-d3dc8ed8cf3b?q=80&w=1035&auto=format&fit=crop",
      slug: "micromax-in-note-2"
    },
    {
      name: "Micromax In 2b",
      image: "https://images.unsplash.com/photo-1565792261473-d3dc8ed8cf3b?q=80&w=1035&auto=format&fit=crop",
      slug: "micromax-in-2b"
    }
  ]
};

const BrandPage = () => {
  const { brandId } = useParams();
  
  const brand = brands.find((b) => b.id === brandId);
  
  if (!brand) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Brand Not Found</h1>
        <p className="mb-8">We couldn't find the brand you're looking for.</p>
        <Link 
          to="/" 
          className="inline-block bg-brand-orange hover:bg-brand-orange/90 text-white font-medium py-2 px-6 rounded"
        >
          Return to Home
        </Link>
      </div>
    );
  }
  
  const brandProducts = products.filter((product) => product.brand === brandId);
  const models = brandModels[brandId as keyof typeof brandModels] || [];
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center space-x-1">
          <li>
            <Link to="/" className="text-gray-500 hover:text-brand-orange">Home</Link>
          </li>
          <li><ChevronRight size={14} className="text-gray-400" /></li>
          <li>
            <Link to="/brands" className="text-gray-500 hover:text-brand-orange">
              Brands
            </Link>
          </li>
          <li><ChevronRight size={14} className="text-gray-400" /></li>
          <li className="text-gray-900 font-medium truncate">{brand.name}</li>
        </ol>
      </nav>
      
      {/* Brand header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4 uppercase">{brand.name} MODELS</h1>
        <p className="text-gray-700">{brand.description}</p>
      </div>
      
      {/* Product models grid */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {models.map((model, index) => (
            <Link
              key={model.slug}
              to={`/category/${brandId}-${model.slug}`}
              className="border rounded-lg text-center hover:border-brand-orange transition-colors overflow-hidden"
            >
              <div className="aspect-square">
                <img 
                  src={model.image} 
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium">{model.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Featured products */}
      {brandProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">FEATURED {brand.name.toUpperCase()} PRODUCTS</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brandProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}
      
      {/* Show message if no products available for this brand */}
      {brandProducts.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Coming Soon</h2>
          <p className="text-gray-600">Products for {brand.name} will be available soon. Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default BrandPage;
