const products = [
  /* ================= MARBLE ================= */
  {
    id: 1,
    name: "Statuario Italian Marble",
    slug: "statuario-italian-marble",
    category: "marble",
    finish: "Polished",

    heroSubtitle:
      "Premium Italian marble crafted for timeless luxury interiors.",

    overview:
      "Statuario Italian Marble is renowned for its bold veining and pristine white background. Ideal for luxury residences, villas, and architectural masterpieces.",

    usage: [
      "Flooring",
      "Wall Cladding",
      "Countertops",
      "Staircases",
      "Bathrooms",
    ],

    specifications: {
      origin: "Italy",
      thickness: "18–20 mm",
      waterAbsorption: "< 0.2%",
      hardness: "High",
      application: "Indoor",
    },

    finishesAvailable: ["Polished", "Honed"],

    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687644-c7b8c45b2d77?q=80&w=1200",
    ],

    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
  },

  {
    id: 2,
    name: "Carrara White Marble",
    slug: "carrara-white-marble",
    category: "marble",
    finish: "Honed",

    heroSubtitle:
      "Elegant white marble with subtle grey veining.",

    overview:
      "Carrara Marble offers a soft, classic look suitable for modern and traditional interiors alike.",

    usage: ["Flooring", "Wall Cladding", "Bathrooms"],

    specifications: {
      origin: "Italy",
      thickness: "18 mm",
      waterAbsorption: "< 0.3%",
      hardness: "Medium",
      application: "Indoor",
    },

    finishesAvailable: ["Honed", "Polished"],

    gallery: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200",
    ],

    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200",
  },

  /* ================= GRANITE ================= */
  {
    id: 4,
    name: "Black Galaxy Granite",
    slug: "black-galaxy-granite",
    category: "granite",
    finish: "Polished",

    heroSubtitle:
      "Striking granite with golden crystalline patterns.",

    overview:
      "Black Galaxy Granite is known for its durability and shimmering gold specks, perfect for kitchens and high-traffic areas.",

    usage: ["Kitchen Countertops", "Flooring", "Stairs"],

    specifications: {
      origin: "India",
      thickness: "18–20 mm",
      waterAbsorption: "< 0.1%",
      hardness: "Very High",
      application: "Indoor / Outdoor",
    },

    finishesAvailable: ["Polished", "Leather", "Flamed"],

    gallery: [
      "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1200",
    ],

    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1200",
  },

  /* ================= TILES ================= */
  {
    id: 8,
    name: "Porcelain Wall Tiles",
    slug: "porcelain-wall-tiles",
    category: "tiles",
    finish: "Glossy",

    heroSubtitle:
      "Modern porcelain tiles for elegant wall applications.",

    overview:
      "Porcelain Wall Tiles combine strength, low maintenance, and refined aesthetics—ideal for residential and commercial spaces.",

    usage: ["Walls", "Bathrooms", "Kitchens", "Commercial Spaces"],

    specifications: {
      material: "Porcelain",
      thickness: "8–10 mm",
      waterAbsorption: "< 0.5%",
      slipResistance: "Moderate",
      application: "Indoor",
    },

    finishesAvailable: ["Glossy", "Matt", "Textured"],

    gallery: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1200",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200",
    ],

    image:
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1200",
  },

  /* ================= BATHWARE ================= */
  {
    id: 10,
    name: "Designer Wash Basin",
    slug: "designer-wash-basin",
    category: "bathware",
    finish: "Glossy",

    heroSubtitle:
      "Luxury wash basins designed for modern bathrooms.",

    overview:
      "Crafted with precision and premium ceramic, this designer wash basin elevates bathroom aesthetics.",

    usage: ["Bathrooms", "Luxury Wash Areas"],

    specifications: {
      material: "Ceramic",
      installation: "Countertop",
      color: "White",
    },

    finishesAvailable: ["Glossy", "Matte"],

    gallery: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200",
    ],

    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200",
  },
];

export default products;
