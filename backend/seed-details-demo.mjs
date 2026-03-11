import prisma from './prismaClient.js';

async function addDemoPropertyForDetails() {
  try {
    const demoProperty = await prisma.property.create({
      data: {
        title: "Skyline Penthouse Suite",
        description: "Experience absolute luxury in this stunning 4-bedroom penthouse located in the heart of the city. Featuring panoramic views, smart home automation, a private terrace with an infinity pool, and custom designer finishes throughout. Ideal for those who seek the peak of urban living.",
        price: 85000000,
        location: "Mumbai, Maharashtra",
        propertyType: "Apartment",
        investmentType: "Long Term",
        isFeatured: true,
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1740&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1750&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1706&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1740&auto=format&fit=crop"
        ],
        highlights: [
          "Panoramic City Views",
          "Private Infinity Pool",
          "Smart Home System",
          "Dedicated Elevator Access",
          "Italian Marble Flooring"
        ],
        amenities: [
          "Swimming Pool",
          "Gymnasium",
          "24/7 Security",
          "Concierge Service",
          "Clubhouse",
          "Helipad Access"
        ]
      }
    });

    console.log("Successfully added the detailed demo property:", demoProperty.id);
  } catch (error) {
    console.error("Error seeding detailed demo property:", error);
  } finally {
    await prisma.$disconnect();
  }
}

addDemoPropertyForDetails();
