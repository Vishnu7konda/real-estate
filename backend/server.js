import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import propertyRoutes from './routes/propertyRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { ensureStorageBucket } from './supabaseClient.js';
import prisma from './prismaClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Real Estate API is running' });
});

app.use('/api/properties', propertyRoutes);
app.use('/api/leads', leadRoutes);

// ─── Auto-seed demo data if DB is empty ──────────────────────────────────────
const autoSeedIfEmpty = async () => {
  const count = await prisma.property.count();
  if (count > 0) {
    console.log(`✅ Database has ${count} properties — skipping seed.`);
    return;
  }

  console.log('🌱 Database is empty — seeding demo properties...');

  const demoProperties = [
    {
      title: 'Modern Infinity Pool Villa',
      description: 'Experience unparalleled luxury in this modern villa featuring a breathtaking infinity pool, smart home automation, and panoramic city views. Situated in a prime gated community with 24/7 security and concierge services.',
      price: 35000000,
      location: 'Banjara Hills, Hyderabad',
      propertyType: 'Villa',
      investmentType: 'High ROI',
      isFeatured: true,
      amenities: ['Infinity Pool', 'Home Theater', 'Smart Security', '4 Car Parking', 'Private Garden'],
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      ],
    },
    {
      title: 'Skyline Penthouse Suite',
      description: 'A stunning penthouse on the 42nd floor with 360° city views, private rooftop terrace, and world-class finishes. Featuring a chef\'s kitchen, spa bathroom, and dedicated butler service. The pinnacle of urban luxury living.',
      price: 95000000,
      location: 'HITEC City, Hyderabad',
      propertyType: 'Apartment',
      investmentType: 'High ROI',
      isFeatured: true,
      amenities: ['Rooftop Terrace', 'Butler Service', 'Spa', 'Concierge', 'Private Elevator'],
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      ],
    },
    {
      title: 'Premium Tech Park Commercial Space',
      description: 'A premium 5000 sq ft commercial office space located in the heart of the IT corridor. Features central AC, 100% power backup, and high-speed internet. Walking distance to major tech companies. Ready for immediate occupation.',
      price: 85000000,
      location: 'Gachibowli, Hyderabad',
      propertyType: 'Commercial',
      investmentType: 'Rental Income',
      isFeatured: false,
      amenities: ['Central AC', '100% Power Backup', 'Cafeteria', '24/7 Security', 'High-Speed Elevators'],
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      ],
    },
    {
      title: 'Luxury Gated Community Villa',
      description: 'Exquisite 4BHK villa in a prestigious gated community with Olympic-size swimming pool, clubhouse, and sports facilities. Spacious interiors with premium Italian marble flooring, designer kitchen, and landscaped garden.',
      price: 22000000,
      location: 'Jubilee Hills, Hyderabad',
      propertyType: 'Villa',
      investmentType: 'Long Term',
      isFeatured: true,
      amenities: ['Club House', 'Swimming Pool', 'Tennis Court', 'Jogging Track', 'Kids Play Area'],
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      ],
    },
    {
      title: 'Prime Investment Plot',
      description: 'A strategically located 500 sq yard residential plot in a fast-developing area with excellent connectivity to ORR, airport, and major commercial hubs. GHMC approved, clear title, and immediate registration.',
      price: 12000000,
      location: 'Kompally, Hyderabad',
      propertyType: 'Plot',
      investmentType: 'High ROI',
      isFeatured: false,
      amenities: ['GHMC Approved', 'Clear Title', 'ORR Access', 'Gated Layout', 'Underground Drainage'],
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      ],
    },
  ];

  for (const prop of demoProperties) {
    await prisma.property.create({ data: prop });
    console.log(`  ✓ Created: ${prop.title}`);
  }
  console.log('🎉 Demo seed complete!');
};

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  await ensureStorageBucket('properties');
  await autoSeedIfEmpty();
});

