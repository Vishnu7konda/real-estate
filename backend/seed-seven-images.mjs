import prisma from './prismaClient.js';

async function addSevenImageDemo() {
  try {
    const demoProperty = await prisma.property.create({
      data: {
        title: "Oceanfront Glass Estate",
        description: "A spectacular architectural masterpiece blending indoor and outdoor living. This 6-bedroom estate features a massive 7-car garage, private beach access, a two-story glass atrium, and an integrated smart-home ecosystem. Enjoy breathtaking sunsets from every angle.",
        price: 125000000,
        location: "Malibu Beach, CA",
        propertyType: "Villa",
        investmentType: "Long Term",
        isFeatured: true,
        images: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1750&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1740&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1706&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1740&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=1740&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1740&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1740&auto=format&fit=crop"
        ],
        highlights: [
          "Private Beach Access",
          "Two-Story Glass Atrium",
          "100ft Infinity Pool",
          "Home Theater"
        ],
        amenities: [
          "Ocean Views",
          "Spa & Sauna",
          "Smart Home System",
          "7-Car Garage"
        ]
      }
    });

    console.log("Successfully added the 7-image demo property:", demoProperty.id);
  } catch (error) {
    console.error("Error seeding 7-image property:", error);
  } finally {
    await prisma.$disconnect();
  }
}

addSevenImageDemo();
