-- =====================================================
-- THE NATION - Event Organizer Database Schema
-- PostgreSQL
-- =====================================================

-- Drop tables if they exist (in reverse dependency order)
DROP TABLE IF EXISTS galleries CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS partners CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- EVENTS TABLE
-- =====================================================
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- GALLERIES TABLE
-- =====================================================
CREATE TABLE galleries (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    caption VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- SERVICES TABLE
-- =====================================================
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(12, 2),
    description TEXT,
    icon VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    photo_url VARCHAR(500),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- BOOKINGS TABLE
-- =====================================================
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    event_date DATE NOT NULL,
    service_id INTEGER REFERENCES services(id) ON DELETE SET NULL,
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- PARTNERS TABLE
-- =====================================================
CREATE TABLE partners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- SEED DATA
-- =====================================================

-- Admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@thenation.com', '$2a$10$8KzQ6.UMqDGKX5Q5Yz5Zxu9Ix9QZsFXmqG3GZ7v6qF5F5X5X5X5X5', 'admin');

-- Sample Events
INSERT INTO events (title, date, location, description, image_url) VALUES
('NEON NIGHTS FESTIVAL', '2026-04-15', 'Jakarta Convention Center', 'An electrifying night of music, lights, and unforgettable performances featuring top DJs and live acts.', '/images/events/neon-nights.jpg'),
('BASS NATION CONCERT', '2026-05-20', 'Gelora Bung Karno Stadium', 'The biggest bass music event in Southeast Asia with world-class sound systems and stunning visuals.', '/images/events/bass-nation.jpg'),
('MIDNIGHT GLOW PARTY', '2026-06-10', 'Bali Beach Club', 'A premium beachside party under the stars with UV lighting and immersive sound experiences.', '/images/events/midnight-glow.jpg'),
('ELECTRIC DREAMS 2026', '2026-07-25', 'ICE BSD Convention', 'A multi-genre music festival bringing together electronic, hip-hop, and indie artists.', '/images/events/electric-dreams.jpg'),
('SUNSET SYMPHONY', '2026-08-14', 'Ancol Dreamland', 'Classical meets electronic in this unique outdoor symphony experience at sunset.', '/images/events/sunset-symphony.jpg'),
('URBAN BEATS FEST', '2026-09-05', 'Senayan Park', 'Street culture meets music — featuring rap battles, DJ sets, and street art installations.', '/images/events/urban-beats.jpg');

-- Sample Services
INSERT INTO services (name, price, description, icon) VALUES
('Concert Production', 25000000, 'Full-scale concert production including stage, sound, lighting, and artist management.', 'FaMusic'),
('Festival Planning', 50000000, 'End-to-end festival planning with multi-stage setup, vendor coordination, and crowd management.', 'FaCalendarAlt'),
('Corporate Events', 15000000, 'Professional corporate event management with branding, AV setup, and catering coordination.', 'FaBriefcase'),
('Wedding Entertainment', 20000000, 'Premium wedding entertainment packages with live bands, DJs, and visual effects.', 'FaHeart'),
('Private Parties', 10000000, 'Exclusive private party planning with custom themes, lighting, and sound systems.', 'FaGlassCheers'),
('Sound & Lighting Rental', 5000000, 'Professional sound systems and lighting equipment rental with technical crew.', 'FaBolt');

-- Sample Testimonials
INSERT INTO testimonials (client_name, photo_url, rating, message) VALUES
('Sarah Johnson', '/images/testimonials/sarah.jpg', 5, 'The Nation transformed our corporate gala into an unforgettable experience. The production quality was absolutely world-class!'),
('Michael Chen', '/images/testimonials/michael.jpg', 5, 'Best festival organizers in the country. NEON NIGHTS was the highlight of my year. Cannot wait for the next one!'),
('Amanda Rodriguez', '/images/testimonials/amanda.jpg', 4, 'They handled our wedding entertainment perfectly. The live band and lighting setup exceeded all our expectations.'),
('David Kim', '/images/testimonials/david.jpg', 5, 'Professional, creative, and incredibly organized. The Nation is our go-to team for all our corporate events.'),
('Lisa Tanaka', '/images/testimonials/lisa.jpg', 5, 'From concept to execution, everything was flawless. The attention to detail is what sets The Nation apart.');

-- Sample Partners
INSERT INTO partners (name, logo_url, website_url) VALUES
('Spotify', '/images/partners/spotify.svg', 'https://spotify.com'),
('Monster Energy', '/images/partners/monster.svg', 'https://monsterenergy.com'),
('JBL Professional', '/images/partners/jbl.svg', 'https://jblpro.com'),
('Pioneer DJ', '/images/partners/pioneer.svg', 'https://pioneerdj.com'),
('Red Bull', '/images/partners/redbull.svg', 'https://redbull.com'),
('Samsung', '/images/partners/samsung.svg', 'https://samsung.com');
