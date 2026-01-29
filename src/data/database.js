INSERT INTO subcategories (category_id, title, slug, description, image)
VALUES

-- ================= MARBLE =================
(1, 'Italian Marble', 'italian-marble',
 'Premium imported marble known for elegance and fine veining.',
 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'),

(1, 'Indian Marble', 'indian-marble',
 'High-quality Indian marble with durability and natural beauty.',
 'https://images.unsplash.com/photo-1600210492493-0946911123ea'),

(1, 'Statuario Marble', 'statuario-marble',
 'Luxury white marble with bold grey veining.',
 'https://images.unsplash.com/photo-1615873968403-89e068629265'),

-- ================= GRANITE =================
(2, 'Black Granite', 'black-granite',
 'Bold black granite ideal for premium countertops.',
 'https://images.unsplash.com/photo-1615873968403-89e068629265'),

(2, 'White Granite', 'white-granite',
 'Elegant white granite with subtle mineral patterns.',
 'https://images.unsplash.com/photo-1600210492493-0946911123ea'),

-- ================= TILES =================
(3, 'Ceramic Tiles', 'ceramic-tiles',
 'Affordable and versatile tiles for walls and floors.',
 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a'),

(3, 'Vitrified Tiles', 'vitrified-tiles',
 'High-strength tiles with glossy and matte finishes.',
 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace'),

(3, 'Porcelain Tiles', 'porcelain-tiles',
 'Dense, durable tiles suitable for residential and commercial use.',
 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da');

const subcategories = [
  {
    category_id: 1,
    title: "Italian Marble",
    slug: "italian-marble",
    description: "Premium imported marble known for elegance and fine veining.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    category_id: 1,
    title: "Indian Marble",
    slug: "indian-marble",
    description: "High-quality Indian marble with durability and natural beauty.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
  },
  {
    category_id: 2,
    title: "Black Granite",
    slug: "black-granite",
    description: "Bold black granite ideal for premium countertops.",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265",
  },
  {
    category_id: 3,
    title: "Porcelain Tiles",
    slug: "porcelain-tiles",
    description: "Durable tiles suitable for residential and commercial use.",
    image: "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da",
  },
];
