import prisma from './prismaClient.js';
import dotenv from 'dotenv';

dotenv.config();

const properties = [
  {
    title: 'Luxury Beverly Hills Villa',
    description: 'Experience unparalleled luxury in this spectacular modern villa located in the heart of Beverly Hills. Featuring panoramic city views, a stunning infinity edge pool, and state-of-the-art smart home integration. The open-concept living space is perfect for entertaining, with seamless indoor-outdoor flow through massive sliding glass pocket doors.\n\nThe master suite offers a private retreat with dual spa-like bathrooms and expansive walk-in closets. Three additional en-suite bedrooms provide ample space for family or guests. A fully equipped chef\'s kitchen with top-of-the-line appliances completes this masterpiece.',
    price: 200000000,
    location: '123 Palm Drive, Beverly Hills, CA 90210',
    propertyType: 'Villa',
    investmentType: 'High ROI',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Panoramic City & Ocean Views',
      'Infinity Edge Pool & Spa',
      'Smart Home Technology Integration',
      'Chef\'s Kitchen with Miele Appliances',
      'Home Theater & Wine Cellar'
    ],
    amenities: ['Pool', '4 Beds', '5 Baths', 'Smart Home', 'Garage (3 Cars)', 'Security System', 'Outdoor Kitchen'],
    mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105655.8580227917!2d-118.4904128038148!3d34.09347895475376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
    isFeatured: true
  },
  {
    title: 'Downtown Premium Apartment',
    description: 'High-rise luxury apartment featuring floor-to-ceiling windows and premium amenities. Located in the financial district, perfect for professionals. Building amenities include a 24/7 concierge, rooftop pool, and a world-class fitness center.',
    price: 65000000,
    location: '456 Grand Ave, Downtown LA, CA 90015',
    propertyType: 'Apartment',
    investmentType: 'Long Term',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: [
      'Floor-to-Ceiling Windows',
      '24/7 Concierge Service',
      'Rooftop Pool Access',
      'Premium Custom Cabinetry',
    ],
    amenities: ['2 Beds', '2 Baths', 'City View', 'Gym Access', 'Valet Parking'],
    mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105655.8580227917!2d-118.4904128038148!3d34.09347895475376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
    isFeatured: true
  },
  {
    title: 'Silicon Valley Tech Plot',
    description: 'Prime commercial/residential land located in the upcoming tech expansion corridor. This plot comes with pre-approved zoning for a dual-purpose high-rise, making it an incredible investment opportunity with massive potential for capital appreciation.',
    price: 350000000,
    location: '789 Innovation Drive, San Jose, CA 95134',
    propertyType: 'Plot',
    investmentType: 'High ROI',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Pre-approved Zoning for High-Rise',
      'High Growth Tech Corridor',
      'Close proximity to new Corporate Hubs',
      'Excellent Infrastructure Development in area',
    ],
    amenities: ['1.5 Acres', 'Water Connection Ready', 'Power Grid Access', 'Sewer Connection'],
    mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105655.8580227917!2d-118.4904128038148!3d34.09347895475376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
    isFeatured: false
  },
  {
    title: 'Coastal Modern Estate',
    description: 'Breathtaking oceanfront estate with private beach access. Features a modern minimalist design, open plan living, and expansive decks to enjoy the sunset. The property acts as an excellent short-term rental investment generating premium yields.',
    price: 250000000,
    location: '101 Ocean Blvd, Malibu, CA 90265',
    propertyType: 'Villa',
    investmentType: 'Rental Income',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Private Beach Access',
      'Oceanfront Decks & Terraces',
      'Minimalist Architectural Design',
      'Proven High Short-Term Yields',
    ],
    amenities: ['3 Beds', '4 Baths', 'Ocean View', 'Private Beach Access', 'Spa', 'Fire Pit'],
    mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105655.8580227917!2d-118.4904128038148!3d34.09347895475376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
    isFeatured: true
  }
];

const seedDB = async () => {
  try {
    console.log('Connecting to PostgreSQL via Prisma for seeding...');

    // Clear all existing data to prevent duplicates
    await prisma.property.deleteMany();
    await prisma.lead.deleteMany();
    console.log('Cleared existing properties and leads');

    await prisma.property.createMany({
      data: properties
    });
    console.log('Inserted luxury dummy properties into PostgreSQL');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
