-- Sample data for Supabase tables
-- Insert categories first
INSERT INTO public.categories (title, slug, subtitle, description, image) VALUES
('Marble', 'marble', 'Elegant Stone', 'Premium marble collections for luxury interiors', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600'),
('Granite', 'granite', 'Durable Surfaces', 'High-quality granite for countertops and flooring', 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600'),
('Tiles', 'tiles', 'Versatile Designs', 'Ceramic and porcelain tiles for modern spaces', 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600');

-- Insert subcategories
INSERT INTO public.subcategories (category_id, title, slug, description) VALUES
(1, 'Carrara Marble', 'carrara-marble', 'Classic white marble from Italy'),
(1, 'Calacatta Marble', 'calacatta-marble', 'Premium gold-veined marble'),
(2, 'Black Granite', 'black-granite', 'Deep black granite varieties'),
(2, 'White Granite', 'white-granite', 'Light-colored granite options'),
(3, 'Ceramic Tiles', 'ceramic-tiles', 'Durable ceramic tile collections'),
(3, 'Porcelain Tiles', 'porcelain-tiles', 'High-end porcelain tile designs');

-- Insert products
INSERT INTO public.products (subcategory_id, name, slug, hero_subtitle, overview, application, status) VALUES
(1, 'Carrara White', 'carrara-white', 'Timeless Elegance', 'Pure white marble with subtle gray veins, perfect for classic interiors.', 'Kitchen countertops, bathroom vanities', 'active'),
(2, 'Calacatta Gold', 'calacatta-gold', 'Luxury Veins', 'Exquisite gold-veined marble for sophisticated spaces.', 'Floors, walls, custom furniture', 'active'),
(3, 'Absolute Black Granite', 'absolute-black-granite', 'Bold and Sleek', 'Deep black granite with minimal veining for modern looks.', 'Countertops, flooring', 'active'),
(4, 'White Pearl Granite', 'white-pearl-granite', 'Bright and Clean', 'Light granite with pearl-like finish.', 'Kitchen islands, backsplashes', 'active'),
(5, 'Subway Ceramic Tiles', 'subway-ceramic-tiles', 'Retro Style', 'Classic subway tiles in various colors.', 'Kitchen backsplashes, bathrooms', 'active'),
(6, 'Large Format Porcelain', 'large-format-porcelain', 'Modern Minimalism', 'Large porcelain slabs for seamless installations.', 'Living rooms, commercial spaces', 'active');

-- Insert product images (assuming product IDs start from 1)
INSERT INTO public.product_images (product_id, image_url, image_type, sort_order) VALUES
(1, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600', 'hero', 1),
(1, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600', 'product', 2),
(2, 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600', 'hero', 1),
(2, 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600', 'product', 2),
(3, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600', 'hero', 1),
(4, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600', 'hero', 1),
(5, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600', 'hero', 1),
(6, 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600', 'hero', 1);

-- Insert product finishes
INSERT INTO public.product_finishes (product_id, finish_name) VALUES
(1, 'Polished'),
(1, 'Honed'),
(2, 'Polished'),
(3, 'Polished'),
(3, 'Leather'),
(4, 'Polished'),
(5, 'Matte'),
(6, 'Polished');

-- Insert product specifications
INSERT INTO public.product_specifications (product_id, spec_key, spec_value) VALUES
(1, 'Thickness', '2cm'),
(1, 'Origin', 'Italy'),
(2, 'Thickness', '3cm'),
(2, 'Origin', 'Italy'),
(3, 'Thickness', '2cm'),
(3, 'Origin', 'India'),
(4, 'Thickness', '2cm'),
(4, 'Origin', 'Brazil'),
(5, 'Size', '4x12 inches'),
(5, 'Material', 'Ceramic'),
(6, 'Size', '24x48 inches'),
(6, 'Material', 'Porcelain');

-- Insert product usage
INSERT INTO public.product_usage (product_id, usage_title) VALUES
(1, 'Kitchen Countertops'),
(1, 'Bathroom Vanities'),
(2, 'Flooring'),
(2, 'Wall Cladding'),
(3, 'Kitchen Islands'),
(4, 'Backsplashes'),
(5, 'Shower Walls'),
(6, 'Living Room Floors');